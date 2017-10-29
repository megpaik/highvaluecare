// CIS 197 - React HW

const x = 48;
const y = 36;
const cells = Array.apply(null, Array(x * y)).map(() => {
    return false;
});

export { x, y, cells }
