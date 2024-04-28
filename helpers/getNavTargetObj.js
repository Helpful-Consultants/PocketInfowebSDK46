import { AppSectionsByScreen, ScreenNames } from '../constants/AppParts';

const getNavTargetObj = (title) => {
  console.log('in getNavTargetObj, start ' + title && title);
  // Input validation
  if (!title) {
    console.log('Invalid title:' + title);
    return null; // or throw an error
  }
  // Normalize title and convert to uppercase
  const constantFromPropsTitle = title?.replace(/\s/g, '').toUpperCase();
  console.log('constantFromPropsTitle' + constantFromPropsTitle);
  // Get the corresponding app section from constants
  const appSectionToUse = AppSectionsByScreen?.[constantFromPropsTitle] ?? '';
  console.log('appSectionToUse' + appSectionToUse);
  // Get the screen name from constants, defaulting to 'DEFAULT' if not found
  const titleToUse =
    ScreenNames?.[constantFromPropsTitle] ?? ScreenNames.DEFAULT;

  console.log(
    'in getNavTargetObj, titleToUse ' +
      JSON.stringify(titleToUse) +
      'appSectionToUse ' +
      JSON.stringify(appSectionToUse)
  );

  const returnObj = {
    targetSection: appSectionToUse,
    targetScreen: titleToUse,
  };
  console.log('in getNavTargetObj, returnObj' + JSON.stringify(returnObj));
  return returnObj;
};
export default getNavTargetObj;
