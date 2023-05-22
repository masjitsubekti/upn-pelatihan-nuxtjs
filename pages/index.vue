<template>
  <div>
    <home />
    <portofolio />
    <about />
    <program />
    <mitra />
  </div>
</template>

<script>
import home from '~/components/landingpage/HomeSection'
import about from '~/components/landingpage/AboutSection'
import program from '~/components/landingpage/ProgramSection'
import portofolio from '~/components/landingpage/PortofolioSection'
import mitra from '~/components/landingpage/MitraSection'

export default {
  layout: 'LandingPage',
  components: {
    home,
    portofolio,
    about,
    program,
    mitra
  },

  data: () => ({
    fab: null,
    color: '',
    flat: null,
  }),

  created() {
    // this.authUpn()
  },

  watch: {},

  methods: {
    async authUpn() {
      try {
        this.load_login = true;
        await this.$store
          .dispatch("authUpn/login")
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log("errorlogin", err);
        throw err;
      }
    }
  },
}
</script>
