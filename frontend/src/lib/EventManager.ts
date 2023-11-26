type Listener<T> = (event: T) => void

export class EventManager<T> {
  private listeners: Map<string, Listener<T>[]>

  constructor() {
    this.listeners = new Map()
  }

  on(event: string, listener: Listener<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    this.listeners.get(event)!.push(listener)
  }

  emit(event: string, payload: T) {
    if (!this.listeners.has(event)) {
      return
    }

    this.listeners.get(event)!.forEach((listener) => {
      listener(payload)
    })
  }

  removeListener(event: string, listenerToRemove: Listener<T>) {
    const listeners = this.listeners.get(event)

    if (!listeners) {
      return
    }

    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    )

    this.listeners.set(event, filteredListeners)
  }
}
