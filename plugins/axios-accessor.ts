import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'
import { initializeConfig } from '~/utils/config'
import { toast } from '@/mixins/toast.js'
import { TOKEN_KEY } from "~/constants/global";

const accessor: Plugin = ({ $axios, app, store, redirect, $config }) => {
  initializeAxios($axios)
  initializeConfig($config)
  $axios.onError((error) => {
    if (error.response) {
      const { error: errMessage } = error.response.data
      store.commit('shared/SET_NOTIFICATION', errMessage)
      console.log('errMessage', errMessage)
      toast.methods.showToast("error", errMessage)

      if (error.response.status === 401) {
        redirect('/logout')
      }
    }
  })

  $axios.defaults.baseURL = `${$config.baseBe}api`
  $axios.onRequest((config) => {
    const token = app.$cookies.get(TOKEN_KEY)
    if (token) {
      $axios.setToken(token, 'Bearer')
      if((config.method=="get" || config.method=="post")  && config.url?.includes("reports")) {
        // config.headers.common['tenantId'] = app.$cookies.get('tenantId');
      }
    }
  })
}

export default accessor
