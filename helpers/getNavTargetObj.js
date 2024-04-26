import { AppSectionsByScreen, ScreenNames } from '../constants/AppParts';

const getNavTargetObj = (title) => {
  console.log('in getNavTargetObj, start ', title && title);
  // Input validation
  if (!title) {
    console.error('Invalid title:', title);
    return null; // or throw an error
  }
  // Normalize title and convert to uppercase
  const constantFromPropsTitle = title.replace(/\s/g, '').toUpperCase();
  // Get the corresponding app section from constants
  const appSection = AppSectionsByScreen[constantFromPropsTitle] || null;
  // Get the screen name from constants, defaulting to 'DEFAULT' if not found
  const titleToUse = ScreenNames[constantFromPropsTitle] || ScreenNames.DEFAULT;

  console.log(
    'in getNavTargetObj, constantFromPropsTitle',
    constantFromPropsTitle
  );

  const returnObj = {
    targetSection: appSection,
    targetScreen: titleToUse,
  };
  console.log('in getNavTargetObj, returnObj', returnObj);
  return returnObj;
};
export default getNavTargetObj;
