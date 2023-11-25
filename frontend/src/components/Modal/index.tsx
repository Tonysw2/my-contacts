import { Button } from '../Button'
import { Container, Footer, Overlay } from './styles'
import ReactDOM from 'react-dom'

type Props = {
  danger?: boolean
}

export function Modal({ danger }: Props) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Title</h1>
        <p>description</p>

        <Footer>
          <button type="button" className="cancel-btn">
            Cancelar
          </button>

          <Button $danger={danger} type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')!,
  )
}
