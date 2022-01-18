
function areValidStrings(parameters) {
    for(const item of parameters) {
        if(!item.value || typeof item.value !== item.expectedType) {
            return false;
        }
    }
    return true;
}

function solution(name, surname, age) {
    const parameters = [
        { value: name, expectedType: 'string' },
        { value: surname, expectedType: 'string' },
        { value: age, expectedType: 'number' }
    ];
    const areValidParameters = areValidStrings(parameters);

    if(!areValidParameters) {
        throw new Error('Missing or invalid parameter!');
    }

    const firstPart = name.charAt(0).toUpperCase() + name.charAt(1).toLowerCase();
    const secondPart = surname.charAt(0).toUpperCase() + surname.charAt(1).toLowerCase();
    const lastPart   = age; 
    
    return firstPart + secondPart + lastPart;
}

console.log(solution('jeff', 'pal', '34'));
