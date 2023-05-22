import { Component, Prop, Vue } from "nuxt-property-decorator";
import Swal from "sweetalert2";
import { PAGE_SIZE } from "~/constants/global";
import { toast } from "~/mixins/toast";

@Component({
  layout: "admin",
})
export default class SiswaComponent extends Vue {
  $refs!: {
    form: HTMLFormElement;
  };

  public itemsPerPage = PAGE_SIZE;
  public dialog = false;
  public page = 1;
  public headers = [
    {
      text: "No",
      value: "no",
      align: "center",
      sortable: false,
      class: "th-head",
      width: "3%",
    },
    {
      text: "Nama Kelas",
      value: "namaKelas",
      sortable: true,
      class: "th-head",
      width: "20%",
    },
    {
      text: "Tahun Ajaran",
      value: "tahunAjaran",
      sortable: true,
      class: "th-head",
      width: "10%",
    },
    {
      text: "Actions",
      align: "center",
      value: "actions",
      sortable: false,
      class: "th-head",
      width: "10%",
    },
  ];
  public data = {
    items: [],
    meta: {},
  };
  public modeForm = "ADD";
  public editedItem: any = {};
  public listKelas: any = [];
  public valid: any = null;

  created() {
    this.loadAll();
    this.loadKelas();
  }

  // computed
  get formTitle() {
    return this.modeForm == "ADD" ? "Tambah Siswa" : "Edit Siswa";
  }

  loadAll() {
    const { pageNumber, pageSize, q, sortBy, sortType } = (<any>this).$route
      .query;
    this.$kelasSiswaService()
      .retrieve({
        q: q,
        pageSize: pageSize ? pageSize : this.itemsPerPage,
        pageNumber: pageNumber ? pageNumber : this.page,
        sortBy: sortBy,
        sortType: sortType,
      })
      .then((res) => {
        this.data = {
          items: res.data ? res.data.items : [],
          meta: res.data.meta,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadKelas() {
    this.$kelasService()
      .retrieveAll()
      .then((res) => {
        this.listKelas = res.data || [];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addItem() {
    this.$router.push("/kelas-siswa/add");
  }

  editItem(item: any) {
    this.$router.push({
      path: "/kelas-siswa/edit",
      query: {
        id : item.id
      },
    });
  }

  deleteItem(x: any) {
    Swal.fire({
      title: "Hapus Siswa",
      text: "Apakah Anda yakin menghapus siswa [" + x.namaKelas + "] !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#95a5a6",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.$kelasSiswaService()
          .delete(x.id)
          .then((res) => {
            toast.methods.showToast(
              "success",
              "Siswa [" + x.namaKelas + "] berhasil dihapus"
            );
            this.loadAll();
          });
      }
    });
  }

  handleSave(): void {
    if (this.$refs.form.validate()) {
      if (this.valid) {
        this.save();
        this.$refs.form.resetValidation();
      }
    }
  }

  save(): void {
    const formData = new FormData();
    formData.append("id", this.editedItem.id);
    formData.append("nama", this.editedItem.nama);
    formData.append("kelas", this.editedItem.kelas);
    formData.append("idKelas", this.editedItem.idKelas);
    formData.append("berkas", this.editedItem.berkas);

    if (this.editedItem.id) {
      this.$siswaService()
        .update(formData)
        .then((res) => {
          toast.methods.showToast("success", "Data berhasil diubah");
          this.handleClose();
          this.loadAll();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.$siswaService()
        .create(formData)
        .then((res) => {
          toast.methods.showToast("success", "Data berhasil disimpan");
          this.handleClose();
          this.loadAll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleClose() {
    this.$refs.form.resetValidation();
    this.editedItem = {};
    this.modeForm = "ADD";
    this.dialog = false;
  }
}
