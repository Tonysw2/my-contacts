import styled, { css } from 'styled-components'

type Props = {
  danger?: boolean
}

export const Button = styled.button<Props>`
  height: 5.2rem;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray['100']};
  transition: background 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.gray['300']};
  }

  ${(props) =>
    props.danger &&
    css`
      background-color: ${props.theme.colors.danger.main};

      &:hover {
        background-color: ${props.theme.colors.danger.light};
      }

      &:active {
        background-color: ${props.theme.colors.danger.dark};
      }
    `}
`
