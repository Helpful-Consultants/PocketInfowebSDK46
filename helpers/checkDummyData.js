import InfoTypes from '../constants/InfoTypes';

const dummyDataTypes = {
  ltpLoans: true,
  news: true,
  odis: true,
  serviceMeasures: true,
};

const shouldWeUseDummyData = (infoType) => {
  //   console.log(
  //     '^^^^^^^^^^^^^^^props:',
  //     infoType,
  //     dummyDataTypes.serviceMeasures
  //   );
  if (dummyDataTypes[infoType]) {
    return true;
  } else {
    return false;
  }
};

export default shouldWeUseDummyData;
