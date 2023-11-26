import styled from 'styled-components'
import { ToastVariants } from '../../../dtos/ToastDTO'

export type ContainerStyleProps = {
  $variant?: ToastVariants
}

export const Container = styled.div<ContainerStyleProps>`
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

  & + & {
    margin-top: 1.2rem;
  }
`
