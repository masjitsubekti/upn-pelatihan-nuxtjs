<template>
  <section style="margin-top: 70px" id="portofolio">
    <v-row align="center" justify="center" class="mt-5 mb-5">
      <v-col cols="11">
        <h1 class="mb-3 text-center" style="font-size: 40px">
          Pencarian <span style="color: #5cb270">Portofolio</span>
        </h1>
      </v-col>
    </v-row>
    <div>
      <v-card class="mx-auto" width="75vw" style="border-radius: 30px">
        <v-card-text class="px-12">
          <v-row>
            <v-col cols="12" md="1" style="margin: auto">
              <div class="text-center">
                <img width="60" src="~/assets/image/landingpage/amicosr.png" />
              </div>
            </v-col>
            <v-col cols="12" md="11">
              <v-row>
                <v-col cols="12" :md="filter == 'mahasiswa' ? 3 : 4">
                  <v-select
                    v-model="kriteria"
                    @change="handleResetRequest"
                    :items="kriteria_dosen"
                    hide-details
                    outlined
                  ></v-select>
                </v-col>
                <v-col v-if="filter == 'mahasiswa'" cols="12" md="3">
                  <v-text-field
                    v-model="year"
                    @change="handleResetRequest"
                    label="Tahun"
                    type="number"
                    hide-details
                    outlined
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" :md="filter == 'mahasiswa' ? 6 : 8">
                  <v-text-field
                    v-model="keyword"
                    @keypress.enter="handleResetRequest"
                    label="keyword"
                    placeholder="Masukkan keyword pencarian"
                    hide-details
                    outlined
                  >
                    <template v-slot:append>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon @click="handleResetRequest" v-on="on">
                            mdi-magnify
                          </v-icon>
                        </template>
                        <span>Cari</span>
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0" cols="12" md="12">
                  <v-radio-group
                    v-model="filter"
                    @change="handleResetRequest"
                    mandatory
                    row
                  >
                    <v-radio label="Dosen" value="dosen"></v-radio>
                    <v-radio label="Mahasiswa" value="mahasiswa"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <div v-if="!loading" class="mt-15">
        <v-card
          @click="detail(item)"
          v-for="(item, index) in list_data"
          :key="index"
          class="mt-5 mx-auto"
          width="75vw"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title style="color: green; font-size: 12pt">
                {{ item.nama }}
              </v-card-title>
              <v-card-subtitle
                ><b>{{ item.fakultas }}</b></v-card-subtitle
              >
              <v-card-text>
                <span>{{ item.program_studi }}</span>
              </v-card-text>
            </div>
            <div class="pa-5 my-auto">
              <v-icon large>mdi-text-search-variant</v-icon>
            </div>
          </div>
        </v-card>
        <div class="mt-5">
          <v-pagination
            v-model="page"
            :length="parseInt(totalData / 10)"
            :total-visible="sizeWidth > 500 ? 7 : 5"
          ></v-pagination>
        </div>
        <p style="color: #495057; font-size: 14px" class="text-center mt-3">
          Menampilkan {{ list_data.length }} dari total {{ totalData }} data.
        </p>
      </div>
      <div v-if="loading" class="mt-15">
        <v-row align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            Mencari data....
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filter: "dosen",
      kriteria: "nama",
      keyword: "",
      keyword: "",
      kriteria_mahasiswa: ["nama", "prodi", "aktivitas"],
      kriteria_dosen: [
        "nama",
        "pendidikan",
        "penelitian",
        "pengabdian",
        "prodi",
      ],
      page: 1,
      totalData: 0,
      year: "",
      list_data: [],
      loading: false,
      sizeWidth: null,
    };
  },
  watch: {
    page: function (newv, oldv) {
      const link = document.createElement("a");
      link.href = "#portofolio";
      link.click();
      this.handleRequest();
    },
    page: function (newv, oldv) {
      const link = document.createElement("a");
      link.href = "#portofolio";
      link.click();
      this.handleRequest();
    },
  },
  created() {
    this.year = new Date().toISOString().substr(0, 10).split("-")[0];
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.sizeWidth = window.innerWidth;
    },
    handleResetRequest() {
      this.page = 1;
      this.totalData = 0;
      const link = document.createElement("a");
      link.href = "#portofolio";
      link.click();
      this.handleRequest();
    },
    handleRequest() {
      if (this.filter == "dosen") {
        this.getDosen();
      }
      if (this.filter == "mahasiswa") {
        this.getMahasiswa();
      }
    },
    getDosen() {
      this.loading = true;
      const postBody = {
        searchBy: this.kriteria,
        search: this.keyword,
        page: this.page,
      };
      this.$portofolioKompetensiService()
        .retrieveDosen(postBody)
        .then((res) => {
          this.list_data = res.data || [];
          this.totalData = res.total_data || 0;
          this.loading = false;
        });
    },
    getMahasiswa() {
      this.loading = true;
      const postBody = {
        searchBy: this.kriteria,
        search: this.keyword,
        year: this.year,
        page: this.page,
      };
      this.$portofolioKompetensiService()
        .retrieveMahasiswa(postBody)
        .then((res) => {
          this.list_data = res.data || [];
          this.totalData = res.totalData;
          this.loading = false;
        });
    },
    detail(item) {
      if (this.filter == "dosen") {
        this.$router.push({
          path: "/portofolio-kompetensi/dosen",
          query: { kd: item.kd_pegawai },
        });
      }
      if (this.filter == "mahasiswa") {
        this.$router.push({
          path: "/portofolio-kompetensi/mahasiswa",
          query: { npm: item.id },
        });
      }
    },
  },
};
</script>
<style scoped>
section {
  position: relative;
}
</style>
