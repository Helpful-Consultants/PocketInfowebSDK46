export default amendLink = (rawLink = '', appCode = '', intId = '') => {
  //   console.log('rawLink', rawLink);
  let newLink = '';

  if (rawLink.indexOf('controller=desktopBulletins&action=list') > 0) {
    newLink =
      '?appCode=' +
      appCode +
      '&controller=api&action=showToUser&userId=' +
      intId +
      '&shadowController=desktopBulletins&shadowAction=list';

    return newLink;
  } else if (rawLink.indexOf('controller=') && rawLink.indexOf('action=') > 0) {
    let newLink = rawLink;

    newLink = newLink
      .replace('?controller=stories', 'controller=api')
      .replace('&id=', '&shadowController=stories&shadowAction=view&shadowId=')
      .replace('&action=view', '&action=showToUser');

    newLink = '?appCode=' + appCode + '&userId=' + intId + '&' + newLink;

    return newLink;
  } else {
    return rawLink;
  }
};
