import { SpinnerStyleProps, StyledSpinner } from './styles'

type Props = SpinnerStyleProps

export function Spinner({ $size = 32 }: Props) {
  return <StyledSpinner $size={$size} />
}
