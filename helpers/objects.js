const compareObjectValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const comparison = a[key].localeCompare(b[key]);

    return order === 'desc' ? comparison * -1 : comparison;
  };
};

export const sortObjectList = (objArr, key, order = 'asc') => {
  console.log('in sortObjectList helper', objArr.length, key, order);
  return objArr.sort(compareObjectValues(key, order));
};
