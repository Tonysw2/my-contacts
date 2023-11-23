import styled, { css } from 'styled-components'

export type Props = {
  $error?: boolean
  $variant: 'search' | 'default'
}

export const Input = styled.input<Props>`
  appearance: none;

  height: 5rem;
  width: 100%;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;

  font-family: 'Sora', sans-serif;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.gray['500']};

  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid transparent;
  border-radius: ${({ theme, $variant }) =>
    $variant === 'default' ? theme.radii.base : theme.radii.lg};

  transition: border-color 0.2s ease-in;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray['300']};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  ${(props) =>
    props.$error &&
    css`
      color: ${props.theme.colors.danger.main};
      border-color: ${props.theme.colors.danger.main} !important;
    `}
`
