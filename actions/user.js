import Types from '../constants/Types';

export const getUserStart = () => ({
  type: Types.GET_USER_START,
});

export const checkUserCredentialsRequest = ({ email, pin }) => ({
  type: Types.CHECK_USER_CREDENTIALS_REQUEST,
  payload: {
    email,
    pin,
  },
});

export const getUserRequest = ({ userIntId }) => ({
  type: Types.GET_USER_REQUEST,
  payload: {
    userIntId,
  },
});

export const signOutUserRequest = ({ calledBy }) => ({
  type: Types.SIGN_OUT_USER_REQUEST,
  payload: {
    calledBy: calledBy || null,
  },
});

export const getUserSuccess = ({ statusCode, items }) => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    items,
    // userPin,
    statusCode,
  },
});

export const setUserValidated = () => ({
  type: Types.SET_USER_VALIDATED,
});

export const setUserOutdatedCredentials = () => ({
  type: Types.SET_USER_OUTDATED_CREDENTIALS,
});

export const setUserRequestedDemoData = ({ requestedDemoData }) => ({
  type: Types.SET_USER_REQUESTED_DEMO_DATA,
  payload: {
    requestedDemoData: requestedDemoData || null,
  },
});

export const setUserRequestedDemoApp = ({ showDemoApp }) => ({
  type: Types.SET_USER_REQUESTED_DEMO_APP,
  payload: {
    showDemoApp,
    fish: 'cake',
  },
});

export const revalidateUserCredentials = ({ calledBy }) => ({
  type: Types.REVALIDATE_USER_CREDENTIALS,
  payload: {
    calledBy: calledBy || null,
  },
});

export const setNotificationTarget = ({ targetScreen, targetSection }) => ({
  type: Types.SET_NOTIFICATION_TARGET,
  payload: { targetScreen, targetSection },
});

export const resetNotificationTarget = () => ({
  type: Types.RESET_NOTIFICATION_TARGET,
});

export const userError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.USER_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
