import ReactDOM from 'react-dom'
import { Button } from '../Button'
import { Container, Footer, Overlay } from './styles'
import { ReactNode } from 'react'

type Props = {
  title: string
  danger?: boolean
  visible: boolean
  isLoading?: boolean
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
}

export function Modal({
  title,
  danger,
  visible,
  children,
  isLoading,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
}: Props) {
  if (!visible) {
    return null
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container $danger={danger}>
        <h1>{title}</h1>

        <div className="modal-body">{children}</div>

        <Footer>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cancel-btn"
          >
            {cancelLabel}
          </button>

          <Button
            type="button"
            $danger={danger}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')!,
  )
}
