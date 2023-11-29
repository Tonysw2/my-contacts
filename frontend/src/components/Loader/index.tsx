import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'
import { ReactPortal } from '../ReactPortal'
import { Spinner } from '../Spinner'
import { Overlay } from './styles'

type Props = {
  isLoading: boolean
}

export function Loader({ isLoading }: Props) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(isLoading)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay ref={animatedElementRef} $isLeaving={!isLoading}>
        <Spinner $size={90} />
      </Overlay>
    </ReactPortal>
  )
}
