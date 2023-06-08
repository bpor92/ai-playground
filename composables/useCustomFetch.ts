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

    onResponse (_ctx) {},

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

  const request = async <T> (arg: any) => {
    loading.value = true
    const data = await useFetch<T>(url, { ...params, ...arg })
    loading.value = false
    return data
  }

  return {
    request,
    loading
  }
}
