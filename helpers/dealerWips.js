// import { sortObjectList } from './objects';

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
      (item) =>
        item.tools &&
        item.tools.length > 0 &&
        item.userIntId &&
        item.userIntId.toString() == userIntId
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
