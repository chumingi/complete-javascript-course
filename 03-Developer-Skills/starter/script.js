// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = '23';
if (x === 23) console.log(23);

const calcAge = birthYear => 2026 - birthYear;
console.log(calcAge(2004));

// Debugging
const mesureKelvin = function () {
  const messurement = {
    type: 'temp',
    unit: 'celsius',
    value: Number(prompt('Degrees celsius')),
  };

  console.log(messurement);
  console.table(messurement);

  const kelvin = messurement.value + 273;
  return kelvin;
};
console.log(mesureKelvin());

// use debugger
function calcTempAmplitudeBug(t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    debugger; // 브라우저에서 디버깅을 시작할 위치에 이 줄을 추가
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
    console.log(max, min);
  }
  return max - min;
}
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeBug);
