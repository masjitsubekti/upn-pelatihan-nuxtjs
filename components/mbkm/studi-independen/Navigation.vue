<template>
    <div>
      <!-- Mobile -->
      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        dark
        :src="require('~/assets/image/landingpage/bgDrawer.jpg')"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                :src="'/upn-logo.png'"
                alt="Logo"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">SILATURAHMI</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
        <v-divider />
  
        <v-list dense>
          <v-list-item
            v-for="([icon, text, link], i) in items"
            :key="i"
            link
            @click="$vuetify.goTo(link)"
          >
            <v-list-item-icon class="justify-center">
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitile-1">{{
                text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="ml-4">
          <v-btn color="success" width="88%" @click="$router.push('/login')" style="position: fixed; bottom: 8vh;" rounded>
            <span>Login</span>
          </v-btn>
        </div>
      </v-navigation-drawer>
  
      <!-- Web -->
      <v-app-bar
        app
        :color="color"
        :flat="flat"
        dark
        class="px-15"
        :class="{ expand: flat }"
      >
        <v-toolbar-title
          style="color: #5cb270; font-weight: 500; font-size: 18pt"
        >
          <!-- <v-img :src="require('~/assets/image/landingpage/logo.png')" max-width="50px" /> -->
          Studi Independen
        </v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="mr-4"
          v-if="isXs"
          style="right:-40px;"
        />
        <div v-else>
          <v-btn text @click="$vuetify.goTo('#home')">
            <span :class="!flat ? 'mr-2 color-menu' : 'mr-2 bold-menu'"
              >Home</span
            >
          </v-btn>
          <v-btn text @click="$vuetify.goTo('#about')">
            <span :class="!flat ? 'mr-2 color-menu' : 'mr-2 bold-menu'"
              >Program</span
            >
          </v-btn>
          <v-btn text @click="$vuetify.goTo('#program')">
            <span :class="!flat ? 'mr-2 color-menu' : 'mr-2 bold-menu'"
              >Pusat Informasi</span
            >
          </v-btn>
          <v-btn rounded @click="$router.push('/login')" class="btn-login">
            <span class="mr-2">Login</span>
          </v-btn>
        </div>
      </v-app-bar>
    </div>
  </template>
  
  <style scoped>
  .v-toolbar {
    transition: 0.6s;
  }
  
  .expand {
    height: 80px !important;
    padding-top: 10px;
  }
  
  .btn-login {
    background: #5cb270 !important;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
  
  .color-menu {
    color: #09120b !important;
  }
  
  .bold-menu {
    font-weight: 600 !important;
  }
  </style>
  
  <script>
  export default {
    data: () => ({
      drawer: null,
      isXs: false,
      items: [
        ["mdi-home-outline", "Home", "#home"],
        ["mdi-information-outline", "About", "#about"],
        ["mdi-layers", "Program", "#program"],
        ["mdi-newspaper-variant-outline", "Berita", "#program"],
      ],
    }),
    props: {
      color: String,
      flat: Boolean,
    },
    methods: {
      onResize() {
        this.isXs = window.innerWidth < 850;
      },
    },
  
    watch: {
      isXs(value) {
        if (!value) {
          if (this.drawer) {
            this.drawer = false;
          }
        }
      },
    },
    mounted() {
      this.onResize();
      window.addEventListener("resize", this.onResize, { passive: true });
    },
  };
  </script>
  