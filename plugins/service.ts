import Vue from 'vue'
import MataKuliahService from '~/services/MataKuliah.service'
import JenisMbkmService from '~/pages/master/jenis-mbkm/jenis_mbkm.service'
import PendaftarProgramMbkmService from '~/pages/pendaftaran-mbkm/pendaftar_mbkm.service'
declare module 'vue/types/vue' {
  interface Vue {
    $mataKuliahService(): MataKuliahService
    $jenisMbkmService() : JenisMbkmService
    $pendaftarProgramMbkmService() : PendaftarProgramMbkmService
  }
}

Vue.prototype.$mataKuliahService = () => {
  return new MataKuliahService()
}

Vue.prototype.$jenisMbkmService = () => {
  return new JenisMbkmService()
}

Vue.prototype.$pendaftarProgramMbkmService = () => {
  return new PendaftarProgramMbkmService()
}
