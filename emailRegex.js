const fs = require('fs');
let fileName = 'test.txt';
let dataString = '';
let softwireCountLoop = 0;
let softwireCountRegEx= 0;

dataString = fs.readFileSync(fileName, 'utf8');
softwireCountLoop = findSoftwireEmailLoop(dataString);
softwireCountRegEx = findSoftwireEmailRegEx(dataString);
console.log(softwireCountRegEx)
findAllEmailIds(dataString);

//Part 1: Find @softwire.com using for loop and substring
function findSoftwireEmailLoop(dataString){
  let counter = 0;
  for(var i = 0; i < dataString.length; i++) {
    if (dataString.substring(i, i+14) === '@softwire.com ') { counter = counter + 1; }
  }
  return counter;
}

//Part 2: Find @softwire.com using regex
function findSoftwireEmailRegEx(dataString){
  let strRegEx = /@softwire.com /g; 
  let arrMatch = [];
  arrMatch = dataString.match(strRegEx);  
  console.log(arrMatch)
  return arrMatch.length;
}

/*Part 3: Find all email ids and store in dictionary
<local>@<domain>
1) The 'local' part consists of letters, numbers and a few special characters - e.g. joe.bloggs or anna_bell
2) The 'domain' part consists of two or more sub-domains, consisting of letters, numbers and dashes, 
separated by dots. e.g. softwire.com
3) To simplify life, we'll only allow the following special characters: .'_%+-
*/
function findAllEmailIds(dataString){
  let strRegExEmail = /([a-zA-Z0-9_%+\.\-])*@(([a-zA-Z0-9\-])*\.){1,}([a-zA-Z0-9\-])*/g;
  let strRegExDomain = /@(([a-zA-Z0-9\-])*\.){1,}([a-zA-Z0-9\-])*/g;
  let arrEmail = [];
  let arrDomain = [];
  let arrUniqueDomain = [];
  let dictEmail = [];

  arrEmail = dataString.match(strRegExEmail);
  arrDomain = dataString.match(strRegExDomain);
  arrUniqueDomain = arrDomain.filter(onlyUnique);

  for(let i=0;i<arrUniqueDomain.length; i++){
    let count = 0;
    for(let j=0;j<arrEmail.length; j++){   
      if(arrEmail[j].substring(arrEmail[j].indexOf('@'))=== arrUniqueDomain[i]) { count+=1;
      if(arrUniqueDomain[i] === '@softwire.com') 
        console.log(arrEmail[j])
      }
    }
    dictEmail.push({key:arrUniqueDomain[i],value:count});
  }
console.log(dictEmail);
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}