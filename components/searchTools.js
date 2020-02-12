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

  const stringChecker = (rawString = '') => {
    // console.log('rawString ', rawString);
    if (rawString && rawString.length > 0) {
      const rawStringLowerCase = rawString.toLowerCase();
      const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
      if (rawString.length > 3) {
        if (
          rawStringLowerCase.substring(0, 3) === 'ase' ||
          rawStringLowerCase.substring(0, 3) === 'vas' ||
          rawStringLowerCase.substring(0, 3) === 'vag'
        ) {
          //   console.log(
          //     'rawString contains it ',
          //     rawString,
          //     rawStringLowerCase.substring(0, 3)
          //   );

          if (isNumeric(rawStringLowerCase.substring(3, 4))) {
            // console.log(
            //   'rawString contains digit ',
            //   rawString,
            //   rawStringLowerCase.substring(3, 4)
            // );
            return true;
          } else {
            // console.log(
            //   'rawString contains no digit ',
            //   rawString,
            //   rawStringLowerCase.substring(3, 4)
            // );
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  let newFilteredItems = [];

  let searchStringLowerCase =
    (searchString && searchString.toLowerCase()) || null;
  //   console.log('searchStringLowerCase ', searchStringLowerCase);

  let searchStringSpaceStripped =
    (searchStringLowerCase && searchStringLowerCase.replace(/\s+/g, '')) ||
    null;

  let isAseVagVasSearch =
    searchStringSpaceStripped && searchStringSpaceStripped.length > 0
      ? stringChecker(searchStringSpaceStripped)
      : false;

  let searchStringSpaceStrippedWithoutAseVagVas = isAseVagVasSearch
    ? searchStringSpaceStripped.substr(3)
    : searchStringLowerCase;

  //   console.log(
  //     'aseVagVas',
  //     searchStringLowerCase,
  //     isAseVagVasSearch,
  //     searchStringSpaceStrippedWithoutAseVagVas
  //   );
  //
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

        let itemLoanToolNumberSpaceStripped =
          itemLoanToolNumber && itemLoanToolNumber.replace(/\s+/g, '');
        let itemToolNumberSpaceStripped =
          itemToolNumber && itemToolNumber.replace(/\s+/g, '');
        let itemPartNumberSpaceStripped =
          itemPartNumber && itemPartNumber.replace(/\s+/g, '');
        let itemSpaceStrippedDescription =
          itemDescription && itemDescription.replace(/\s+/g, '');

        //   console.log('itemToolNumber', itemToolNumber);
        //   console.log('itemPartNumber', itemPartNumber);
        //   console.log('itemDesc', itemDescription);
        //   console.log('itemToolNumberSpaceStripped', itemToolNumberSpaceStripped);
        //   console.log('itemPartNumberSpaceStripped', itemPartNumberSpaceStripped);
        //   console.log('itemSpaceStrippedDesc', itemSpaceStrippedDescription);
        if (isAseVagVasSearch) {
          if (
            (itemToolNumberSpaceStripped &&
              itemToolNumberSpaceStripped.includes(
                searchStringSpaceStripped
              )) ||
            (itemPartNumberSpaceStripped &&
              itemPartNumberSpaceStripped.includes(
                searchStringSpaceStripped
              )) ||
            (itemDescription &&
              itemDescription.includes(
                searchStringSpaceStrippedWithoutAseVagVas
              ))
          ) {
            // console.log('searchRecords, point 2', item.toolNumber);
            isMatch = true;
          }
        } else if (
          (itemLoanToolNumberSpaceStripped &&
            itemLoanToolNumberSpaceStripped.includes(
              searchStringSpaceStripped
            )) ||
          (itemToolNumberSpaceStripped &&
            itemToolNumberSpaceStripped.includes(searchStringSpaceStripped)) ||
          (itemPartNumberSpaceStripped &&
            itemPartNumberSpaceStripped.includes(searchStringSpaceStripped)) ||
          (itemDescription && itemDescription.includes(searchStringLowerCase))
        ) {
          // console.log('searchRecords, point 2', item.toolNumber);
          isMatch = true;
          // dealer tool}
        }
      } else if (item.toolNumber) {
        let itemToolNumber =
          (item.toolNumber && item.toolNumber.toLowerCase()) || '';
        let itemPartNumber =
          (item.partNumber && item.partNumber.toLowerCase()) || '';
        let itemDescription =
          (item.partDescription && item.partDescription.toLowerCase()) || '';

        let itemToolNumberSpaceStripped =
          itemToolNumber && itemToolNumber.replace(/\s+/g, '');
        let itemPartNumberSpaceStripped =
          itemPartNumber && itemPartNumber.replace(/\s+/g, '');
        // let itemSpaceStrippedDescription =
        //   itemDescription && itemDescription.replace(/\s+/g, '');

        //   console.log('itemToolNumber', itemToolNumber);
        //   console.log('itemPartNumber', itemPartNumber);
        //   console.log('itemDesc', itemDescription);
        //   console.log('itemToolNumberSpaceStripped', itemToolNumberSpaceStripped);
        //   console.log('itemPartNumberSpaceStripped', itemPartNumberSpaceStripped);
        //   console.log('itemSpaceStrippedDesc', itemSpaceStrippedDescription);

        if (isAseVagVasSearch) {
          if (
            (itemToolNumberSpaceStripped &&
              itemToolNumberSpaceStripped.includes(
                searchStringSpaceStripped
              )) ||
            (itemPartNumberSpaceStripped &&
              itemPartNumberSpaceStripped.includes(
                searchStringSpaceStripped
              )) ||
            (itemDescription &&
              itemDescription.includes(
                searchStringSpaceStrippedWithoutAseVagVas
              ))
          ) {
            // console.log('searchRecords, point 2', item.toolNumber);
            isMatch = true;
          }
        } else if (
          (itemToolNumberSpaceStripped &&
            itemToolNumberSpaceStripped.includes(searchStringSpaceStripped)) ||
          (itemPartNumberSpaceStripped &&
            itemPartNumberSpaceStripped.includes(searchStringSpaceStripped)) ||
          (itemDescription && itemDescription.includes(searchStringLowerCase))
        ) {
          //   console.log('searchRecords, point 3', item.toolNumber);
          isMatch = true;
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
