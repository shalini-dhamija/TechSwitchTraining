function FizzBuzz(){
    let printText = [];
    for (let i=1; i<=20; i++){
        printText = [];
        if(i%3==0)
            printText.push('Fizz');
        if(i%13==0)
            printText.push('Fezz');
        if(i%5==0)
            printText.push('Buzz');
        if(i%7==0)
            printText.push('Bang');
        if(i%11==0){
            printText = [];
            printText.push('Bong');
        }
        if(i%13==0 && i%11==0){
            printText = [];
            printText.push('FezzBong');
        }
        let printT = '';
        if(printText.length == 0)
            console.log(i);
        else if(i%17 == 0){
            printT = '';
            for(let j=printText.length-1;j<=0;j--){
                printT += printText[j];     
            }
            console.log(printT);
        }
        else 
            printT = '';
            for(let j=0;j<printText.length;j++){
                printT += printText[j];     
            }
            console.log(printT);
        }
            
    }

FizzBuzz();
