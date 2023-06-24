import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { nanoid } from 'nanoid'

interface Options {
  globalError?: boolean,
  globalLoader?: boolean
}

const { add } = useToast()

export const useCustomFetch = <T> (url: string, fetchOptions: UseFetchOptions<T> = {}, options: Options = {}) => {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.baseUrl ?? '/',
    // cache request
    key: url,

    // set user token if connected
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},

    onResponse (_ctx) {},

    onResponseError (ctx) {
      if (!options.globalError) return 
      add({
        id: nanoid(),
        content: ctx.error ? ctx.error.message : 'Wystąpił nieoczekiwany bład',
        mode: 'error'
      })
    }
  }

  const params = defu(fetchOptions, defaults)

  const loading = ref(false)

  const request = async <T> (arg: any) => {
    let globalLoader: any
    if(options.globalLoader) globalLoader = ElLoading.service({ fullscreen: true })
    loading.value = true
    const data = await useFetch<T>(url, { ...params, ...arg })
    loading.value = false
    if(options.globalLoader) globalLoader.close()
    return data
  }

  return {
    request,
    loading
  }
}
