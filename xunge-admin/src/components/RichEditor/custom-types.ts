type EmptyText = {
  text: ''
}
export type CustomVideoElement = {
  type: 'custom-video'
  src: string
  width?: string
  height?: string
  children: EmptyText[]
}
