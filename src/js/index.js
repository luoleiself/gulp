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

class Animal {
  static length = 0;
  constructor() {}
  say() {
    console.log('Hi, dog');
  }
}

let set = new Set();

let map = new Map();

let arr = Array.of(1, 2, 3, 4, 5);
