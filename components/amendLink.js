export default amendLink = (rawLink = '', appCode = '', intId = '') => {
  //   const rawLinkLowerCase = rawLink.toLowerCase();
  //   console.log('amendLink rawLink is', rawLink);
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

    // console.log('amendLink so far', newLink);

    newLink = newLink
      .replace('controller=Stories', 'controller=stories')
      .replace('action=View', 'action=view')
      .replace('&Id=', '&id=')
      .replace('?controller=stories', 'controller=api')
      .replace('&id=', '&shadowController=stories&shadowAction=view&shadowId=')
      .replace('&action=view', '&action=showToUser');

    newLink = '?appCode=' + appCode + '&userId=' + intId + '&' + newLink;

    // console.log('amendLink returning newLink', newLink);

    return newLink;
  } else {
    // console.log('amendLink returning rawLink', rawLink);
    return rawLink;
  }
};
