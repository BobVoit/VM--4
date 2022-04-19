

const derivative = (func, x, dx) => {
    const result = (func(x + dx) - func(x)) / dx;
    return result;
}

module.exports.newtonFunction = (x, func, funcD1) => {
    return x - (func(x)/funcD1(x));
}