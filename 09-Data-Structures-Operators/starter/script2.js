'use strict';
const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);
// Sets
// ES6에서 도입된 자료구조
// 고유한 값들의 모임, 내부에 중복 값 존재 불가
// 배열과 유사한 형태, 배열과 달리 원소 간 순서 없음

console.log('--- SETs ---');
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // Set(3) { 'Pasta', 'Pizza', 'Risotto' }
const mingiSet = new Set('Mingi');
console.log(mingiSet); // Set(4) { 'M', 'i', 'n', 'g' }

// .size - Set의 크기 (배열의 .length와 혼동 주의)
console.log(ordersSet.size); // 3

// .has() - 특정 요소가 Set 내에 존재하는지 확인
console.log(ordersSet.has('Pizza')); // true

// .add() - Set에 요소 추가
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet); // Set(4) { 'Pasta', 'Pizza', 'Risotto', 'Garlic Bread' }

// Set에서 요소 삭제
ordersSet.delete('Risotto');
console.log(ordersSet); // Set(3) { 'Pasta', 'Pizza', 'Garlic Bread' }

// Set에는 인덱스가 존재하지 않음, Set에서 값 추출 불가
console.log(ordersSet[0]); // undefined

// .clear() - Set의 모든 요소 제거 (빈 Set)
mingiSet.clear();
console.log(mingiSet); // Set(0) {}

// Set 반복
for (const order of ordersSet) console.log(order);

// usecase - restaurant
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);
console.log([...staffUnique]); // [ 'Waiter', 'Chef', 'Manager' ]
// ... 연산자를 이용하여 Set 내의 요소들을 확장하여 배열로 변환
console.log(staffUnique.size); // 3, 레스토랑 내의 직책 수 확인

// ES2025에서 7개의 메소드 추가

// Set1.intersections(Set2) - 두 집합 모두에 존재하는 요소들을 Set 형태로 반환
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('Intersection:', commonFoods); // Set(2) { 'tomatoes', 'garlic' }
console.log([...commonFoods]); // 배열로 변환, [ 'tomatoes', 'garlic' ]

// Set1.union(Set2) - 두 Set에 존재하는 모든 요소를 중복 없이 Set 형태로 반환
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion); // Set(10) { 'pasta', ... , 'avocado' }
// 동일한 결과 - console.log(new Set([...italianFoods, ...mexicanFoods]));

// Set1.difference(Set2) - Set1에는 존재하지만 Set2에는 존재하지 않는 모든 요소들을 새로운 Set으로 반환
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference italian:', uniqueItalianFoods);
console.log('Difference mexican:', uniqueMexicanFoods);

// Set1.symmetricDifference(Set2) - Set1과 Set2 각각에만 존재하는 (공토되지 않은) 모든 요소들을 새로운 Set으로 반환
const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log('Symmetric difference:', uniqueItalianAndMexicanFoods);

// 3개의 나머지 메소드 - .isDisjointFrom(), isSubset(), isSuperset()
console.log('Is disjoint from:', italianFoods.isDisjointFrom(mexicanFoods)); // false

// Maps
// 값을 키에 매핑할 때 사용할 수 있는 자료구조 (ES6에서 도입)
// Object와 유사한 key-value 구조
// Object의 key는 오직 String이지만, Map은 key가 어떤 자료형이든 가질 수 있음

console.log('___ MAPs ---');

// Map 생성
const restaurantMap = new Map();

// .set(키, 값) - Map에 키-값 쌍 추가 및 업데이트된 Map 반환
restaurantMap.set('name', 'Classico Italiano');
console.log(restaurantMap.set(1, 'First')); // Map(2) { 'name' => 'Classico Italiano', 1 => 'First' }
console.log(restaurantMap.set(2, 'Second')); // Map(3) { 'name' => 'Classico Italiano', 1 => 'First', 2 => 'Second' }
restaurantMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
console.log(restaurantMap); // Map(8) {...}

// .get(키) - Map에서 키에 해당하는 값을 반환
console.log(restaurantMap.get('name')); // Classico Italiano
console.log(restaurantMap.get(true)); // We are open :D
console.log(restaurantMap.get('1')); // undefined;

// .get()을 이용하여 현재 영업 중인지 확인하는 예제
const time = 21;
console.log(
  restaurantMap.get(
    time >= restaurantMap.get('open') && time < restaurantMap.get('close'),
  ),
); // We are open :D

// .has(키) - Map이 특정 키를 포함하는지 여부를 반환
console.log(restaurantMap.has('categories')); // true

// .delete(키) - Map에서 특정 키-값 쌍을 제거
restaurantMap.delete(2);
console.log(restaurantMap); // Map(7) {...}

// .size - Map의 키-값 쌍의 수 반환
console.log(restaurantMap.size); // 7

// .clear() - Map의 모든 키-값 쌍 제거
restaurantMap.clear();
console.log(restaurantMap); // Map(0) {}

// 배열을 Map의 키로 사용하는 예제 (주의)
restaurantMap.set([1, 2], 'Test');
console.log(restaurantMap.get([1, 2])); // undefined
// javaScript 내부 동작에서, set()에서 사용한 배열과 get()에서 사용한 배열은 서로 다른 객체로 인식되기 때문
const arr = [1, 2];
restaurantMap.set(arr, 'Test');
console.log(restaurantMap.get(arr)); // 'Test'

// 객체를 Map의 키로 사용하는 예제 (주의)
restaurantMap.set(document.querySelector('h1'), 'Heading 1');
console.log(restaurantMap); // (브라우저 콘솔) Map(3) {Array(2) => 'Test', Array(2) => 'Test', h1 => 'Heading 1'}

// Maps: iterations

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
console.log(question); // Map(4) {...}

// Object를 Map으로 변환
const hours = {
  mon: {
    open: 12,
    close: 20,
  },
  tue: {
    open: 12,
    close: 20,
  },
};
const hoursMap = new Map(Object.entries(hours));
console.log(hoursMap);

// Map 반복
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer'));
const correct = answer === question.get('correct'); // true/false
console.log(question.get(correct));

// Map을 Array로 변환
const questionArr = [...question]; // Map의 키-값 쌍을 배열로 변환
console.log(questionArr);
console.log(questionArr.keys());
console.log(questionArr.values());
console.log(questionArr.entries());
