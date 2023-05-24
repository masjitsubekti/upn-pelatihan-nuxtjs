import { Component, Prop, Vue } from "nuxt-property-decorator";
import Swal from "sweetalert2";
import { PAGE_SIZE } from "~/constants/global";
import { toast } from "~/mixins/toast";

@Component({
  layout: "admin",
})
export default class PendaftarProgramMbkmComponent extends Vue {
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
      text: "Nama",
      value: "nama",
      sortable: true,
      class: "th-head",
      width: "50%",
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
  }

  // computed
  get formTitle() {
    return this.modeForm == "ADD" ? "Tambah Jenis MBKM" : "Edit Jenis MBKM";
  }

  loadAll() {
    const { pageNumber, pageSize, q, sortBy, sortType } = (<any>this).$route
      .query;
    this.$jenisMbkmService()
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

  addItem() {
    this.$router.push("/pendaftaran-mbkm/form")
  }

  editItem(item: any) {
    this.$jenisMbkmService()
      .retrieveById(item.id)
      .then((res) => {
        this.editedItem = res.data;
        this.modeForm = "EDIT";
        this.dialog = true;
      });
  }

  deleteItem(x: any) {
    Swal.fire({
      title: "Hapus Jenis MBKM",
      text: "Apakah Anda yakin menghapus jenis mbkm [" + x.nama + "] !",
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
        this.$jenisMbkmService()
          .delete(x.id)
          .then((res) => {
            toast.methods.showToast(
              "success",
              "Jenis MBKM [" + x.nama + "] berhasil dihapus"
            );
            this.loadAll();
          });
      }
    });
  }
}
