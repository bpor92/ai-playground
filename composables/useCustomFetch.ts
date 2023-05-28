import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { nanoid } from 'nanoid'

const { add } = useToast()

export function useCustomFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
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

  return {
    post: () => useFetch(url, { ...params, method: 'POST' }),
    get: () => useFetch(url, { ...params, method: 'GET' })
  }
}
