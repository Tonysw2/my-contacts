import styled from 'styled-components'

type HeaderStyleProps = {
  $justifyContent: string
}

export const Container = styled.header<HeaderStyleProps>`
  margin-top: 3.2rem;
  padding-bottom: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justifyContent};

  border-bottom: 2px solid ${(props) => props.theme.colors.gray['300']};

  & > strong {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray['500']};
  }

  & > a {
    padding: 0.8rem 1.6rem;

    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};

    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.radii.base};

    transition: all 0.2s ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.gray['100']};
    }
  }
`
