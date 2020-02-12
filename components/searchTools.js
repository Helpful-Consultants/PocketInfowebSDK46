const stringChecker = (rawString = '') => {
  console.log('rawString ', rawString);
  if (rawString && rawString.length > 0) {
    const rawStringLowerCase = rawString.toLowerCase();
    const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
    if (
      rawStringLowerCase.substring(0, 3) === 'ase' ||
      rawStringLowerCase.substring(0, 3) === 'vas' ||
      rawStringLowerCase.substring(0, 3) === 'vag'
    ) {
      console.log(
        'rawString contains it ',
        rawString,
        rawStringLowerCase.substring(0, 3)
      );
      if (isNumeric(rawStringLowerCase.substring(3, 4))) {
        console.log(
          'rawString contains digit ',
          rawString,
          rawStringLowerCase.substring(3, 4)
        );
        return true;
      } else {
        console.log(
          'rawString contains no digit ',
          rawString,
          rawStringLowerCase.substring(3, 4)
        );
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default searchTools = (
  itemList = [],
  searchString = null
  //   adjustedSearchString = null
) => {
  //   console.log('searchString passed ', searchString);
  //   console.log('adjustedSearchString passed ', adjustedSearchString);

  //   console.log(
  //   //     'itemList',
  //   //     (itemList && itemList.length > 0 && itemList.length) || 0
  //   //   );

  let newFilteredItems = [];

  let searchStringLowerCase =
    (searchString && searchString.toLowerCase()) || null;
  //   console.log('searchStringLowerCase ', searchStringLowerCase);

  let searchStringSpaceStripped =
    (searchStringLowerCase && searchStringLowerCase.replace(/\s+/g, '')) ||
    null;

  let aseVagVas =
    searchStringSpaceStripped && searchStringSpaceStripped.length > 0
      ? stringChecker(searchStringSpaceStripped)
      : false;

  console.log('aseVagVas', searchStringSpaceStripped, aseVagVas);
  //   console.log('searchStringSpaceStripped ', searchStringSpaceStripped);

  //   let adjustedSearchStringLowerCase =
  //     (adjustedSearchString && adjustedSearchString.toLowerCase()) || null;
  //   //   console.log('adjustedSearchStringLowerCase ', adjustedSearchStringLowerCase);
  //   let adjustedSearchStringSpaceStripped =
  //     (adjustedSearchStringLowerCase &&
  //       adjustedSearchStringLowerCase.replace(/\s+/g, '')) ||
  //     null;
  //   console.log(
  //     'adjustedSearchStringSpaceStripped ',
  //     adjustedSearchStringSpaceStripped
  //   );
  // let itemListTemp = itemList.slice(0, 1);
  //   let itemListTemp = itemList;
  // console.log('itemListTemp', itemListTemp);
  // if (itemList && itemList.length > 0) {
  if (itemList && itemList.length > 0) {
    // console.log('searchRecords, point 0');
    itemList.map(item => {
      // console.log('searchRecords, in map', item);

      let isMatch = false;

      if (item.loanToolNo) {
        // loan tool
        //   console.log('searchRecords, point 1', item.loanToolNo);

        let itemLoanToolNumber =
          (item.loanToolNo && item.loanToolNo.toLowerCase()) || '';
        let itemToolNumber =
          (item.supplierPartNo && item.supplierPartNo.toLowerCase()) || '';
        let itemPartNumber =
          (item.orderPartNo && item.orderPartNo.toLowerCase()) || '';
        let itemDescription =
          (item.toolDescription && item.toolDescription.toLowerCase()) || '';

        let itemSpaceStrippedLoanToolNumber =
          itemLoanToolNumber && itemLoanToolNumber.replace(/\s+/g, '');
        let itemSpaceStrippedToolNumber =
          itemToolNumber && itemToolNumber.replace(/\s+/g, '');
        let itemSpaceStrippedPartNumber =
          itemPartNumber && itemPartNumber.replace(/\s+/g, '');
        let itemSpaceStrippedDescription =
          itemDescription && itemDescription.replace(/\s+/g, '');

        //   console.log('itemToolNumber', itemToolNumber);
        //   console.log('itemPartNumber', itemPartNumber);
        //   console.log('itemDesc', itemDescription);
        //   console.log('itemSpaceStrippedToolNumber', itemSpaceStrippedToolNumber);
        //   console.log('itemSpaceStrippedPartNumber', itemSpaceStrippedPartNumber);
        //   console.log('itemSpaceStrippedDesc', itemSpaceStrippedDescription);

        if (
          searchStringLowerCase &&
          (itemLoanToolNumber.includes(searchStringLowerCase) ||
            itemToolNumber.includes(searchStringLowerCase) ||
            itemPartNumber.includes(searchStringLowerCase) ||
            itemDescription.includes(searchStringLowerCase))
        ) {
          // console.log('searchRecords, point 2', item.toolNumber);
          isMatch = true;
          // } else if (
          //   adjustedSearchString &&
          //   (itemLoanToolNumber.includes(adjustedSearchString) ||
          //     itemToolNumber.includes(adjustedSearchString) ||
          //     itemPartNumber.includes(adjustedSearchString) ||
          //     itemDescription.includes(adjustedSearchString))
          // ) {
          //   // console.log('searchRecords, point 3', item.toolNumber);
          //   isMatch = true;
        } else if (
          searchStringSpaceStripped &&
          (itemSpaceStrippedLoanToolNumber.includes(
            searchStringSpaceStripped
          ) ||
            itemSpaceStrippedToolNumber.includes(searchStringSpaceStripped) ||
            itemSpaceStrippedPartNumber.includes(searchStringSpaceStripped))
        ) {
          // console.log('searchRecords, point 3', item.toolNumber);
          isMatch = true;
          // } else if (
          //   adjustedSearchStringSpaceStripped &&
          //   (itemSpaceStrippedLoanToolNumber.includes(
          //     adjustedSearchStringSpaceStripped
          //   ) ||
          //     itemSpaceStrippedToolNumber.includes(
          //       adjustedSearchStringSpaceStripped
          //     ) ||
          //     itemSpaceStrippedPartNumber.includes(
          //       adjustedSearchStringSpaceStripped
          //     ))
          // ) {
          //   // console.log('searchRecords, point 4', item.toolNumber);
          //   isMatch = true;
        }
        // dealer tool
      } else if (item.toolNumber) {
        let itemToolNumber =
          (item.toolNumber && item.toolNumber.toLowerCase()) || '';
        let itemPartNumber =
          (item.partNumber && item.partNumber.toLowerCase()) || '';
        let itemDescription =
          (item.partDescription && item.partDescription.toLowerCase()) || '';

        let itemSpaceStrippedToolNumber =
          itemToolNumber && itemToolNumber.replace(/\s+/g, '');
        let itemSpaceStrippedPartNumber =
          itemPartNumber && itemPartNumber.replace(/\s+/g, '');
        let itemSpaceStrippedDescription =
          itemDescription && itemDescription.replace(/\s+/g, '');

        //   console.log('itemToolNumber', itemToolNumber);
        //   console.log('itemPartNumber', itemPartNumber);
        //   console.log('itemDesc', itemDescription);
        //   console.log('itemSpaceStrippedToolNumber', itemSpaceStrippedToolNumber);
        //   console.log('itemSpaceStrippedPartNumber', itemSpaceStrippedPartNumber);
        //   console.log('itemSpaceStrippedDesc', itemSpaceStrippedDescription);

        if (
          searchStringLowerCase &&
          (itemToolNumber.includes(searchStringLowerCase) ||
            itemPartNumber.includes(searchStringLowerCase) ||
            itemDescription.includes(searchStringLowerCase))
        ) {
          // console.log('searchRecords, point 2', item.toolNumber);
          isMatch = true;
          // } else if (
          //   adjustedSearchString &&
          //   (itemToolNumber.includes(adjustedSearchString) ||
          //     itemPartNumber.includes(adjustedSearchString) ||
          //     itemDescription.includes(adjustedSearchString))
          // ) {
          //   // console.log('searchRecords, point 4', item.toolNumber);
          //   isMatch = true;
        } else if (
          searchStringSpaceStripped &&
          (itemSpaceStrippedToolNumber.includes(searchStringSpaceStripped) ||
            itemSpaceStrippedPartNumber.includes(searchStringSpaceStripped))
        ) {
          // console.log('searchRecords, point 3', item.toolNumber);
          isMatch = true;
          // } else if (
          //   adjustedSearchStringSpaceStripped &&
          //   (itemSpaceStrippedToolNumber.includes(
          //     adjustedSearchStringSpaceStripped
          //   ) ||
          //     itemSpaceStrippedPartNumber.includes(
          //       adjustedSearchStringSpaceStripped
          //     ))
          // ) {
          //   // console.log('searchRecords, point 4', item.toolNumber);
          //   isMatch = true;
        }
      }
      if (isMatch) {
        //   console.log('*******searchRecords, point 5', isMatch, item);
        newFilteredItems.push(item);
      }
    });
    // console.log('££££££££££newFilteredItems', newFilteredItems.length);
    // setFilteredItems(newFilteredItems);
    return newFilteredItems;
  }
};
