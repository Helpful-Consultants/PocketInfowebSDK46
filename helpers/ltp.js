import { sortObjectList } from './objects';

export const getSortedUniqueLtpItems = (ltpItemsAll = []) => {
  //   console.log('in helper getSortedUniqueLtpItems');
  let ltpItemsFiltered =
    ltpItemsAll.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.orderPartNo === item.orderPartNo)
    ) || [];

  const ltpItemsSorted =
    ltpItemsFiltered.length > 0
      ? sortObjectList(ltpItemsFiltered, 'loanToolNo', 'asc')
      : ltpItemsFiltered;

  //   console.log(
  //     'in helper getSortedUniqueLtpItems',
  //     'ltpItemsAll',
  //     ltpItemsAll && ltpItemsAll.length,
  //     'ltpItemsFiltered',
  //     ltpItemsFiltered && ltpItemsFiltered.length,
  //     'ltpItemsSorted',
  //     ltpItemsSorted && ltpItemsSorted.length
  //   );

  return ltpItemsSorted;
};

export const getSortedLtpItemsForUserBrand = (
  ltpItemsAll = [],
  userBrand = null
) => {
  //   console.log('in helper getSortedLtpItemsForUserBrand');
  let ltpItemsFiltered = [];

  if (userBrand) {
    //   const tempItem = ltpItemsAll[2];
    //   console.log(
    //     'userBrand is ',
    //     userBrand,
    //     ltpItemsAll.length,
    //     tempItem[userBrand]
    //   );
    ltpItemsFiltered = ltpItemsAll.filter(
      (item) => item[userBrand] === ('Y' || 'y')
    );
  } else {
    //   console.log('userBrand isnt : ', userBrand);
    ltpItemsFiltered = ltpItemsAll.filter(
      (item) =>
        item.au === ('Y' || 'y') ||
        item.cv === ('Y' || 'y') ||
        item.se === ('Y' || 'y') ||
        item.sk === ('Y' || 'y') ||
        item.vw === ('Y' || 'y')
    );
  }
  const ltpItemsSorted =
    ltpItemsFiltered.length > 0
      ? sortObjectList(ltpItemsFiltered, 'loanToolNo', 'asc')
      : ltpItemsFiltered;

  //   console.log(
  //     'in helper getSortedLtpItemsForUserBrand userBrand',
  //     userBrand && userBrand,
  //     'ltpItemsAll',
  //     ltpItemsAll && ltpItemsAll.length,
  //     'ltpItemsFiltered',
  //     ltpItemsFiltered && ltpItemsFiltered.length,
  //     'ltpItemsSorted',
  //     ltpItemsSorted && ltpItemsSorted.length
  //   );

  return ltpItemsSorted;
};
