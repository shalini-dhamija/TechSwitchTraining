function FizzBuzz(){
    for (let i=0; i<=20; i++){
        let printnumber = i;
        if(i%3==0 && i%5==0)
            printnumber = 'FIZZBIZZ';
        else if(i%3==0)
            printnumber = 'FIZZ';
        else if(i%5==0)
            printnumber = 'BUZZ';
        console.log (printnumber);
    }
}

FizzBuzz();
