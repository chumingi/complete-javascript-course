// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log(' --- CODING CHALLENGE #1 BY MYSELF FIRST --- ');

/* 아이디어
  - dogsJulia와 dogsKate를 파라미터로 받는 함수 checkDogs()를 선언한다.
  - dogsJulia 배열의 첫번째와 마지막 요소를 제외한 새로운 배열을 생성한다. (slice(1, -1))
  - forEach()를 이용하여 배열의 각 요소의 값과 인덱스를 읽는다.
  - 각 값이 3 이상인지 미만인지 확인하고 결과에 따라 다른 출력 형식에 따라 콘솔에 출력한다.
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaNew = dogsJulia.slice(1, -1);
  const dogsTotal = [...dogsJuliaNew, ...dogsKate];

  dogsTotal.forEach(function (age, idx) {
    if (age >= 3) {
      console.log(`Dog number ${idx + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${idx + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
