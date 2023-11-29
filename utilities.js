export function generateRandomNumber(min, max, flag) {
    let randomNumber = Math.random() * (max - min) + min;
    if(flag === undefined) {
        if(Math.floor(Math.random() * 2) === 1)
        randomNumber *= -1;
    }else{
        randomNumber*=flag;
    }
    
    return randomNumber;
}
