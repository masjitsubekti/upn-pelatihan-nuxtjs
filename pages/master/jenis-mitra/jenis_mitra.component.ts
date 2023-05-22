import { Component, Prop, Vue } from "nuxt-property-decorator";
import Swal from "sweetalert2";
import { PAGE_SIZE } from "~/constants/global";
import { toast } from "~/mixins/toast";

@Component({
    layout: "admin"
})
export default class JenisMitraComponent extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    public valid = false
    public dialog = false;
    public formTitle = 'Tambah Jenis Mitra'
    public isLoading = false;
    public itemsPerPage = PAGE_SIZE;
    public page = 1;
    public previousPage = 1;
    public propOrder = 'id';
    public reverse = false;
    public headers = [
        { text: "No", value: "no", align: 'center', sortable: false, class: 'th-head', width: '3%' },
        { text: "Jenis Mitra", value: "namaJenisMitra", sortable: true, class: 'th-head', width: '40%' },
        {
            text: "Actions",
            align: "center",
            value: "actions",
            sortable: false,
            class: 'th-head',
            width: '10%'
        }
    ];
    public data = {
        items: [],
        meta: {
            totalItems: 0
        }
    };

    public editedItem: any = {};

    mounted() {
        this.loadAll()
    }

    loadAll(): void {
        this.isLoading = true;
        const id_pegawai: any = this.$route.query.id_pegawai
        console.log(id_pegawai)
        const { pageNumber, pageSize, q, sortBy, sortType } = (<any>this).$route.query
        this.$jenisMitraService()
            .retrieve({
                q: q,
                pageSize: (pageSize) ? pageSize : this.itemsPerPage,
                pageNumber: (pageNumber) ? pageNumber : this.page,
                sortBy: sortBy,
                sortType: sortType
            })
            .then(res => {
                this.isLoading = false;
                this.data = {
                    items: (res.data != null) ? res.data.items : [],
                    meta: res.data.meta
                }
            })
            .catch(() => {
                this.isLoading = false;
            });
    }

    addItem() {
        this.editedItem.id = null
        this.editedItem.namaJenisMitra = null
        this.dialog = true
    }

    handleClose() {
        this.dialog = false
    }

    handleSave(): void {
        if (this.$refs.form.validate()) {
            if (this.valid) {
                this.save()
                this.$refs.form.resetValidation()
            }
        } else {
            console.log('none !')
        }
    }

    save(): void {
        this.$jenisMitraService()
            .save(this.editedItem)
            .then((res) => {
                this.editedItem.id = res.data.id
                toast.methods.showToast(
                    'success',
                    'Jenis Mitra berhasil disimpan'
                )
                this.dialog = false;
                this.loadAll()
            }).catch(() => {
                this.$refs.form.reset()
            })

    }

    editItem(x: any) {
        this.formTitle = "Edit Jenis Mitra"
        this.$jenisMitraService()
            .retrieveById(x.id)
            .then((res) => {
                this.editedItem = res.data
                this.dialog = true;
            })
    }

    deleteItem(x: any) {
        Swal.fire({
            title: 'Hapus Jenis Mitra',
            text: 'Apakah Anda yakin menghapus Jenis Mitra [' + x.namaJenisMitra + '] !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#95a5a6',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.value) {
                this.$jenisMitraService().delete(x.id)
                    .then((res) => {
                        toast.methods.showToast("success", "Jenis Mitra [" + x.namaJenisMitra + "] berhasil dihapus")
                        this.loadAll()
                    })
            }
        })
    }

    isNumber(evt: any) {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46
        ) {
            evt.preventDefault();
        } else {
            return true;
        }
    }

}