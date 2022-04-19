const common = require('./common');

const m = "Владимир".length;

const a = 3 + 0.1 * m;
const b = 0.4 + 0.03 * m;

const eps = 0.0001;

const func = (x) => Math.pow(x, 5) - a * x + b;
const funcD1 = (x) => 5 * Math.pow(x, 4) - a;
const funcD2 = (x) => 20 * Math.pow(x, 3);

let x0 = 0;
for (let i = -10; i <= 10; i += 0.5) {
    const newton = func(i) * funcD2(i);
    if (newton > 0) {
        x0 = newton;
        break;
    }
}


const x1 = common.newtonFunction(x0, func, funcD1);

let prevValue = x0;
let currentValue = x1;

console.log("Задача А");

while (Math.abs(currentValue - prevValue) > eps) {
    prevValue = currentValue;
    currentValue = common.newtonFunction(prevValue, func, funcD1);
    // console.log(currentValue);
}

console.log("X = " + currentValue);


const eps1 = 0.01;

const f = (x, y) => a * Math.pow(x, 3) - Math.pow(y, 2) - 1;
const fDX = (x, y) => 3 * a * Math.pow(x, 2);
const fDY = (x, y) => -2 * y;
const g = (x, y) => x * Math.pow(y, 3) - y - 4;
const gDX = (x, y) => Math.pow(y, 3);
const gDY = (x, y) => 3 * x * Math.pow(y, 2) - 1;

const devX = (x, y) => f(x, y) * gDY(x, y) - g(x, y) * fDY(x, y);
const devY = (x, y) => fDX(x, y) * g(x, y) - gDX(x, y) * f(x, y);
const dev = (x, y) => fDX(x, y) * gDY(x, y) - gDX(x, y) * fDY(x, y);

const xx0 = 1;
const yy0 = 2;

const xx1 = xx0 - (devX(xx0, yy0) / dev(xx0, yy0));
const yy1 = yy0 - (devY(xx0, yy0) / dev(xx0, yy0));


let xPrev = xx0;
let xCurrent = xx1;
let yPrev = yy0;
let yCurrent = yy1;

// console.log(Math.abs(xPrev - xCurrent));

while (Math.abs(xPrev - xCurrent) > eps1) {
    xPrev = xCurrent;
    xCurrent = xPrev - (devX(xPrev, yPrev) / dev(xPrev, yPrev));
    yPrev = yCurrent;
    yCurrent = yPrev - (devY(xPrev, yPrev) / dev(xPrev, yPrev));
}

console.log("Задача Б");
console.log("X = " + xCurrent);
console.log("Y = " + yCurrent);