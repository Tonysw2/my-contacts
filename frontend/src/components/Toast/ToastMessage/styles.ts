import styled, { css, keyframes } from 'styled-components'
import { ToastVariants } from '../../../dtos/ToastDTO'

const messageIn = keyframes`
  from {opacity: 0; transform: translateY(100px)}
  to {opacity: 1; transform: translateY(0)}
`
const messageOut = keyframes`
  from {opacity: 1; transform: translateY(0)}
  to {opacity: 0; transform: translateY(100px)}
`

type ContainerStyleProps = {
  $isLeaving: boolean
  $variant?: ToastVariants
}

export const Container = styled.div<ContainerStyleProps>`
  cursor: pointer;
  padding: 1.6rem 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  border-radius: ${(props) => props.theme.radii.base};
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme, $variant }) =>
    $variant === 'danger'
      ? theme.colors.danger.main
      : $variant === 'success'
        ? theme.colors.success.main
        : theme.colors.primary.main};

  color: ${(props) => props.theme.colors.gray['100']};

  animation: ${messageIn} 0.3s forwards;
  ${({ $isLeaving }) =>
    $isLeaving &&
    css`
      animation: ${messageOut} 0.2s forwards;
    `}

  & + & {
    margin-top: 1.2rem;
  }
`
