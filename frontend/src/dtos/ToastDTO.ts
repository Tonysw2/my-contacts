export type ToastVariants = 'default' | 'danger' | 'success'

export type ToastDTO = {
  id: string
  text: string
  variant: ToastVariants
}
