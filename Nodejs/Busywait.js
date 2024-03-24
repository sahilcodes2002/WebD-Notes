function busyWait(sec) {
  let milli = sec * 1000;

  let curr = Date.now();
  while (Date.now() - curr < milli) {}
}

busyWait(3);

console.log("after busywait");
