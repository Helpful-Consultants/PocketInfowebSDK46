import { AppSectionsByScreen, ScreenNames } from '../constants/AppParts';

const getNavTargetObj = (title) => {
  alert('in getNavTargetObj, start ' + title && title);
  // Input validation
  if (!title) {
    alert('Invalid title:' + title);
    return null; // or throw an error
  }
  // Normalize title and convert to uppercase
  const constantFromPropsTitle = title?.replace(/\s/g, '').toUpperCase();
  alert('constantFromPropsTitle' + constantFromPropsTitle);
  // Get the corresponding app section from constants
  const appSectionToUse = AppSectionsByScreen?.[constantFromPropsTitle] ?? '';
  alert('appSectionToUse' + appSectionToUse);
  // Get the screen name from constants, defaulting to 'DEFAULT' if not found
  const titleToUse =
    ScreenNames?.[constantFromPropsTitle] ?? ScreenNames.DEFAULT;

  alert(
    'in getNavTargetObj, titleToUse ' +
      JSON.stringify(titleToUse) +
      'appSectionToUse ' +
      JSON.stringify(appSectionToUse)
  );

  const returnObj = {
    targetSection: appSectionToUse,
    targetScreen: titleToUse,
  };
  alert('in getNavTargetObj, returnObj' + JSON.stringify(returnObj));
  return returnObj;
};
export default getNavTargetObj;
