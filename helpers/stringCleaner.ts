const stringCleaner = (rawString: string = '') => {
  if (rawString && rawString.length > 0) {
    const rawStringLowerCase = rawString.toLowerCase();

    if (
      rawStringLowerCase.substring(0, 4) === 'ase ' ||
      rawStringLowerCase.substring(0, 4) === 'vas ' ||
      rawStringLowerCase.substring(0, 4) === 'vag '
    ) {
      if (
        rawStringLowerCase.substring(0, 5) ===
        ('0' || '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9')
      ) {
        return rawString.substr(4);
      } else {
        return rawString;
      }
    } else if (
      rawStringLowerCase.substring(0, 3) === 'ase' ||
      rawStringLowerCase.substring(0, 3) === 'vas' ||
      rawStringLowerCase.substring(0, 3) === 'vag'
    ) {
      if (
        rawStringLowerCase.substring(0, 4) ===
        ('0' || '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9')
      ) {
        return rawString.substr(3);
      } else {
        return rawString;
      }
    } else {
      return rawString;
    }
  }

  return rawString;
};

export default stringCleaner
