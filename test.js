let arrdict = [];
arrdict.push({a:4,b:'test4'});
arrdict.push({a:2,b:'test2'});
arrdict.push({a:1,b:'test1'});
arrdict.push({a:3,b:'test3'});

console.log(arrdict);
arrdict.sort(function(x, y){
    return x.a - y.a});

    console.log(arrdict);
let arrdictnew = sortObj(arrdict);
console.log(arrdictnew);

function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }