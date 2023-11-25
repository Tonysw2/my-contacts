import { ComponentProps, ReactNode } from 'react'
import { Spinner } from '../Spinner'
import { ButtonStyleProps, StyledButton } from './styles'

type Props = ComponentProps<'button'> &
  ButtonStyleProps & {
    children: ReactNode
    isLoading?: boolean
  }

export function Button({
  children,
  isLoading,
  $danger,
  disabled,
  ...rest
}: Props) {
  return (
    <StyledButton $danger={$danger} disabled={disabled || isLoading} {...rest}>
      {!isLoading && children}
      {isLoading && <Spinner $size={16} />}
    </StyledButton>
  )
}
