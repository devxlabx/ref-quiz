import Button from '../ui/Button'
import styled from 'styled-components'
import { AppLogo } from '../../config/icons'
import React, { useState } from 'react'

import {
    CenterCardContainer,
    HighlightedText,
    LogoContainer,
    PageCenter,
} from '../../styles/Global'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import { checkCredentials, validateEmailInput } from '../../utils/helpers'

const DetailText = styled.p`
    font-weight: 500;
    font-size: 25px;
    line-height: 29px;
`

const Heading = styled.h2`
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
`

const Input = styled.input`
    font-size: 20px;
    font-weight: 100;
    height: 2.5rem;
    margin-top: 10px;
    
`

const Lien = styled.a`
    font-size: 20px;
    font-weight: 100;
    margin-top: 15px;
    text-decoration: none;
    color: grey;
    cursor:pointer;
`

const Div = styled.div`
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`

const DivForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-top: 10px;
    margin-bottom: 10px;
`
const ErrorMessage = styled.p`
    color: #E63946;
    font-size: 12px;
    margin-top: 5px;
`

function LoginScreen() {
    const { setCurrentScreen } = useQuiz()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({}) 

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (validateEmailInput(value)) {
                setEmail(value)
                setErrors((prevErrors) => ({ ...prevErrors, email: "" })); 
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "L'email doit être valide et suivre le format 'exemple@domaine.com'.",
                }));
            }
            
        }
    }
       

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const goToQuizTopicsScreen = (e: React.FormEvent) => {
        e.preventDefault() 
        
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
    }

    const goToRegisterScreen = () => {
        setCurrentScreen(ScreenTypes.RegisterScreen)
    }

    return (
        <PageCenter justifyCenter hasBackgroundImage>
            <CenterCardContainer>
                <LogoContainer>
                    <AppLogo />
                </LogoContainer>
                <Heading>
                    WELCOME TO <HighlightedText> REF'QUIZ</HighlightedText>
                </Heading>
                    <DivForm>
                        <DetailText>Email</DetailText>
                        <Input
                            type="email"
                            placeholder="john.doe@mail.com"
                            onChange={handleEmailChange}
                            required
                        />
                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>} 
                    </DivForm>
                    <DivForm>
                        <DetailText>Mot de Passe</DetailText>
                        <Input
                            type="password"
                            placeholder="***********"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </DivForm>
                    <Button text="Connexion" onClick={goToQuizTopicsScreen} bold/>               
                <Div>
                    <Lien href="#">Mot de passe oublié ?</Lien>
                    <Lien onClick={goToRegisterScreen}>Créer un compte</Lien>
                </Div>
            </CenterCardContainer>
        </PageCenter>
    )
}


export default LoginScreen



  