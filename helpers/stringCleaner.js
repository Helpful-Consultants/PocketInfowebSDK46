const stringCleaner = (rawString = '') => {
  if (rawString.length === 0) {
    return rawString;
  }

  const rawStringLowerCase = rawString.toLowerCase();

  if (
    rawStringLowerCase.startsWith('ase ') ||
    rawStringLowerCase.startsWith('vas ') ||
    rawStringLowerCase.startsWith('vag ')
  ) {
    if (/^\d/.test(rawStringLowerCase)) {
      return rawString.substr(4);
    } else {
      return rawString;
    }
  } else if (
    rawStringLowerCase.startsWith('ase') ||
    rawStringLowerCase.startsWith('vas') ||
    rawStringLowerCase.startsWith('vag')
  ) {
    if (/^\d/.test(rawStringLowerCase)) {
      return rawString.substr(3);
    } else {
      return rawString;
    }
  } else {
    return rawString;
  }
};

export default stringCleaner;
