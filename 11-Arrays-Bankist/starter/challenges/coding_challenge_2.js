// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

console.log(' --- CODING CHALLENGE #2 BY MYSELF FIRST --- ');

/* 아이디어
  - 함수에 전달받은 ages 배열의 모든 요소에 대하여, 조건별 공식을 이용하여 인간 나이로 환산한다. (map)
  - 변환한 인간 나이 중 18 이상인 것들만 반환한 새 배열을 만든다. (filter)
  - 인간 ㄴ아ㅣ 18 이상인 요소들의 평균을 구한다. (reduce)
*/

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => {
    if (age <= 2) {
      return age * 2;
    } else {
      return 16 + age * 4;
    }
  });

  const adultHumanAges = humanAges.filter(age => age >= 18);

  const averageHumanAge =
    adultHumanAges.reduce((acc, age) => acc + age, 0) / adultHumanAges.length;
  return averageHumanAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); // Expected output: 4
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); // Expected output: 4
