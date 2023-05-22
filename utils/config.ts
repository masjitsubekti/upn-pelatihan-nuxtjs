import { NuxtConfig } from '@nuxt/types'

let $config: NuxtConfig

export function initializeConfig(config: NuxtConfig) {
    $config = config
}

export { $config }
