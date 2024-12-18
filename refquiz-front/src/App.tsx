import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import Main from './features/Main'
import ToggleTheme from './components/ToggleTheme'
import QuizProvider from './context/QuizProvider'
import './index.css'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'


function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentTheme(checked ? 'dark' : 'light')
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }

  const theme = currentTheme === 'light' ? themes.light : themes.dark

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QuizProvider>
        <ToggleTheme
          onChange={toggleTheme}
          currentTheme={currentTheme}
          checked={currentTheme === 'dark'}
          id="toggleTheme"
          value="theme"
        />
        <Main />
      </QuizProvider>
    </ThemeProvider>
  )
}

export default App
