<template>
    <v-footer dark padless>
      <v-card flat tile color="#2d4e38" class="white--text text-center">
        <v-card-text class="pl-10">
          <v-row>
            <v-col cols="12" md="8" sm="12">
              <div class="text-left white--text">
                <h2 class="mt-1" style="font-weight:500;">Universitas Pembangunan Nasional Jawa Timur</h2>
                <span style="font-size: 12px"
                  >“INOVASI PRESTASI SUKSES, UNTUK INDONESIA”</span
                >
                <br />
                <br />
                <p class="mb-2">Telepon : +62 (031) 870 6369</p>
                <p class="mb-2">Email : humas@upnjatim.ac.id</p>
                <p class="mb-2">
                  Alamat : Jl.Raya Rungkut Madya, Gunung Anyar, Surabaya
                </p>
                <v-btn
                  v-for="(icon, i) in icons"
                  :key="i"
                  class="white--text"
                  :href="icon.link"
                  icon
                >
                  <v-icon size="28px">{{ icon.text }}</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col md="4">
              <img :src="require('~/assets/image/landingpage/kampus-merdeka.jpg')" alt="" style="width:200px;">
            </v-col>
          </v-row>
          <br />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-left white--text pl-10">
          Copyright © {{ new Date().getFullYear() }} UPN Jawa Timur
        </v-card-text>
      </v-card>
    </v-footer>
  </template>
  
  <style scoped>
  .v-card {
    width: 100%;
  }
  </style>
  
  <script>
  export default {
    data: () => ({
      icons: [
        {
          text: 'mdi-facebook',
          link: 'javascript:;',
        },
        {
          text: 'mdi-twitter',
          link: 'javascript:;',
        },
        {
          text: 'mdi-linkedin',
          link: 'javascript:;',
        },
        {
          text: 'mdi-instagram',
          link: 'javascript:;',
        },
      ],
    }),
  }
  </script>
  