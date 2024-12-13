import Button from '../ui/Button'
import styled from 'styled-components'
import { AppLogo } from '../../config/icons'
import React, { useState } from 'react'

import {
    CenterCardContainer,
    LogoContainer,
    PageCenter,
} from '../../styles/Global'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import { validateEmailInput, validateMatchPasswordInput, validateNameInput, validatePasswordInput } from '../../utils/helpers'

const DetailText = styled.p`
    
`

const Heading = styled.h2`
    
`

const Input = styled.input`
    height: 2rem;
    margin-top: 10px;
    background-color:#0D1321;
    border:none;
    transition: background-color 0.3s ease; 
    color:white;
    border-radius:5px;


  &:focus {
    background-color: white; 
    color:black;
    outline: none; 
  }
    
`

const ErrorMessage = styled.p`
    color:  #E63946;
    font-size: 12px;
    margin-top: 5px;
`

const Div = styled.div`
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    gap:10px;
`

const DivForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    position: relative;
`

function RegisterScreen() {
    const { setCurrentScreen } = useQuiz()

    const [email, setEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [matchedPassword, setMatchedPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({}) 
    const user = {
        "email" : "",
        "password" : "",
    }
    let validMail = false;
    let validFirstName = false;
    let validLastName = false;
    let validPassword = false;
    let validPasswordMatch = false;

    const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateNameInput(value)) {
            setFirstName(value);
            validFirstName = true
            setErrors((prevErrors) => ({ ...prevErrors, firstName: "" })); 
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                firstName: "Le nom ne doit pas contenir de caractères spéciaux et doit comporter au moins 2 à 50 caractères.",
            }));
        }
    }
   

    const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateNameInput(value)) {
            setLastName(value);
            validLastName = true;
            setErrors((prevErrors) => ({ ...prevErrors, lastName: "" })); 
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                lastName: "Le prénom ne doit pas contenir de caractères spéciaux et doit comporter au moins 2 à 50 caractères.",
            }));
        }
    }
    

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateEmailInput(value)) {
            setEmail(value)
            validMail = true;
            setErrors((prevErrors) => ({ ...prevErrors, email: "" })); 
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "L'email doit être valide et suivre le format 'exemple@domaine.com'.",
            }));
        }
        
    }
    

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validatePasswordInput(value)) {
            setPassword(value)
            validPassword = true
            setErrors((prevErrors) => ({ ...prevErrors, password: "" })); 
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Le mot de passe doit contenir au moins 8 caractères, dont une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
            }));
        }
    }
    

    const passwordMatchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatchedPassword(e.target.value)
        const value = e.target.value;
        if (validateMatchPasswordInput(value,password)) {
            setMatchedPassword(value)
            validPasswordMatch = true;
            setErrors((prevErrors) => ({ ...prevErrors, passwordMatch: "" })); 
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordMatch: "Les mots de passe doivent correspondre.",
            }));
        }
    }
    

    const goToLoginScreen = () => {
        setCurrentScreen(ScreenTypes.LoginScreen)
    }
    const submitData = () => {
        if(validFirstName && validLastName && validMail && validPassword && validPasswordMatch){
            user.email = email;
            user.password = password;
            setCurrentScreen(ScreenTypes.LoginScreen)
        }
    }

    return (
        <PageCenter justifyCenter >
            <CenterCardContainer>
                
                <Heading>
                    Création du compte
                </Heading>
                <DivForm id="first-name-container">
                    <DetailText>Nom :</DetailText>
                    <Input type="text" placeholder='Doe' onChange={firstNameHandler} required />
                    {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>} 
                </DivForm>
                

                <DivForm id="last-name-container">
                    <DetailText>Prénom :</DetailText>
                    <Input type="text" placeholder='John' onChange={lastNameHandler} required />
                    {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>} 
                </DivForm>

                <DivForm id="email-container">
                    <DetailText>E-mail :</DetailText>
                    <Input type="email" placeholder='john.doe@mail.com' onChange={emailHandler} required />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>} 
                </DivForm>

                <DivForm id="password-container">
                    <DetailText>Mot de passe :</DetailText>
                    <Input type="password" placeholder='***********' onChange={passwordHandler} required />
                    {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>} 
                </DivForm>

                <DivForm id="password-tomatch-container">
                    <DetailText>Confirmer le mot de passe :</DetailText>
                    <Input type="password" placeholder='***********' onChange={passwordMatchHandler} required />
                    {errors.passwordMatch && <ErrorMessage>{errors.passwordMatch}</ErrorMessage>} 
                </DivForm>

                <Div>
                    <Button text="Retour" onClick={goToLoginScreen} outline />
                    <Button text="Créer" onClick={submitData} outline />
                </Div>
                
            </CenterCardContainer>
        </PageCenter>
    )
}

export default RegisterScreen
