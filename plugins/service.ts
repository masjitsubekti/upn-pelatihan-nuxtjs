import Vue from 'vue'
import KelasService from '~/services/kelas.service'

declare module 'vue/types/vue' {
  interface Vue {
    $kelasService(): KelasService
  }
}

Vue.prototype.$kelasService = () => {
  return new KelasService()
}
