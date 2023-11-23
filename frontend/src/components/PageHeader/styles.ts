import styled from 'styled-components'

export const Container = styled.header`
  margin-bottom: 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;

  & > a {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    text-decoration: none;

    & > span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    & > img {
      transform: rotate(-90deg);
    }
  }

  & > h1 {
    font-size: 2.4rem;
  }
`
