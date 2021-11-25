import { sortObjectList } from '../helpers/objects';

const buildBookedOutToolsArrForJob = (wip) => {
  const thisWipsToolsArr = wip.tools.map((tool) => ({
    ...tool,
    wipNumber: wip.wipNumber,
    wipId: wip.id.toString(),
    wipCreatedDate: wip.createdDate,
  }));
  return thisWipsToolsArr;
};

export const getSortedDealerWipsItemsForUser = (
  dealerWipsItemsAll = [],
  userIntId = null
) => {
  //   console.log('in getSortedDealerWipsItemsForUser');
  let dealerWipsItemsFiltered = [];

  if (userIntId) {
    //   const tempItem = dealerWipsItemsAll[2];
    //   console.log(
    //     'userBrand is ',
    //     userBrand,
    //     dealerWipsItemsAll.length,
    //     tempItem[userBrand]
    //   );
    dealerWipsItemsFiltered = dealerWipsItemsAll.filter(
      (wip) =>
        wip.tools &&
        wip.tools.length > 0 &&
        wip.userIntId &&
        wip.userIntId.toString() == userIntId
    );
  }
  //   const dealerWipsItemsSorted =
  //     dealerWipsItemsFiltered.length > 0
  //       ? sortObjectList(dealerWipsItemsFiltered, 'loanToolNo', 'asc')
  //       : dealerWipsItemsFiltered;

  //   console.log(
  //     'in getSorteddealerWipsItemsForUserBrand userIntId',
  //     userIntId && userIntId,
  //     'dealerWipsItemsAll',
  //     dealerWipsItemsAll && dealerWipsItemsAll.length,
  //     'dealerWipsItemsFiltered',
  //     dealerWipsItemsFiltered && dealerWipsItemsFiltered.length
  //     // 'dealerWipsItemsSorted',
  //     // dealerWipsItemsSorted && dealerWipsItemsSorted.length
  //   );

  return dealerWipsItemsFiltered;
};

export const getSortedBookedOutTools = (wips = []) => {
  let allToolsArr = [];

  wips.forEach((wip) => {
    if (wip.tools && wip.tools.length > 0) {
      let wipToolsArr = buildBookedOutToolsArrForJob(wip);
      allToolsArr.push(...wipToolsArr);
    }
  });
  //   allToolsArr.sort((a, b) => a.partNumber > b.partNumber);
  return sortObjectList(allToolsArr, 'partNumber', 'asc');
};

export const getSortedBookedOutToolsForUser = (wips = [], userIntId = null) => {
  let allToolsArr = [];

  userIntId &&
    wips.forEach((wip) => {
      if (
        wip.tools &&
        wip.tools.length > 0 &&
        wip.userIntId &&
        wip.userIntId.toString() == userIntId
      ) {
        let wipToolsArr = buildBookedOutToolsArrForJob(wip);
        allToolsArr.push(...wipToolsArr);
      }
    });
  //   allToolsArr.sort((a, b) => a.partNumber > b.partNumber);
  return sortObjectList(allToolsArr, 'partNumber', 'asc');
};
