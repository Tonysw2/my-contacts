import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    background-color: ${({ theme }) => theme.colors.background};
    font-family: 'Sora', sans-serif;
    font-size: 62.5%;
  }


  body, input, textarea, button {
    font-family: 'Sora', sans-serif;
    font-size: 1.6rem;
  }  

  button {
    cursor: pointer;
  }
`
