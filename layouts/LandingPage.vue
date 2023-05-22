<template>
  <v-app>
    <navigation :color="color" :fab="fab" :flat="flat" />
    <v-main class="pt-0">
      <Nuxt />
    </v-main>
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="success"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <foote />
  </v-app>
</template>

<style scoped>
.v-main {
  /* background-image: url('~@/assets/image/landingpage/bgMain.png'); */
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<script>
import Navigation from '~/components/landingpage/Navigation'
import Foote from '~/components/landingpage/Footer'
export default {
  name: 'LandingPage',
  components: {
    Navigation,
    Foote,
  },

  data: () => ({
    fab: null,
    color: '#ffffff',
    flat: true,
  }),

  created() {
    if (process.browser) {
      const top = window.pageYOffset || 0
      if (top <= 60) {
        this.color = 'transparent'
        this.flat = true
      }
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = '#ffffff'
        this.flat = false
      } else {
        this.color = 'transparent'
        this.flat = true
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 60
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
  },
}
</script>
