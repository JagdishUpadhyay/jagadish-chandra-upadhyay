
 /**
  * 
  * @param {Array} originalArray - original array in which filter is required.
  * @param {string} filterProp - object property based on filter will be performed.
  * @return {Array} filtered array.
  */
 export const filterDuplicates = (originalArray, filterProp) => {
    return originalArray.filter((element, index, items) => {
      return items.map(mapObj => mapObj[filterProp]).indexOf(element[filterProp]) === index;
    });
  }

  /**
   * method to set document title.
   * @param {string} title - title to display
   */
  export const setDocumentTitle = (title) => {
    document.title = title;
  }