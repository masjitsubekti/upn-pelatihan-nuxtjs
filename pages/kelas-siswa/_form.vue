<template>
  <div>
    <v-card>
      <v-card-title> Form Kelas Siswa </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          onSubmit="return false"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-autocomplete
            v-model="editedItem.idKelas"
            label="Kelas"
            :rules="[(v) => !!v || 'Kelas harus diisi']"
            :items="listKelas"
            item-value="id"
            item-text="nama"
            clearable
          ></v-autocomplete>
          <v-text-field
            v-model="editedItem.tahunAjaran"
            label="Tahun Ajaran"
            :rules="[(v) => !!v || 'Tahun Ajaran harus diisi']"
            required
          ></v-text-field>
          <br />
          <!-- Table Siswa -->
          <p class="black--text">List Siswa :</p>
          <v-btn class="success mb-4" @click="handleLookupSiswa()"
            >Tambah Siswa</v-btn
          >
          <v-simple-table>
            <thead>
              <tr>
                <th width="5%" class="text-center">No.</th>
                <th>Nama</th>
                <th width="10%" class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listSiswa" :key="i">
                <td class="text-center">{{ i + 1 }}.</td>
                <td>{{ item.namaSiswa }}</td>
                <td class="text-center">
                  <v-btn
                    class="btn-actions"
                    x-small
                    outlined
                    color="error"
                    dark
                    @click="deleteSiswa(i)"
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
        <v-btn class="error" @click="$router.push('/kelas-siswa')"> Batal </v-btn>
        <v-btn class="success" @click="handleSave()"> Simpan </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Lookup Siswa -->
    <LookupSiswa ref="refLookupSiswa" @selected="listenSiswa"></LookupSiswa>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";
import { toast } from "~/mixins/toast";

@Component({
  layout: "admin",
})
export default class FormKelasSiswaComponent extends Vue {
  $refs!: {
    form: HTMLFormElement;
    refLookupSiswa: HTMLFormElement;
  };

  public modeForm = "ADD";
  public editedItem: any = {};
  public listKelas: any = [];
  public listSiswa: any = [];
  public valid: any = null;

  mounted() {
    if (this.$route.query.id) {
      this.getById();
    }
  }

  created() {
    this.loadKelas();
  }

  // computed
  get formTitle() {
    return this.modeForm == "ADD" ? "Tambah Siswa" : "Edit Siswa";
  }

  getById() {
    let id: any = this.$route.query.id;
    this.$kelasSiswaService()
      .retrieveById(id)
      .then((res) => {
        this.editedItem = res.data;
        this.listSiswa = this.editedItem.detail || [];
      });
  }

  handleLookupSiswa() {
    this.$refs.refLookupSiswa.loadSiswa();
  }

  listenSiswa(item: any) {
    this.listSiswa.push({
      id: null,
      idSiswa: item.id,
      namaSiswa: item.nama,
    });
  }

  deleteSiswa(i: any) {
    this.listSiswa.splice(i, 1);
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
    this.listSiswa.forEach((el: any) => {
      detail.push({
        id: el.id || null,
        idSiswa: el.idSiswa,
      });
    });

    this.editedItem.detail = detail;
    this.$kelasSiswaService()
      .save(this.editedItem)
      .then((res) => {
        toast.methods.showToast("success", "Data berhasil disimpan");
        this.handleReset();
        this.$router.push('/kelas-siswa')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleReset() {
    this.$refs.form.resetValidation();
    this.editedItem = {};
    this.listSiswa = [];
  }
}
</script>
