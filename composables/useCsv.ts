import { Parser } from '@json2csv/plainjs'

export const useCsv = () => {
  const download = (data: Record<string, any>) => {
    const parser = new Parser({ header: false })
    const csv = parser.parse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const element = document.createElement('a')
    element.href = url
    element.setAttribute('download', 'ai-batch.csv')
    element.click()
  }

  return {
    download
  }
}
