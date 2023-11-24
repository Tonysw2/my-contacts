import ReactDOM from 'react-dom'
import { Overlay } from './styles'
import { Spinner } from '../Spinner'

type Props = {
  isLoading?: boolean
}

export function Loader({ isLoading }: Props) {
  if (!isLoading) {
    return null
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner $size={90} />
    </Overlay>,
    document.getElementById('loader-root')!,
  )
}
