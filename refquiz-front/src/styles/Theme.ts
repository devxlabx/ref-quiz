import { Theme } from './styled'

import '@fontsource/roboto/100.css';  // Poids 100 (ultra-light)
import '@fontsource/roboto/300.css';  // Poids 300 (light)
import '@fontsource/roboto/400.css';  // Poids 400 (regular)
import '@fontsource/roboto/500.css';  // Poids 500 (medium)
import '@fontsource/roboto/700.css';  // Poids 700 (bold)
export const themes: Record<string, Theme> = {
  light: {
    colors: {
      primaryText: '#0D1321', // Texte des questions - sombre pour la lisibilité
      secondaryText: '#1D3557', // Texte des réponses - bleu profond
      themeText: 'white', // Texte du thème - black
      themeColor: '#ffffff', //'#E63946', // Rouge inspiré des maillots sportifs
      themeGradient: 'linear-gradient(to right, #E63946, #F4A261)', // Rouge vers orange
      background: 'linear-gradient(to right, #E63946, #F4A261)',  // Rouge vers orange
      cardBackground: '#0D1321', // Fond des cartes
      selectTopicBg: '#A8DADC', // Bleu clair pour la sélection des sujets
      appLogo: '#000000', // Bleu profond pour le logo
      buttonText: 'white', // Texte des boutons
      outlineButtonText: 'white', // Rouge pour les boutons outline
      buttonBackground: '#0D1321',//'linear-gradient(90.04deg, #E63946 0.03%, #F4A261 99.96%)', // Dégradé rouge vers orange pour les boutons
      selectedAnswer: '#F4A261', // Orange pour les réponses sélectionnées
      infoText: '#457B9D', // Texte d'information (bleu pour le contraste)
      infoBackground: '#A8DADC', // Fond des informations (bleu clair)
      border: '#EAEAEA', // Bordure grise
      answerBg: '#FFFFFF', // Fond des réponses
      disabledCard: '#F8F9FA', // Cartes désactivées
      disabledButton: '#D3D3D3', // Boutons désactivés
      success: '#2A9D8F', // Vert pour la réussite
      successLight: '#DFF6F2', // Vert clair pour indiquer la réussite
      danger: '#E63946', // Rouge pour les erreurs
      dangerLight: '#FFD7DE', // Rouge clair pour les erreurs
      white: '#FFFFFF', // Blanc
      black: '#000000', // Noir
      dark: '#1D3557', // Bleu sombre
      darkGray: '#6C757D', // Gris foncé
      darkerGray: '#495057', // Gris encore plus foncé
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam', 
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)', // Même ombre pour les boutons
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },

  dark: {
    colors: {
      primaryText: '#FFFFFF', // Texte des questions - blanc pour contraste
      secondaryText: '#F4A261', // Texte des réponses - orange vif
      themeText: '#ffffff', // Texte du thème - rouge sportif
      themeColor: '#FFFFFF', //'#E63946', // Couleur principale - white
      themeGradient: 'linear-gradient(90deg, #1D3557 0%, #457B9D 100%)', // Dégradé bleu pour modernité
      background: 'linear-gradient(90deg, #1D3557 0%, #0D1321 100%)', // Fond sombre avec des tons bleus
      cardBackground: '#0D1321', // Fond des cartes - bleu très sombre
      selectTopicBg: '#1D3557', // Fond pour la sélection des sujets
      appLogo: '#F4A261', // Orange vif pour le logo
      buttonText: '#FFFFFF', // Texte des boutons - blanc
      outlineButtonText: '#FFFFFF', //'#F4A261', // Texte des boutons outline - orange
      buttonBackground: '#000000',//'linear-gradient(90.04deg, #E63946 0.03%, #F4A261 99.96%)', // Boutons rouge vers orange
      selectedAnswer: '#457B9D', // Bleu pour la réponse sélectionnée
      infoText: '#A8DADC', // Texte d’information - bleu clair
      infoBackground: '#1D3557', // Fond d’information - bleu profond
      border: '#282828', // Bordure - gris foncé
      answerBg: '#1D3557', // Fond des réponses - bleu profond
      disabledCard: '#2A2A2A', // Fond des cartes désactivées - gris sombre
      disabledButton: '#3C3C3C', // Boutons désactivés - gris
      success: '#2A9D8F', // Vert pour succès
      successLight: '#264653', // Vert sombre
      danger: '#E63946', // Rouge pour les erreurs
      dangerLight: '#611C1C', // Rouge sombre pour erreurs légères
      white: '#FFFFFF', // Blanc
      black: '#000000', // Noir
      dark: '#0D1321', // Bleu très sombre
      darkGray: '#6C757D', // Gris foncé
      darkerGray: '#495057', // Gris encore plus foncé
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(255, 255, 255, 0.1)', // Ombre blanche légère
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
  
}
