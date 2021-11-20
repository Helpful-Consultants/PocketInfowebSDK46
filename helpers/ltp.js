import { sortObjectList } from './objects';

export const getSortedLtpItemsForUserBrand = (
  ltpItemsAll = [],
  userBrand = null
) => {
  let ltpItemsFiltered = [];

  console.log(
    'in getSortedLtpItemsForUserBrand userBrand',
    userBrand && userBrand,
    'ltpItemsAll',
    ltpItemsAll && ltpItemsAll.length
  );
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

  console.log(
    'in getSortedLtpItemsForUserBrand userBrand',
    userBrand && userBrand,
    'ltpItemsAll',
    ltpItemsAll && ltpItemsAll.length,
    'ltpItemsFiltered',
    ltpItemsFiltered && ltpItemsFiltered.length
  );

  const ltpItemsSorted =
    ltpItemsFiltered.length > 0
      ? sortObjectList(ltpItemsFiltered, 'loanToolNo', 'asc')
      : ltpItemsFiltered;
  console.log(
    'in getSortedLtpItemsForUserBrand ltpItemsSorted',
    ltpItemsSorted && ltpItemsSorted.length
  );

  return ltpItemsSorted;
};
