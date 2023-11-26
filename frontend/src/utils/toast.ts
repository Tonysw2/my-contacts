import { ToastDTO } from '../dtos/ToastDTO'
import { EventManager } from '../lib/EventManager'

type ToastDataType = Omit<ToastDTO, 'id'>

export const toastEventManager = new EventManager<ToastDataType>()

export function toast({ text, variant, duration }: ToastDataType) {
  toastEventManager.emit('addToast', { text, variant, duration })
}
