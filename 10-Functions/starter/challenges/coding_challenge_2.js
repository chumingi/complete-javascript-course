// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
})();
*/

console.log(' --- CODING CHALLENGE #2 BY MYSELF FIRST --- ');

/* 아이디어
  - 제공된 IIFE 내에서 body 요소를 클릭할 때마다 h1 요소의 색상을 파란색으로 변경하는 이벤트 리스너를 추가한다.
  - 문제에서 h1 요소를 다시 선택하지 말라고 했으므로, 이미 선언된 header 변수를 이용하는 코드를 동일 IIFE 내에 작성한다.
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();

/* 내 언어로 설명
  - IIFE가 실행되면서 call stack에 IIFE에 대한 EC가 생기고, variable environment에 header 변수가 저장된다.
  - IIFE 내에서 body에 클릭 이벤트 리스너를 추가하는 동작이 실행된다. body 요소에 콜백 함수가 등록된다.
  - IIFE의 실행이 종료되고 EC는 call stack에서 제거되지만, variable environment는 메모리 힙에 여전히 존재한다.
  - body 요소에 크릭 이벤트가 감지되면 글자 색을 바꾸는 작업이 실행된다.
    - 이벤트 발생 시점에는 콜백 함수가 header 변수를 가지고 있지 않다.
    - 콜백 함수가 선언된 위치(IIFE 내의 addEventListener EC)의 variable environment에서 header 변수를 찾는다.
*/
