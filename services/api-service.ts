export const ApiService = <T> (url: string) => {
  const loading = ref(false)
  const data = ref({})
  const error = ref(null)

  const request = async (body: Record<string, any>) => {
    try {
      loading.value = true
      const response = await useCustomFetch<T>(url, { body }).post()
      loading.value = false
      if (!response) {
        throw new Error('Nie można pobrać danych')
      }

      data.value = response.data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    request,
    loading,
    data,
    error
  }
}
