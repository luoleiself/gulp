import path from 'path';
console.log(path.join('/app/', '/dist/', '/js/'));
console.log(path.resolve('/app/', 'dist/', 'js/'));

var p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(200);
  }, 3000);
}).then((res) => {
  console.log(res);
});

async function test() {
  await 200;
}

test().then((res) => {
  console.log(res);
});

function* generate() {
  yield 1;
  yield 2;
  yield 3;
}
let gen = generate();
console.log(gen.next());

let set = new Set();

let map = new Map();

let arr = Array.of(1, 2, 3, 4, 5);

let str = 'abcdefgh';
console.log(str.includes('i'));
let obj = Object.assign({}, { name: 'hello Object.assign', age: 18 });
console.log(obj);

class Animal {
  static length = 0;
  constructor() {}
  say() {
    console.log('Hi, dog');
  }
}
class Dog extends Animal {
  constructor() {
    super();
  }
  run() {
    console.log('Hi, running...');
  }
}
