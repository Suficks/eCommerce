export const ValidationErrors = {
  email: {
    required: 'Enter your email!',
    error: 'Invalid email address!',
  },
  password: {
    required: 'Enter your password!',
    error:
      'English only. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  },
  passwordConfirm: {
    required: 'Confirm your password!',
    error: 'Must match the password.',
  },
  username: {
    required: "Don't forget your name!",
    error:
      'Must contain at least one character and no special characters or numbers',
  },
  surname: {
    required: "Don't forget your surname!",
    error:
      'Must contain at least one character and no special characters or numbers',
  },
  birthDate: {
    required: 'Are you 13+?',
    tooOld: 'You are too old!',
    tooYoung: 'You must be at least 13!',
    futureAge: 'You live in the future!',
  },
  shipping: {
    city: {
      required: 'Please enter your shipping city!',
      error: 'Must contain only english letters!',
    },
    street: {
      required: 'Please enter your street!',
    },
    postal: {
      required: 'Please enter your postal code!',
      error: 'Must use pattern',
    },
  },
};

const validateBirthDate = (date: string) => {
  const currentDate = new Date();
  const birthdate = new Date(date);
  if (birthdate > currentDate) {
    return ValidationErrors.birthDate.futureAge;
  }
  const difference = new Date(currentDate.valueOf() - birthdate.valueOf());
  const age = Math.abs(difference.getUTCFullYear() - 1970);
  if (age > 120) {
    return ValidationErrors.birthDate.tooOld;
  }
  return age >= 13 ? true : ValidationErrors.birthDate.tooYoung;
};

const validationConfirmPassword = (
  confirmPassword: string,
  realPassword: string,
) => {
  return (
    realPassword === confirmPassword || ValidationErrors.passwordConfirm.error
  );
};

const postalCodeTests = {
  Russia: /^\\d{6}$/,
  Belarus: /^\\d{6}$/,
  Poland: /^\\d{2}[- ]{0,1}\\d{3}$/,
};

const validationPostalCode = (postalCode: string, country: string) => {
  console.log(country, postalCode);
  switch (country) {
    case 'Poland': {
      const result = /^\d{2}[-]{0,1}\d{3}$/.test(postalCode);
      console.log(result);
      return (
        result || `${ValidationErrors.shipping.postal.error} for ${country}`
      );
    }
    case 'Belarus': {
      const result = /^\d{6}$/.test(postalCode);
      return (
        result || `${ValidationErrors.shipping.postal.error} for ${country}`
      );
    }
    case 'Russia': {
      const result = /^\d{6}$/.test(postalCode);
      return (
        result || `${ValidationErrors.shipping.postal.error} for ${country}`
      );
    }
    default:
      return true;
  }
};

export const Validation = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S+]{8,}$/,
  username: /^[a-zA-Z]+$/,
  surname: /^[a-zA-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  city: /^[a-zA-Z]+$/,
  birthDate: validateBirthDate,
  confirmPassword: validationConfirmPassword,
  postalCode: validationPostalCode,
};
