import Vue from 'vue'

import JenisMitraService from '~/pages/master/jenis-mitra/jenis_mitra.service'
import DashboardService from '~/pages/dashboard/dashboard.service'
import SiswaService from '~/pages/siswa/siswa.service'
import KelasService from '~/services/kelas.service'
import KelasSiswaService from '~/pages/kelas-siswa/kelas_siswa.service'

declare module 'vue/types/vue' {
  interface Vue {
    $jenisMitraService(): JenisMitraService
    $dashboardService(): DashboardService
    $siswaService(): SiswaService
    $kelasService(): KelasService
    $kelasSiswaService(): KelasSiswaService
  }
}

Vue.prototype.$dashboardService = () => {
  return new DashboardService()
}
Vue.prototype.$jenisMitraService = () => {
  return new JenisMitraService()
}
Vue.prototype.$siswaService = () => {
  return new SiswaService()
}
Vue.prototype.$kelasService = () => {
  return new KelasService()
}
Vue.prototype.$kelasSiswaService = () => {
  return new KelasSiswaService()
}

