import { ToastDTO } from '../dtos/ToastDTO'
import { EventManager } from '../lib/EventManager'

export const toastEventManager = new EventManager<Omit<ToastDTO, 'id'>>()

export function toast({ text, variant }: Omit<ToastDTO, 'id'>) {
  toastEventManager.emit('addToast', { text, variant })
}
