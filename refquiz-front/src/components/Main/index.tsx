import { useEffect } from 'react'

import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

import QuestionScreen from '../QuestionScreen'
import QuizDetailsScreen from '../QuizDetailsScreen'
import QuizTopicsScreen from '../QuizTopicsScreen'
import ResultScreen from '../ResultScreen'
import SplashScreen from '../SplashScreen'
import LoginScreen from '../LoginScreen'
import RegisterScreen from '../RegisterScreen'

function Main() {
  const { currentScreen, setCurrentScreen } = useQuiz()

  useEffect(() => {
    setTimeout(() => {
      setCurrentScreen(ScreenTypes.LoginScreen)
    }, 1000)
  }, [setCurrentScreen])

  const screenComponents = {
    [ScreenTypes.SplashScreen]: <SplashScreen />,
    [ScreenTypes.QuizTopicsScreen]: <QuizTopicsScreen />,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    [ScreenTypes.ResultScreen]: <ResultScreen />,
    [ScreenTypes.LoginScreen]: <LoginScreen />,
    [ScreenTypes.RegisterScreen]: <RegisterScreen />,

  }

  const ComponentToRender = screenComponents[currentScreen] || <SplashScreen />

  return <>{ComponentToRender}</>
}

export default Main
