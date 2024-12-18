export const addLeadingZero = (number: number) => {
  if (number > 9) {
    return number
  } else {
    return '0' + number
  }
}

// utility function to format the remaining time as minutes:seconds
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const convertSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const hourString = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''
  const minuteString = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''
  const secondString =
    remainingSeconds > 0
      ? `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`
      : ''

  if (hours > 0) {
    return `${hourString} : ${minuteString || '0 minute'} ${
      secondString && `: ${secondString}`
    }`
  } else if (!hours && minutes > 0) {
    return `${minuteString} ${secondString && `: ${secondString}`}`
  }

  return secondString
}

export const refreshPage = (): void => {
  window.location.reload()
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    // Swap elements using array destructuring
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
export const validateNameInput = (name: string): boolean => {
  const cleanedName = name?.trim();
  const nameRegex = /^[a-zA-Z]{2,50}$/;
  return nameRegex.test(cleanedName || "");
};

export const validateEmailInput = (email: string): boolean => {
  if (!email) return false;

  const [localPart, domainPart] = email.trim().split('@');

  if (!localPart || !domainPart || domainPart.includes('@')) {
    return false;
  }

  const localPartRegex = /^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+)|(?:".+"))$/;
  if (!localPartRegex.test(localPart)) {
    return false;
  }


  const domainPartRegex = /^(?:[a-zA-Z0-9.-]+(?:\.[a-zA-Z\u00A1-\uFFFF]{2,})+)|(?:\[(IPv6:[a-fA-F0-9:]+)\])$/;
  
  const domainIpv4Regex = /^[0-9]{1,3}(\.[0-9]{1,3}){3}$/;

  if (!(domainPartRegex.test(domainPart) || domainIpv4Regex.test(domainPart))) {
    return false;
  }

  return true;
};





export const validatePasswordInput = (password: string): boolean => {
  if (!password) return false; 

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+ .])[a-zA-Z\d!@#$%^&*()_+ .]{8,}$/;

  return passwordRegex.test(password);
};

export const validateMatchPasswordInput = (passwordToValidate: string, password: string): boolean => {
  if (!password || !passwordToValidate) return false; 
  return passwordToValidate === password; 
};



export const checkCredentials = (emailInput : string, emailUser: string, passwordInput: string, passwordUser: string): boolean => {
  return passwordInput === passwordUser && emailInput === emailUser;
};