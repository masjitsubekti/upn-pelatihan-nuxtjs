<template>
  <div />
</template>
<script>
import { TOKEN_KEY } from "~/constants/global";
export default {
  created() {
    this.$cookies.remove(TOKEN_KEY)
    console.log('process.browser', process.browser)
    if (process.browser) {
      localStorage.clear()
      localStorage.setItem('theme_mode', this.$vuetify.theme.dark)
    }
    this.$router.push('/login')
    this.$store.commit('shared/SET_NOTIFICATION', null, { root: true })
  },
}
</script>
