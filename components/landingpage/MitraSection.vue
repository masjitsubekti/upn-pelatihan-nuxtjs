<template>
  <section class="pb-8" id="mitra">
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-5 mb-5">
        <v-col cols="12" md="10">
          <div style="padding: 30px">
            <h1 class="mb-3" style="font-size: 40px">
              Mitra UPN "Veteran" <span style="color: #5cb270">Jawa Timur</span>
            </h1>
            <p style="color: #495057; font-size: 14px; line-height: 35px">
              Di bawah ini adalah beberapa mitra UPN "Veteran" Jawa Timur yang
              sebagian telah bekerjasama dalam kerangka MBKM.
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn large color="success" @click="registrasi()"
            >Registrasi Mitra</v-btn
          >
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-carousel v-model="model" hide-delimiters style="height: 350px">
            <v-carousel-item v-for="(item, index) in listMitra" :key="index">
              <v-row>
                <v-col
                  cols="4"
                  md="2"
                  v-for="(img, idx) in item.image"
                  :key="idx"
                >
                  <v-card
                    outlined
                    style="height: 130px; vertical-align: middle !important"
                  >
                    <v-card-text
                      class="text-center pa-2"
                      style="vertical-align: middle !important"
                    >
                      <div style="vertical-align: middle !important">
                        <img
                          class="image-mitra"
                          width="100%"
                          style="max-height: 110px"
                          :src="img.path"
                        />
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  data() {
    return {
      model: null,
      listMitra: [
        {
          slide: 1,
          image: [
            { path: require("~/assets/image/mitra/mitra1.jpg") },
            { path: require("~/assets/image/mitra/mitra2.jpg") },
            { path: require("~/assets/image/mitra/mitra3.jpg") },
            { path: require("~/assets/image/mitra/mitra4.jpg") },
            { path: require("~/assets/image/mitra/mitra5.jpg") },
            { path: require("~/assets/image/mitra/mitra6.png") },
            { path: require("~/assets/image/mitra/mitra7.png") },
            { path: require("~/assets/image/mitra/mitra8.png") },
            { path: require("~/assets/image/mitra/mitra9.png") },
            { path: require("~/assets/image/mitra/mitra10.png") },
            { path: require("~/assets/image/mitra/mitra11.png") },
            { path: require("~/assets/image/mitra/mitra12.jpg") },
          ],
        },
        {
          slide: 2,
          image: [
            { path: require("~/assets/image/mitra/mitra13.jpg") },
            { path: require("~/assets/image/mitra/mitra14.jpg") },
            { path: require("~/assets/image/mitra/mitra15.jpg") },
            { path: require("~/assets/image/mitra/mitra16.jpg") },
            { path: require("~/assets/image/mitra/mitra17.png") },
            { path: require("~/assets/image/mitra/mitra18.png") },
            { path: require("~/assets/image/mitra/mitra19.png") },
            { path: require("~/assets/image/mitra/mitra20.jpg") },
            { path: require("~/assets/image/mitra/mitra21.png") },
            { path: require("~/assets/image/mitra/mitra22.png") },
          ],
        },
      ],
    };
  },
  methods: {
    registrasi() {
      this.$router.push("/riset/registrasi");
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
.image-mitra {
  vertical-align: middle !important;
}
</style>
