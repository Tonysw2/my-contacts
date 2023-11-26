export type ToastVariants = 'default' | 'danger' | 'success'

export type ToastDTO = {
  id: string
  text: string
  duration?: number
  variant?: ToastVariants
}
