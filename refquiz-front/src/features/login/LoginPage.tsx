import Button from '../../components/ButtonComponent/StyledButton'
import React, { useState } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import { validateEmailInput } from '../../utils/helpers'
import InputField from '../../components/InputComponent/Input'
import Card from '../../components/CardComponent/Card'
import Error from '../../components/ErrorComponent/error'

function LoginPage() {
    const { setCurrentScreen } = useQuiz()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (validateEmailInput(value)) {
            setEmail(value)
            setErrors((prevErrors) => ({ ...prevErrors, email: "" }))
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "L'email doit être valide et suivre le format 'exemple@domaine.com'.",
            }))
        }
    }

    const removePlaceHolder = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.placeholder = ""
        e.currentTarget.className += " border"

    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const goToQuizTopicsScreen = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
    }

    const goToRegisterScreen = () => {
        setCurrentScreen(ScreenTypes.RegisterPage)
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <Card className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-3/12 h-50 sm:h-48 md:h-80 lg:h-3/6 ">
                <InputField
                    label="E-mail"
                    type="email"
                    placeholder="john.doe@mail.com"
                    onChange={handleEmailChange}
                    onClick={removePlaceHolder}
                />
                <Error>
                    {errors.email && errors.email}
                </Error>
        
                <InputField
                    label="Mot de Passe"
                    type="password"
                    placeholder="***********"
                    value={password}
                    onChange={handlePasswordChange}
                    onClick={removePlaceHolder}
                />
                <Error>
                </Error>
        
                {/* Connexion Button */}
                <div className="flex items-center justify-center mb-5">
                    <Button onClick={goToQuizTopicsScreen}>CONNEXION</Button>
                </div>
  

                <div className="flex flex-col items-center gap-6 mt-5">
                    <a href="#" className="text-white-400 hover:text-gray-300 transition">
                        Mot de passe oublié ?
                    </a>
                    <a
                        onClick={goToRegisterScreen}
                        className="text-white-400 cursor-pointer hover:text-gray-300 transition"
                    >
                        Créer un compte
                    </a>
                </div>
            </Card>
        </div>
    )
}

export default LoginPage
