import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: ReactNode
  containerId?: string
}

export function ReactPortal({ children, containerId = 'portal-root' }: Props) {
  let container = document.getElementById(containerId)

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', containerId)
    document.body.appendChild(container)
  }

  return ReactDOM.createPortal(children, container)
}
