function isPalindrome(s) {
    s = s.match(/[0-9a-z]/ig);
    s = s ? s.join('') : s;

    let j = s.length - 1;
    for(let i=0; i < j/2; i++) {
        if(s[i].toLowerCase() !== s[j - i].toLowerCase()) {
            return false;
        }
    }
    return true;
}

function isAlphaNumeric(c) {
    return /[0-9a-z]/i.test(c);
}

function isPalindrome_BestSolution(s) {
    for(let i = 0, j = s.length - 1; i < j; i++, j--) {
        while(i < j && !isAlphaNumeric(s[i])) {
            i++;
        }
        while(i < j && !isAlphaNumeric(s[j])) {
            j--;
        }
        if(s[i].toLowerCase() !== s[j].toLowerCase()) {
            return false;
        }
    }
    return true;
}

const testCases = [
    'certificate hero',
    'racecar',
    'taco cat',
    'no lemon, no melon',
    'jake'
]

testCases.forEach(element => {
    console.log(isPalindrome_BestSolution(element));
});