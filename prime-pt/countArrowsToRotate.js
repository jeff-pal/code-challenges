function solution(S) {
    let arrows = {};
    const arrowsLength = S.length;
    for(let i=0; i < arrowsLength; i++) {
        const key = S[i];
        if(!arrows[key]) {
            arrows[key] = 1;
        } else {
            arrows[key] += 1;
        }
    }
    let uppermost = 0;

    for(const key in arrows) {
        const repetition = arrows[key];
        uppermost = repetition > uppermost ? repetition : uppermost;
    }
    return arrowsLength - uppermost;
}

console.log(solution('vvvvv'));

