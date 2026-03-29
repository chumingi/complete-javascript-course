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
