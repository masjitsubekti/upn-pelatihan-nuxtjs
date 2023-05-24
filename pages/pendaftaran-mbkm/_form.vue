<template>
  <div>
    <v-card>
      <v-card-title> Form Pendaftaran MBKM </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          onSubmit="return false"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-autocomplete
            v-model="editedItem.idMitraTerlibatProgram"
            label="Program Mitra"
            :items="listJenisMbkm"
            item-value="id"
            item-text="nama"
            clearable
          ></v-autocomplete>
          <br />
          <!-- Table Paket Konversi -->
          <p class="black--text">Paket Konversi :</p>
          <v-btn class="success mb-4" @click="handleLookupMatkul()"
            >Tambah Matkul</v-btn
          >
          <v-simple-table>
            <thead>
              <tr>
                <th width="5%" class="text-center">No.</th>
                <th>Kode</th>
                <th>Nama Matkul</th>
                <th>SKS</th>
                <th width="10%" class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listMatkul" :key="i">
                <td class="text-center">{{ i + 1 }}.</td>
                <td>{{ item.kodeMatkul }}</td>
                <td>{{ item.namaMatkul }}</td>
                <td>{{ item.sks }}</td>
                <td class="text-center">
                  <v-btn
                    class="btn-actions"
                    x-small
                    outlined
                    color="error"
                    dark
                    @click="deleteMatkul(i)"
                  >
                    <v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn class="error" @click="$router.go(-1)"> Batal </v-btn>
        <v-btn class="success" @click="handleSave()"> Simpan </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Lookup Matkul -->
    <LookupMatkul ref="refLookupMatkul" @selected="listenMatkul"></LookupMatkul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";
import { toast } from "~/mixins/toast";

@Component({
  layout: "admin",
})
export default class FormPendaftarProgramMbkmComponent extends Vue {
  $refs!: {
    form: HTMLFormElement;
    refLookupMatkul: HTMLFormElement;
  };

  public modeForm = "ADD";
  public editedItem: any = {};
  public listJenisMbkm: any = [];
  public listMatkul: any = [];
  public valid: any = null;

  mounted() {
    if (this.$route.query.id) {
    }
  }

  created() {
    this.loadJenisMbkm()
  }

  // computed
  get formTitle() {
    return this.modeForm == "ADD" ? "Tambah Siswa" : "Edit Siswa";
  }

  getById() {
    let id: any = this.$route.query.id;
  }

  loadJenisMbkm() {
    this.$jenisMbkmService()
      .retrieveAll()
      .then((res) => {
        this.listJenisMbkm = res.data || [];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLookupMatkul() {
    this.$refs.refLookupMatkul.loadMatkul();
  }

  listenMatkul(item: any) {
    var findMatkul = this.listMatkul.filter(function (el: any) {
      return el.idMatkul == item.id;
    });

    if (findMatkul.length > 0) {
      return toast.methods.showToast(
        "warning",
        "Maaf mata kuliah sudah terdaftar"
      );
    }

    this.listMatkul.push({
      id: null,
      idMatkul: item.id,
      kodeMatkul: item.kodeMatkul,
      namaMatkul: item.namaMatkul,
      sks: item.sks,
    });
  }

  deleteMatkul(i: any) {
    this.listMatkul.splice(i, 1);
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
    let detail: any = [];
    this.listMatkul.forEach((el: any) => {
      detail.push({
        id: el.id || null,
        idMatkul: el.idMatkul,
        idPaketKonversi: null,
        sks: String(el.sks),
      });
    });

    this.editedItem.idSiamikMahasiswa =
      this.$store.state.auth.user.idSiamikMahasiswa;
    this.editedItem.paketKonversi = detail;
    this.$pendaftarProgramMbkmService()
      .create(this.editedItem)
      .then((res) => {
        toast.methods.showToast("success", "Data berhasil disimpan");
        this.handleReset();
        this.$router.go(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleReset() {
    this.$refs.form.resetValidation();
    this.editedItem = {};
    this.listMatkul = [];
  }
}
</script>
