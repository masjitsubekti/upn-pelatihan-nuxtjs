<template>
  <section class="pb-8" id="program">
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-5 mb-5">
        <v-col cols="11">
          <h1 class="mb-3" style="font-size: 40px">
            Program yang <span style="color: #5cb270">tersedia</span>
          </h1>
        </v-col>
      </v-row>
      <!-- <v-row align="center" justify="center" class="mb-7">
        <v-col cols="11">
          <v-carousel style="height:200px;" v-model="model" hide-delimiters>
            <v-carousel-item v-for="(item, index) in 2" :key="index">
              <v-row>
                <v-col v-for="(x, i) in program" :key="i" cols="12" md="4">
                  <v-card flat style="border-radius:10px;">
                    <v-card-text class="pa-6">
                      <v-img class="mr-3" color="teal darken-1">{{ x.image }}</v-img>
                      <h2
                        class="mb-3"
                        style="color: #5cb270;"
                      >
                        <v-icon class="mr-3" color="teal darken-1">{{ x.icon }}</v-icon> {{ x.title }}
                      </h2>
                      <p style="font-size: 14px; line-height: 20px;">{{ x.description }}</p>
                      <v-btn class="mt-8" depressed block rounded color="#BEE0C6" style="color:#2E5938;">
                        Lihat Detail
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row> -->
      <v-card class="card-program">
        <v-card-text style="padding: 50px">
          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="(x, index) in menuMahasiswa"
              :key="index"
            >
              <div class="box-program" @click="handleClick(x)">
                <v-img :src="x.icon" height="120px"></v-img>

                <h2 class="mt-3" style="color: green; padding-bottom: 10px">
                  {{ x.name }}
                </h2>
                <h5 class="mt-0" style="color: green; padding-bottom: 10px">
                  {{ x.deskripsi }}
                </h5>
                <v-btn
                  v-if="x.btnText"
                  class="btn mt-2"
                  depressed
                  color="#BEE0C6"
                  rounded
                  block
                  @click.prevent="handleClick(x)"
                >
                  {{ x.btnText }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<!-- <style scoped>
#program {
  background-color: #eff8f1;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
</style> -->

<script>
// import {db} from '@/main'

export default {
  data() {
    return {
      menuMahasiswa: [
        {
          name: "Kampus Mengajar",
          link: "/mbkm/KampusMengajar",
          icon: require("~/assets/image/landingpage/kampus-mengajar.png"),
          deskripsi:
            "Bantu peningkatan kualitas pendidikan dasar dengan terlibat langsung  pada proses pengajaran di sekolah-sekolah ...",
          btnText: "Tentang Program",
        },
        {
          name: "Magang",
          link: "/mbkm/Magang",
          icon: require("~/assets/image/landingpage/magang.png"),
          deskripsi:
            "Dapatkan pengalaman dunia kerja secara langsung sebagai persiapan kariermu.",
          btnText: "Tentang Program ",
        },
        {
          name: "Studi Independen",
          link: "/mbkm/StudiIndependen",
          icon: require("~/assets/image/landingpage/msib.png"),
          deskripsi:
            "Program ini diperuntukan bagi mahasiswa yang ingin memperlengkapi dirinya dengan menguasai kompetensi ...",
          btnText: "Tentang Program",
        },
        {
          name: "Pertukaran Mahasiswa Merdeka",
          link: "/mbkm/PertukaranMahasiswa",
          icon: require("~/assets/image/landingpage/pertukaran.png"),
          deskripsi:
            "Program pertukaran mahasiswa dalam negeri  yang memberikan pengalaman langsung untuk lebih memaknai ...",
          btnText: "Tentang Program",
        },
        {
          name: "Wirausaha Merdeka",
          // link: "https://dikti.kemdikbud.go.id/festival-kampus-merdeka/program-baru-wirausaha-merdeka-targetkan-lulusan-siap-kerja-dan-berwirausaha/",
          // isUrl : true,
          link: "mbkm/Kewirausahaan",
          icon: require("~/assets/image/landingpage/wirausaha.jpg"),
          deskripsi:
            "Ikuti program unggulan dari berbagai Perguruan Tinggi yang bertujuan untuk meningkatkan kemampuan wirausaha.",
          btnText: "Tentang Program",
        },
        {
          name: "Indonesian International Student",
          link: "https://site.iisma.id/",
          isUrl: true,
          icon: require("~/assets/image/landingpage/pertukaran.png"),
          deskripsi:
            "Program pertukaran dengan universitas lain dari seluruh dunia untuk bertukar budaya.",
          btnText: "Tentang Program",
        },
        {
          name: "Praktisi Mengajar",
          // link: "https://praktisimengajar.id/",
          // isUrl : true,
          link: "mbkm/PraktisiMengajar",
          icon: require("~/assets/image/landingpage/praktisi.png"),
          deskripsi:
            "Program ini mendorong kolaborasi aktif praktisi ahli dengan dosen juara agar tercipta pertukaran ilmu dan keahlian ...",
          btnText: "Tentang Program",
        },
        {
          name: "KKNT MBKM",
          link: "/mbkm/Kkn",
          icon: require("~/assets/image/landingpage/kkn.png"),
          deskripsi:
            "Program ini bertujuan memberikan pengalaman kepada mahasiswa hidup di tengah-tengah masyarakat di luar kampus.",
          btnText: "Tentang Program",
        },
        {
          name: "Komcad",
          link: "/mbkm/Komcad",
          icon: require("~/assets/image/landingpage/komcad.png"),
          deskripsi:
            " Program Pelatihan Dasar Militer Komponen Cadangan-Bela Negara (Latsarmil Komcad-Bela Negara) adalah Pendidikan ...",
          btnText: "Tentang Program",
        },
      ],
    };
  },
  methods: {
    handleClick(x) {
      if (x.isUrl) {
        window.location.href = x.link;
      } else {
        this.$router.push(x.link);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-program {
  background: #eff8f1;
  border: 0.7px solid #eff8f1;
  border-radius: 10px;
  text-align: left;
  padding: 20px;
  cursor: pointer;
  height: 300px;
}
.box-program img {
  height: 100%;
}
.btn {
  text-transform: unset !important;
}
.rounded-card {
  border-radius: 10px;
}
</style>
