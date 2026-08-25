type DataLayerEvent = {
  event: string
  [key: string]: unknown
}

export const pushToDataLayer = (data: DataLayerEvent) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}
