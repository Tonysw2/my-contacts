import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { GlobalStyle } from '../styles/global'
import { light } from '../styles/themes/light'
import { Container } from './styles'
import { Routes } from '../routes/index.routes'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <GlobalStyle />

        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
