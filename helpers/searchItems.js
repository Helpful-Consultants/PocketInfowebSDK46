export default searchItems = (
  itemList = [],
  searchString = null
  //   adjustedSearchString = null
) => {
  const stringChecker = (rawString = '') => {
    // console.log('rawString ', rawString);

    if (rawString && rawString.length > 0) {
      const rawStringLowerCase = rawString.toLowerCase();
      const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);
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

  let isAseVagVasSearch =
    searchStringSpacesStripped && searchStringSpacesStripped.length > 0
      ? stringChecker(searchStringSpacesStripped)
      : null;

  let searchStringSpacesStrippedWithoutAseVagVas = isAseVagVasSearch
    ? searchStringSpacesStripped.substr(3)
    : searchStringLowerCase;

  const bookedToolMatcher = (item) => {
    // console.log('in bookedToolMatcher', item);
    if (item.wipNumber.includes(searchString)) {
      return true;
    } else {
      //   console.log('booked tool', item);
      let toolSupplierPartNo =
        (item.toolNumber && item.toolNumber.toLowerCase()) || '';
      let toolOrderPartNo =
        (item.partNumber && item.partNumber.toLowerCase()) || '';
      let toolDesc =
        (item.partDescription && item.partDescription.toLowerCase()) || '';

      let toolSupplierPartNoSpacesStripped =
        toolSupplierPartNo && toolSupplierPartNo.replace(/\s+/g, '');
      let toolOrderPartNoSpacesStripped =
        toolOrderPartNo && toolOrderPartNo.replace(/\s+/g, '');
      let toolDescSpacesStripped = toolDesc && toolDesc.replace(/\s+/g, '');
      //   console.log(
      //     toolSupplierPartNoSpacesStripped,
      //     toolOrderPartNoSpacesStripped,
      //     toolDescSpacesStripped
      //   );
      if (isAseVagVasSearch) {
        // console.log('isAseVagVasSearch', isAseVagVasSearch);
        //   if (logIt) console.log(searchString, 'point d');
        if (
          toolDescSpacesStripped &&
          toolDescSpacesStripped.includes(searchStringSpacesStripped)
        ) {
          // console.log('searchRecords, point 2', tool.toolNo);
          return true;
        } else {
          // if (logIt) console.log(searchString, 'point ce');
          if (isAseVagVasSearch === 'ase') {
            //   if (logIt) console.log(searchString, 'point ase');
            if (
              toolOrderPartNoSpacesStripped &&
              toolOrderPartNoSpacesStripped.includes(searchStringSpacesStripped)
            ) {
              // console.log('searchRecords, point 2', tool.toolNo);
              return true;
            }
          } else {
            //   if (logIt) console.log(searchString, 'point vag vas')
            if (
              toolSupplierPartNoSpacesStripped &&
              toolSupplierPartNoSpacesStripped.includes(
                searchStringSpacesStrippedWithoutAseVagVas
              )
            ) {
              // console.log('searchRecords, point 2', item.toolNo);
              return true;
            }
          }
        }
      } else if (
        (toolSupplierPartNoSpacesStripped &&
          toolSupplierPartNoSpacesStripped.includes(
            searchStringSpacesStripped
          )) ||
        (toolOrderPartNoSpacesStripped &&
          toolOrderPartNoSpacesStripped.includes(searchStringSpacesStripped)) ||
        (toolDesc && toolDesc.includes(searchStringLowerCase))
      ) {
        // console.log('searchRecords, point 2', item.toolNo);
        return true;
        // dealer tool}
      }
    }

    return false;
  };

  const loanToolMatcher = (item) => {
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

    // if (itemLoanToolNo === 'lt0004') {
    //   //   console.log('searchString', searchString);
    //   //   console.log('searchStringLowerCase', searchStringLowerCase);
    //   //   console.log('searchStringSpacesStripped', searchStringSpacesStripped);
    //   console.log('itemSupplierPartNo', itemSupplierPartNo);
    //   console.log('itemOrderPartNo', itemOrderPartNo);
    //   console.log('itemDesc', itemDesc);
    //   console.log(
    //     'itemSupplierPartNoSpacesStripped',
    //     itemSupplierPartNoSpacesStripped
    //   );
    //   console.log(
    //     'itemOrderPartNoSpacesStripped',
    //     itemOrderPartNoSpacesStripped
    //   );
    //   console.log('itemSpacesStrippedDesc', itemDescSpacesStripped);
    // }

    if (isAseVagVasSearch) {
      //   if (logIt) console.log(searchString, 'point d');
      if (
        itemDescSpacesStripped &&
        itemDescSpacesStripped.includes(searchStringSpacesStripped)
      ) {
        // console.log('searchRecords, point 2', item.toolNo);
        return true;
      } else {
        // if (logIt) console.log(searchString, 'point ce');
        if (isAseVagVasSearch === 'ase') {
          //   if (logIt) console.log(searchString, 'point ase');
          if (
            itemOrderPartNoSpacesStripped &&
            itemOrderPartNoSpacesStripped.includes(searchStringSpacesStripped)
          ) {
            // console.log('searchRecords, point 2', item.toolNo);
            return true;
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
            return true;
          }
        }
      }
    } else if (
      (itemLoanToolNoSpacesStripped &&
        itemLoanToolNoSpacesStripped.includes(searchStringSpacesStripped)) ||
      (itemSupplierPartNoSpacesStripped &&
        itemSupplierPartNoSpacesStripped.includes(
          searchStringSpacesStripped
        )) ||
      (itemOrderPartNoSpacesStripped &&
        itemOrderPartNoSpacesStripped.includes(searchStringSpacesStripped)) ||
      (itemDesc && itemDesc.includes(searchStringLowerCase))
    ) {
      //   console.log('loanToolMatcher, point 2', itemLoanToolNo);
      return true;
      // dealer tool}
    }
    // console.log('loanToolMatcher, no match', itemLoanToolNo);
    return false;
  };

  const ltpLoanMatcher = (item) => {
    let itemLoanToolNo =
      (item.loanToolNo && item.loanToolNo.toLowerCase()) || '';
    // let itemSupplierPartNo =
    //   (item.supplierPartNo && item.supplierPartNo.toLowerCase()) || '';
    // let itemOrderPartNo =
    //   (item.orderPartNo && item.orderPartNo.toLowerCase()) || '';
    let itemLoanToolNoSpacesStripped =
      itemLoanToolNo && itemLoanToolNo.replace(/\s+/g, '');
    let itemDesc =
      (item.toolDescription && item.toolDescription.toLowerCase()) || '';
    let itemOrderedBy = (item.createdBy && item.createdBy.toLowerCase()) || '';

    if (
      (itemLoanToolNoSpacesStripped &&
        itemLoanToolNoSpacesStripped.includes(searchStringSpacesStripped)) ||
      (itemDesc && itemDesc.includes(searchStringLowerCase)) ||
      (itemOrderedBy && itemOrderedBy.includes(searchStringLowerCase))
    ) {
      console.log('ltpLoanMatche, matched', itemLoanToolNo);
      return true;
      // dealer tool}
    }
    console.log('ltpLoanMatche, no match', itemLoanToolNo);
    return false;
  };

  const dealerToolMatcher = (item) => {
    let itemToolNo = (item.toolNumber && item.toolNumber.toLowerCase()) || '';
    let itemPartNo = (item.partNumber && item.partNumber.toLowerCase()) || '';
    let itemDesc =
      (item.partDescription && item.partDescription.toLowerCase()) || '';

    let itemToolNoSpacesStripped = itemToolNo && itemToolNo.replace(/\s+/g, '');
    let itemPartNoSpacesStripped = itemPartNo && itemPartNo.replace(/\s+/g, '');
    let itemDescSpacesStripped = itemDesc && itemDesc.replace(/\s+/g, '');

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
        return true;
      } else {
        // if (logIt) console.log(searchString, 'point ce');
        if (isAseVagVasSearch === 'ase') {
          //   if (logIt) console.log(searchString, 'point ase');
          if (
            itemPartNoSpacesStripped &&
            itemPartNoSpacesStripped.includes(searchStringSpacesStripped)
          ) {
            // console.log('searchRecords, point 2', item.toolNo);
            return true;
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
            return true;
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
      return true;
    }
    return false;
  };

  const dealerWipMatcher = (item = {}) => {
    //   console.log('searchString', searchString);
    //   console.log('searchStringLowerCase', searchStringLowerCase);
    //   console.log('searchStringSpacesStripped', searchStringSpacesStripped);

    let itemWipNo = (item.wipNumber && item.wipNumber.toLowerCase()) || '';

    let itemWipNoSpacesStripped = itemWipNo && itemWipNo.replace(/\s+/g, '');

    // console.log('itemWipNo', itemWipNo);
    // console.log('itemWipNoSpacesStripped', itemWipNoSpacesStripped);

    if (itemWipNoSpacesStripped.includes(searchStringSpacesStripped)) {
      return true;
    } else {
      let trueCount = 0;
      item.tools &&
        item.tools.map((item) => {
          if (dealerToolMatcher(item) === true) {
            trueCount++;
          }
        });
      return trueCount > 0 ? true : false;
    }
  };

  const serviceMeasureMatcher = (item) => {
    let itemTitle = (item.menuText && item.menuText.toLowerCase()) || '';
    let itemDesc =
      (item.toolsAffected && item.toolsAffected.toLowerCase()) || '';

    let itemTitleSpacesStripped = itemTitle && itemTitle.replace(/\s+/g, '');
    let itemDescSpacesStripped = itemDesc && itemDesc.replace(/\s+/g, '');

    if (
      (itemTitleSpacesStripped &&
        itemTitleSpacesStripped.includes(searchStringSpacesStripped)) ||
      (itemDescSpacesStripped &&
        itemDescSpacesStripped.includes(searchStringSpacesStripped))
    ) {
      //   console.log('searchRecords, point 3', item.toolNo);
      return true;
    }
    return false;
  };

  //   console.log('searchString', searchString);
  //   console.log('searchStringLowerCase', searchStringLowerCase);
  //   console.log('searchStringSpacesStripped', searchStringSpacesStripped);

  if (itemList && itemList.length > 0) {
    itemList.map((item) => {
      //   console.log('searchRecords, in map', item);
      let isMatch = false;

      if (item.startDate && item.loanToolNo) {
        // It's an LTP loan !
        isMatch = ltpLoanMatcher(item);
        // It's a booked tool! - end
      } else if (item.menuText && item.toolsAffected) {
        // It's a service measure !
        isMatch = serviceMeasureMatcher(item);
        // It's a booked tool! - end
      } else if (item.tools_id) {
        // It's a booked tool !
        isMatch = bookedToolMatcher(item);
        // It's a booked tool! - end
      } else if (item.wipNumber) {
        // It's a wip!
        isMatch = dealerWipMatcher(item);

        // It's a wip! - end
      } else if (item.loanToolNo) {
        // loan tool
        isMatch = loanToolMatcher(item);
      } else if (item.toolNumber) {
        // dealer tool or equip

        isMatch = dealerToolMatcher(item);
      }

      if (isMatch) {
        //   console.log('*******searchRecords, point 5', isMatch, item);
        newFilteredItems.push(item);
        // if (logIt) console.log(searchString, 'match');
      }
    });
    // console.log(
    //   '££££££££££newFilteredItems done',
    //   searchString,
    //   newFilteredItems.length
    // );
    // setFilteredItems(newFilteredItems);
    return newFilteredItems;
  }
};
