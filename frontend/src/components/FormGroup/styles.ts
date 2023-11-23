import styled from 'styled-components'

export const Container = styled.div`
  & + & {
    margin-top: 1.6rem;
  }

  & > small {
    margin-top: 0.8rem;
    display: block;

    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.danger.main};
  }
`
