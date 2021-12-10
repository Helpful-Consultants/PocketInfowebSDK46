import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import reducers from '../reducers';
import rootSaga from '../sagas';
import AsyncStorage from '@react-native-async-storage/async-storage'; //was breaking

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const myMiddleware = (store) => (next) => (action) => {
//   console.log('@@@@@@@@@@@@@@ My first middleware ran');
//   return next(action);
// };
// const mySecondMiddleware = (store) => (next) => (action) => {
//   console.log('@@@@@@@@@@@@@@ My second middleware ran');
//   return next(action);
// };
// const myThirdMiddleware = (store) => (next) => (action) => {
//   console.log('@@@@@@@@@@@@@@ My third middleware ran');
//   return next(action);
// };
const persistedReducer = persistReducer(persistConfig, reducers);

console.log('creating store');

// const store = compose(persistedReducer, {}, applyMiddleware(sagaMiddleware));
export const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(
//   persistedReducer,
//   {},
//   compose(applyMiddleware(sagaMiddleware))
// );

function configStore() {
  const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(sagaMiddleware))
  );
  //   sagaMiddleware.run(rootSaga);
  return store;
}

function runSaga() {
  //   console.log('!!!!! in runSaga');
  sagaMiddleware.run(rootSaga);
}
export const store = configStore();

export const runSagaMiddleware = () => {
  //   console.log('!!!!! in runSagaMiddleware');
  runSaga();
};

// sagaMiddleware.run(rootSaga);

// export default store;

// sagaMiddleware.run;
// ...createStore(reducer, initialState, applyMiddleware(/* other middleware, */sagaMiddleware)),
//     runSaga: sagaMiddleware.run
