export default class Array {
  static merge(source, result, key1, key2) {
    let arr1 = source !== undefined ? source : [];
    let arr2 = result !== undefined ? result : [];
    key2 = key2 === undefined ? key1 : key2;
    let merged = [];

    if (!arr1.length && !arr2.length) {
      return [];
    }
    if (!arr1.length) {
      return arr2;
    }
    if (!arr2.length) {
      return arr1;
    }

    //add all data from result to source
    for (let i = 0; i < arr2.length; i++) {
      if (
        arr1.find((itmInner) => itmInner[key1] === arr2[i][key2]) === undefined
      ) {
        arr1.push(arr2[i]);
      }
    }

    //merge arrays
    for (let i = 0; i < arr1.length; i++) {
      merged.push({
        ...arr1[i],
        ...arr2.find((itmInner) => itmInner[key2] === arr1[i][key1]),
      });
    }
    return merged;
  }

  static join(source, result, key1, key2) {
    let arr1 = source !== undefined ? source : [];
    let arr2 = result !== undefined ? result : [];
    key2 = key2 === undefined ? key1 : key2;
    let merged = [];

    if (!arr1.length && !arr2.length) {
      return [];
    }
    if (!arr1.length) {
      return arr2;
    }
    if (!arr2.length) {
      return arr1;
    }

    //merge arrays
    for (let i = 0; i < arr1.length; i++) {
      merged.push({
        ...arr1[i],
        ...arr2.find((itmInner) => itmInner[key2] === arr1[i][key1]),
      });
    }
    return merged;
  }

  static findByKey(source, key, values) {
    let arr1 = source !== undefined ? source : [];
    let merged = [];

    if (!arr1.length) {
      return [];
    }

    //merge arrays
    for (let i = 0; i < values.length; i++) {
      let item = source.find((item) => item[key] === values[i]);
      if (
        item !== undefined &&
        item !== null &&
        (item.length || Object.keys(item).length)
      ) {
        merged.push(item);
      }
    }
    return merged;
  }

  static diff(source, result, key) {
    let arr1 = source;
    let arr2 = result;
    let diff = [];

    if (!arr1.length) {
      return arr2;
    }

    for (let i = 0; i < arr2.length; i++) {
      if (
        arr1.find((itmInner) => itmInner[key] === arr2[i][key]) === undefined
      ) {
        arr1.push(arr2[i]);
      }
    }
    for (let i = 0; i < arr1.length; i++) {
      let diffValue = {};
      diffValue[key] = arr1[i][key];
      let difference = Object.keys(arr1[i]).filter((x) => {
        let yf = arr2.find((itmInner) => itmInner[key] === arr1[i][key]);
        let yv = yf !== undefined ? yf[x] : null;
        let xv = arr1[i][x];
        let ret = xv != yv ? { x: yv } : null;
        if (ret) diffValue[x] = yv;
        return ret;
      });
      if (difference.length) {
        diff.push(diffValue);
      }
    }
    return diff;
  }

  static delete(source, key) {
    //source =
  }
}
