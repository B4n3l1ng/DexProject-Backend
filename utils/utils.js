function capitalizeName(string) {
  if (string.includes('-')) {
    const array = string.split('-');
    let newString = '';
    array.forEach((element, index) => {
      if (index === 0) {
        newString += element.charAt(0).toUpperCase() + element.slice(1);
      } else {
        newString += ' ' + element.charAt(0).toUpperCase() + element.slice(1);
      }
    });
    return newString;
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

module.exports = { capitalizeName };
