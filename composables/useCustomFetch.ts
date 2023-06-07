import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { nanoid } from 'nanoid'

const { add } = useToast()

export const useCustomFetch = <T> (url: string, options: UseFetchOptions<T> = {}) => {
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

    onResponse (_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError (ctx) {
      add({
        id: nanoid(),
        content: ctx.error ? ctx.error.message : 'Wystąpił nieoczekiwany bład',
        mode: 'error'
      })
    }
  }

  const params = defu(options, defaults)

  const loading = ref(false)
  const request = async (body: Record<string, any>) => {
    loading.value = true
    const data = await useFetch(url, { ...{ ...params, body }, method: 'POST' })
    loading.value = false
    return data
  }

  return {
    request,
    loading
  }
  // return {
  //   post: () => useFetch(url, { ...params, method: 'POST' }),
  //   get: () => useFetch(url, { ...params, method: 'GET' })
  // }
}
