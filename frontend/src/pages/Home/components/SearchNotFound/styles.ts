import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: flex-start;

  & > span {
    margin-left: 2.4rem;
    word-break: break-word;
    color: ${(props) => props.theme.colors.gray['300']};
  }
`
