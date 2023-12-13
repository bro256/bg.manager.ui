const calculatePasswordStrength = (password) => {
  let score = 0;
  const patterns = {
    length: /[^\s\S]/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /\d/,
    specialChar: /[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/
  };

  // Check each pattern and increment the score
  for (const pattern in patterns) {
    if (patterns[pattern].test(password)) {
      score++;
    }
  }

  if (score > 2 && password.length < 12) {
    score--;
  }

  if (score === 5 && password.length >= 16) {
    score++;
  }

  // Return the password strength level
  if (score === 0) {
    return "None";
  } else if (score === 1) {
    return "Weak";
  } else if (score === 2) {
    return "Moderate";
  } else if (score === 3) {
    return "Strong";
  } else if (score >= 4) {
    return "Very Strong";
  }
};

const getColorForPasswordStrength = (strength) => {
  switch (strength) {
    case 'None':
      return 'gray';
    case 'Weak':
      return 'red';
    case 'Moderate':
      return 'orange';
    case 'Strong':
      return 'blue';
    case 'Very Strong':
      return 'green';
    default:
      return '';
  }
};


const generateRandomPassword = (length = 12, includeLowercase = true, includeUppercase = true, includeNumbers = true, includeSymbols = true) => {
  let charset = "";

  if (includeLowercase) {
    charset += "abcdefghijklmnopqrstuvwxyz";
  }
  if (includeUppercase) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeNumbers) {
    charset += "0123456789";
  }
  if (includeSymbols) {
    charset += "!@#$%^&*()-_=+[{]}\\|;:',<.>/?";
  }

  if (charset === "") {
    console.error("No character set selected for password generation.");
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};


export { calculatePasswordStrength, generateRandomPassword, getColorForPasswordStrength };