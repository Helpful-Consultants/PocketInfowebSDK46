// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUserOutdatedCredentials } from '../actions/user';
// import { setUserValidated } from '../actions/user';
import moment from 'moment';

export default revalidateUser = (
  userIsValidated,
  userIsSignedIn,
  userCredsLastChecked,
  dispatch
) => {
  //   const userIsValidated = useSelector(state => state.user.userIsValidated);
  //   const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  //   const userCredsLastChecked = useSelector(state => state.user.lastUpdate);
  console.log('revalidateUser, userIsValidated', userIsValidated);
  console.log('revalidateUser, userIsSignedIn', userIsSignedIn);
  console.log('revalidateUser,userCredsLastChecked', userCredsLastChecked);
  //   const dispatch = useDispatch();
  //   return <AuthLoadingScreen />;

  let now = moment();
  const ageOfCredentialsLimit = 3;

  if (userIsSignedIn && userIsSignedIn === true) {
    if (userCredsLastChecked) {
      console.log('now:', now);
      let ageOfCredentials = now.diff(userCredsLastChecked, 'minutes');
      console.log('ageOfCredentials:', ageOfCredentials);
      if (ageOfCredentials <= ageOfCredentialsLimit) {
        dispatch(setUserValidated());
        console.log('ageOfCredentials good', ageOfCredentials);
      } else {
        console.log('ageOfCredentials bad', ageOfCredentials);
        dispatch(setUserOutdatedCredentials());
      }
    }
  }
};
