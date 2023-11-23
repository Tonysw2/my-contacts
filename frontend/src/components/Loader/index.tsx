import ReactDOM from 'react-dom'
import { Overlay } from './styles'

type Props = {
  isLoading?: boolean
}

export function Loader({ isLoading }: Props) {
  if (!isLoading) {
    return null
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root')!,
  )
}
