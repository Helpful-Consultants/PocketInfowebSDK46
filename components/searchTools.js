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
            return rawStringLowerCase.substring(0, 3);
          } else {
            // console.log(
            //   'rawString contains no digit ',
            //   rawString,
            //   rawStringLowerCase.substring(3, 4)
            // );
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  let newFilteredItems = [];

  let searchStringLowerCase =
    (searchString && searchString.toLowerCase()) || null;
  //   console.log('searchStringLowerCase ', searchStringLowerCase);

  let searchStringSpacesStripped =
    (searchStringLowerCase && searchStringLowerCase.replace(/\s+/g, '')) ||
    null;

  //   let logIt = false;
  //   console.log(searchString, searchStringSpacesStripped);

  //   if (searchStringSpacesStripped.includes('6558a')) {
  //     logIt = true;
  //   }

  //   if (logIt) {
  //     console.log('logIt', logIt, searchString, searchStringSpacesStripped);
  //   }

  let isAseVagVasSearch =
    searchStringSpacesStripped && searchStringSpacesStripped.length > 0
      ? stringChecker(searchStringSpacesStripped)
      : null;

  let searchStringSpacesStrippedWithoutAseVagVas = isAseVagVasSearch
    ? searchStringSpacesStripped.substr(3)
    : searchStringLowerCase;

  //   console.log(
  //     'aseVagVas',
  //     searchStringLowerCase,
  //     isAseVagVasSearch,
  //     searchStringSpacesStrippedWithoutAseVagVas
  //   );
  //

  //   if (logIt) {
  //     console.log(
  //       'logIt',
  //       logIt,
  //       searchString,
  //       'isAseVagVasSearch',
  //       isAseVagVasSearch,
  //       searchStringSpacesStrippedWithoutAseVagVas
  //     );
  //   }
  if (itemList && itemList.length > 0) {
    // console.log('searchRecords, point 0');
    itemList.map(item => {
      // console.log('searchRecords, in map', item);

      let isMatch = false;

      if (item.wipNumber) {
        let itemSupplierPartNo =
          (item.supplierPartNo && item.toolNumber.toLowerCase()) || '';
        let itemOrderPartNo =
          (item.orderPartNo && item.partNumber.toLowerCase()) || '';
        let itemDesc =
          (item.toolDescription && item.toolDescription.toLowerCase()) || '';

        let itemSupplierPartNoSpacesStripped =
          itemSupplierPartNo && itemSupplierPartNo.replace(/\s+/g, '');
        let itemOrderPartNoSpacesStripped =
          itemOrderPartNo && itemOrderPartNo.replace(/\s+/g, '');
        let itemDescSpacesStripped = itemDesc && itemDesc.replace(/\s+/g, '');
        // It's a wip!
      } else if (item.loanToolNo) {
        // loan tool
        //   console.log('searchRecords, point 1', item.loanToolNo);
        // if (logIt) console.log(searchString, 'point a loan tool');
        let itemLoanToolNo =
          (item.loanToolNo && item.loanToolNo.toLowerCase()) || '';
        let itemSupplierPartNo =
          (item.supplierPartNo && item.supplierPartNo.toLowerCase()) || '';
        let itemOrderPartNo =
          (item.orderPartNo && item.orderPartNo.toLowerCase()) || '';
        let itemDesc =
          (item.toolDescription && item.toolDescription.toLowerCase()) || '';

        let itemLoanToolNoSpacesStripped =
          itemLoanToolNo && itemLoanToolNo.replace(/\s+/g, '');
        let itemSupplierPartNoSpacesStripped =
          itemSupplierPartNo && itemSupplierPartNo.replace(/\s+/g, '');
        let itemOrderPartNoSpacesStripped =
          itemOrderPartNo && itemOrderPartNo.replace(/\s+/g, '');
        let itemDescSpacesStripped = itemDesc && itemDesc.replace(/\s+/g, '');

        //   console.log('itemSupplierPartNo', itemSupplierPartNo);
        //   console.log('itemOrderPartNo', itemOrderPartNo);
        //   console.log('itemDesc', itemDesc);
        //   console.log('itemSupplierPartNoSpacesStripped', itemSupplierPartNoSpacesStripped);
        //   console.log('itemOrderPartNoSpacesStripped', itemOrderPartNoSpacesStripped);
        //   console.log('itemSpacesStrippedDesc', itemSpacesStrippedDescription);
        if (isAseVagVasSearch) {
          //   if (logIt) console.log(searchString, 'point d');
          if (
            itemDescSpacesStripped &&
            itemDescSpacesStripped.includes(searchStringSpacesStripped)
          ) {
            // console.log('searchRecords, point 2', item.toolNo);
            isMatch = true;
          } else {
            // if (logIt) console.log(searchString, 'point ce');
            if (isAseVagVasSearch === 'ase') {
              //   if (logIt) console.log(searchString, 'point ase');
              if (
                itemOrderPartNoSpacesStripped &&
                itemOrderPartNoSpacesStripped.includes(
                  searchStringSpacesStripped
                )
              ) {
                // console.log('searchRecords, point 2', item.toolNo);
                isMatch = true;
              }
            } else {
              //   if (logIt) console.log(searchString, 'point vag vas');
              if (
                itemSupplierPartNoSpacesStripped &&
                itemSupplierPartNoSpacesStripped.includes(
                  searchStringSpacesStrippedWithoutAseVagVas
                )
              ) {
                // console.log('searchRecords, point 2', item.toolNo);
                isMatch = true;
              }
            }
          }
        } else if (
          (itemLoanToolNoSpacesStripped &&
            itemLoanToolNoSpacesStripped.includes(
              searchStringSpacesStripped
            )) ||
          (itemSupplierPartNoSpacesStripped &&
            itemSupplierPartNoSpacesStripped.includes(
              searchStringSpacesStripped
            )) ||
          (itemOrderPartNoSpacesStripped &&
            itemOrderPartNoSpacesStripped.includes(
              searchStringSpacesStripped
            )) ||
          (itemDesc && itemDesc.includes(searchStringLowerCase))
        ) {
          // console.log('searchRecords, point 2', item.toolNo);
          isMatch = true;
          // dealer tool}
        }
      } else if (item.toolNumber) {
        // dealer tool or equip

        let itemToolNo =
          (item.toolNumber && item.toolNumber.toLowerCase()) || '';
        let itemPartNo =
          (item.partNumber && item.partNumber.toLowerCase()) || '';
        let itemDesc =
          (item.partDescription && item.partDescription.toLowerCase()) || '';

        let itemToolNoSpacesStripped =
          itemToolNo && itemToolNo.replace(/\s+/g, '');
        let itemPartNoSpacesStripped =
          itemPartNo && itemPartNo.replace(/\s+/g, '');
        let itemDescSpacesStripped = itemDesc && itemDesc.replace(/\s+/g, '');

        // if (item.id && item.id === '5997') {
        //   console.log(item);
        // }
        //   console.log('itemToolNo', itemToolNo);
        //   console.log('itemPartNo', itemPartNo);
        //   console.log('itemDesc', itemDesc);
        //   console.log('itemToolNoSpacesStripped', itemToolNoSpacesStripped);
        //   console.log('itemPartNoSpacesStripped', itemPartNoSpacesStripped);
        //   console.log('itemSpacesStrippedDesc', itemSpacesStrippedDescription);
        // if (logIt) console.log(searchString, 'point c');

        // ASE/VAG/VAS don't apply to tools, just equip
        if (
          isAseVagVasSearch &&
          item.toolType &&
          (item.toolType === 'Equipment' || item.toolType === 'equipment')
        ) {
          //   if (logIt) console.log(searchString, 'point d');
          if (
            itemDescSpacesStripped &&
            itemDescSpacesStripped.includes(searchStringSpacesStripped)
          ) {
            // console.log('searchRecords, point 2', item.toolNo);
            isMatch = true;
          } else {
            // if (logIt) console.log(searchString, 'point ce');
            if (isAseVagVasSearch === 'ase') {
              //   if (logIt) console.log(searchString, 'point ase');
              if (
                itemPartNoSpacesStripped &&
                itemPartNoSpacesStripped.includes(
                  searchStringSpacesStrippedWithoutAseVagVas
                )
              ) {
                // console.log('searchRecords, point 2', item.toolNo);
                isMatch = true;
              }
            } else {
              //   if (logIt) console.log(searchString, 'point vag vas');
              if (
                itemToolNoSpacesStripped &&
                itemToolNoSpacesStripped.includes(
                  searchStringSpacesStrippedWithoutAseVagVas
                )
              ) {
                // console.log('searchRecords, point 2', item.toolNo);
                isMatch = true;
              }
            }
          }
        } else if (
          // search part no for both tools & equip
          (itemPartNoSpacesStripped &&
            itemPartNoSpacesStripped.includes(searchStringSpacesStripped)) ||
          // only search tool no for equip
          (item.toolType &&
            (item.toolType === 'Equipment' || item.toolType === 'equipment') &&
            itemToolNoSpacesStripped &&
            itemToolNoSpacesStripped.includes(searchStringSpacesStripped)) ||
          // search desc for both tools & equip
          (itemDesc && itemDesc.includes(searchStringLowerCase))
        ) {
          //   console.log('searchRecords, point 3', item.toolNo);
          isMatch = true;
        }
      }

      if (isMatch) {
        //   console.log('*******searchRecords, point 5', isMatch, item);
        newFilteredItems.push(item);
        // if (logIt) console.log(searchString, 'match');
      }
    });
    // console.log('££££££££££newFilteredItems', newFilteredItems.length);
    // setFilteredItems(newFilteredItems);
    return newFilteredItems;
  }
};
