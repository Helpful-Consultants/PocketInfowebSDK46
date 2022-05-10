const amendLink = (rawLink = '', appCode = '', intId = '') => {
  // const amendLink = (rawLink, appCode, intId) => {
  //   const rawLinkLowerCase = rawLink.toLowerCase();
  //   console.log('amendLink rawLink is', rawLink);
  let newLink = rawLink;

  if (rawLink.indexOf('controller=desktopBulletins&action=list') > 0) {
    newLink =
      newLink +
      '?appCode=' +
      appCode +
      '&controller=api&action=showToUser&userId=' +
      intId +
      '&shadowController=desktopBulletins&shadowAction=list';
    if (rawLink.indexOf('https://toolsinfoweb.co.uk') === -1) {
      newLink = 'https://toolsinfoweb.co.uk' + newLink;
    }
    console.log('amendLink rawLInk of ', rawLink, ' changed to ', newLink);

    return newLink;
  } else if (rawLink.indexOf('controller=') && rawLink.indexOf('action=') > 0) {
    // console.log('amendLink so far', newLink);

    newLink = newLink
      .replace('controller=Stories', 'controller=stories')
      .replace('action=View', 'action=view')
      .replace('&Id=', '&id=')
      .replace('?controller=stories', '?controller=api')
      .replace('&id=', '&shadowController=stories&shadowAction=view&shadowId=')
      .replace('&action=view', '&action=showToUser');

    newLink = newLink + '&appCode=' + appCode + '&userId=' + intId;
    if (rawLink.indexOf('https://toolsinfoweb.co.uk') === -1) {
      newLink = 'https://toolsinfoweb.co.uk' + newLink;
    }

    console.log('amendLink rawLInk of ', rawLink, 'changed to ', newLink);

    return newLink;
  } else {
    if (rawLink.indexOf('https://toolsinfoweb.co.uk') === -1) {
      newLink = 'https://toolsinfoweb.co.uk' + newLink;
    }
    newLink = newLink.replace(
      'toolsinfoweb.co.ukcontent',
      'toolsinfoweb.co.uk/content'
    );
    // console.log('amendLink returning ', rawLink, 'as', newLink);
    return newLink;
  }
};

export default amendLink;
