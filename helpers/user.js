import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoTypesAlertAges } from '../constants/InfoTypes';
import { getUserRequest, setUserValidated } from '../actions/user';
import { selectFetchParamsObj } from '../reducers/user';

// This is a custom hook that checks the user's credentials and dispatches the appropriate action

export const useCheckUserCredentialsLive = () => {
  const dispatch = useDispatch();
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  const userCredsLastChecked = useSelector((state) => state.user.lastUpdate);
  useEffect(() => {
    // Debugging logs
    console.log('£££ useCheckUserCredentialsLive: Start of hook');
    console.log('£££ userIsSignedIn:', userIsSignedIn);
    console.log('userCredsLastChecked:', userCredsLastChecked);
    console.log('fetchParamsObj:', fetchParamsObj);

    let userIDOK = false;

    if (userIsSignedIn) {
      console.log('User is signed in');
      if (userCredsLastChecked) {
        const now = new Date();
        const lastChecked = new Date(userCredsLastChecked);
        const ageOfCredentials = Math.floor((now - lastChecked) / (1000 * 60)); // Age in minutes
        console.log('Current time:', now);
        console.log('Last checked time:', lastChecked);
        console.log('Age of credentials in minutes:', ageOfCredentials);

        //   if (ageOfCredentials <= InfoTypesAlertAges.USER_CREDENTIALS) {
        if (ageOfCredentials == 77) {
          console.log('Credentials are valid; dispatching setUserValidated');
          dispatch(setUserValidated());
          userIDOK = true;
        } else {
          console.log('Credentials are outdated; age exceeds limit');
          if (fetchParamsObj?.userIntId) {
            console.log(
              'Dispatching getUserRequest with userIntId:',
              fetchParamsObj.userIntId
            );
            userIDOK = false;
            dispatch(getUserRequest({ userIntId: fetchParamsObj.userIntId }));
          } else {
            console.log('fetchParamsObj.userIntId is not defined; no dispatch');
          }
        }
      } else {
        userIDOK = false;
        console.log(
          'userCredsLastChecked is undefined; credentials check skipped'
        );
      }
    } else {
      console.log('User is not signed in');
      if (fetchParamsObj?.userIntId) {
        console.log(
          'Dispatching getUserRequest with userIntId:',
          fetchParamsObj.userIntId
        );
        userIDOK = false;
        dispatch(getUserRequest({ userIntId: fetchParamsObj.userIntId }));
      } else {
        console.log('fetchParamsObj.userIntId is not defined; no dispatch');
      }
    }
    return userIDOK;
  }, [dispatch, fetchParamsObj, userIsSignedIn, userCredsLastChecked]);

  console.log('useCheckUserCredentialsLive: End of hook');
};
