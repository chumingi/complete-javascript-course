# Section 10 — 클로저는 어디에나 있었다

JavaScript 함수를 깊이 공부하면서 예상치 못한 발견이 있었다. 클로저를 본격적으로 배우기 전에, 함수를 반환하는 함수 패턴에서 이미 쓰고 있었고, `bind()` 내부 동작에도 있었고, IIFE와 이벤트 리스너를 함께 쓰는 코드에서도 동작하고 있었다. 각 개념이 독립적으로 보였지만, 하나의 메커니즘의 다른 얼굴이었다.

*학습 과정에서 직접 작성한 노트를 바탕으로, AI와의 대화를 통해 구조화한 문서입니다.*

## 핵심 개념

### 클로저 — 섹션 전체를 관통한 진짜 주제

클로저는 별도 주제로 소개되지만, 실제로는 훨씬 이전부터 등장하고 있었다.

함수를 반환하는 함수 패턴에서, `greet('Hey')`를 호출한 뒤 함수가 종료됐는데, 반환된 내부 함수는 여전히 `greeting` 값을 알고 있었다. 내부 함수가 자신이 **태어난 자리**인 `greet`의 스코프를 기억하고 있기 때문이다.

이 원리는 `bind()`에도 그대로 적용된다. `bind()`가 반환한 함수는 `thisArg`를 어떻게 기억하는가 — 클로저다. `bind() = call() + 클로저`라는 구조가 보이는 순간, 독립적으로 보이던 개념들이 하나의 그림으로 묶인다.

Challenge #2는 이 구조의 마지막 퍼즐이다. IIFE가 종료된 후에도 이벤트 콜백이 IIFE 내부 변수에 접근할 수 있었다 — 역시 클로저다.

클로저는 "기능"이 아니라 JavaScript가 스코프를 다루는 방식 자체다. 함수가 정의된 시점의 스코프를 끝까지 기억한다는 이 단순한 원리 하나가, 여러 개념의 밑바닥에 깔려 있었다.

### this와 제어권 — call vs bind의 설계 원리

`call()`과 `bind()`의 차이를 "즉시 실행 vs 나중에 실행"으로 외우면 며칠 후 헷갈린다. 이 둘의 실질적인 차이는 **호출 시점의 제어권이 누구에게 있는가**다.

```js
// book: 항공사 예약 메서드. 객체에서 꺼내는 순간 this가 끊긴다.
book.call(eurowings, 23, 'Sarah');  // eurowings를 this로 지정해 지금 바로 호출
book.bind(eurowings);               // eurowings를 this로 고정한 새 함수 반환 — 호출은 나중에
```

`addEventListener`에 콜백을 넘기는 순간, 호출 시점의 제어권은 브라우저에게 넘어간다. 그 자리에 `call()`을 쓰면 함수가 즉시 실행돼버린다. 제어권을 넘겨야 하는 상황에서 this를 유지하려면, `bind()`로 미리 고정하거나 화살표 함수로 외부 `this`를 캡처하면 된다.

```js
class Timer {
  tick() { this.seconds++; }
  start() {
    // this.tick을 그냥 넘기면 객체에서 분리되어 this가 끊긴다
    setInterval(this.tick.bind(this), 1000); // bind() — this를 Timer 인스턴스로 고정
    setInterval(() => this.tick(), 1000);    // 화살표 함수 — 정의 시점의 this를 캡처
  }
}
```

메서드를 직접 넘기는 순간 객체에서 분리되어 this가 끊긴다. 호출 시점이 내 손을 떠났는데, 그 시점의 this를 미리 고정하지 않았기 때문이다.

### HOF와 콜백의 암묵적 계약

HOF와 콜백 사이에는 명시되지 않은 계약이 있다.

```js
// transformer: 문자열과 변환 함수를 받아 변환 결과를 반환하는 HOF
const transformer = function (str, fn) {
  return fn(str);
};
```

`transformer`는 `fn`이 "문자열을 받아 문자열을 반환한다"고 믿는다. 콜백이 그 약속을 어기면 오류도 없이 `undefined`가 출력된다. JavaScript는 모른다.

이 구조가 Challenge #1에서도 반복됐다. 챌린지의 메서드는 `this`가 특정 속성을 가지고 있다고 암묵적으로 가정한다. 그 속성이 없는 객체를 넘기면 조용히 `undefined`가 된다. ReferenceError가 아니다.

두 경우 모두 계약이 깨져도 언어 차원에서는 알 수 없다. TypeScript의 함수 시그니처는 이 암묵적 계약을 명시적으로 강제한다.

```ts
// HOF-콜백 계약을 타입으로 명시한다
const transformer = function (str: string, fn: (s: string) => string): string {
  return fn(str); // fn이 이 시그니처를 어기면 컴파일 에러
};
```

이전에 React + TypeScript 프로젝트에서 `(e: React.ChangeEvent<HTMLInputElement>) => void` 같은 타입 표기를 IDE 자동완성으로 그냥 붙여넣었는데, JavaScript 함수를 깊이 공부하고 나서야 그게 "이벤트 핸들러는 이런 인자를 받고 아무것도 반환하지 않는다"는 HOF-콜백 계약을 명시한 것이었다는 걸 알게 됐다.

---

## 챌린지 접근 방식

### Challenge #1 — Poll App

핵심 구현은 어렵지 않았다. `registerNewAnswer()`에서 prompt로 입력받고, 범위 검사 후 `this.answers[input]++`하는 구조. `bind(poll)`로 이벤트 핸들러의 this를 고정하는 것도 자연스럽게 적용했다.

막힌 부분은 추가 조건이 붙은 문제였다. 테스트 데이터 배열 두 개를 `displayResults`로 출력해야 했는데, poll 객체를 직접 수정하지 않는 것이 조건이었다.

처음 시도:
```js
let answers = [5, 2, 3];
poll.displayResults.call(window);
```

`window`를 this로 지정하면 전역에 선언한 `answers`에 접근할 수 있을 거라 생각했다. 결과는 `undefined`였다.

원인 파악 과정:
- `"use strict"` 때문이라고 먼저 생각했다 — 절반만 맞다
- 근본 원인은 `let`으로 선언한 변수는 `window`의 속성이 아니라는 것이었다
- 전역 환경에는 두 개의 저장 공간이 있다: `window` 객체 자체 (var, function 선언이 들어감)와 별도의 선언적 레코드 (let, const가 들어감)
- `var`로 바꾸면 동작하지만, 전역 오염 문제가 생긴다

최종 해결:
```js
const testData1Display = poll.displayResults.bind({ answers: [5, 2, 3] });
const testData2Display = poll.displayResults.bind({ answers: [1, 5, 3, 9, 6, 1] });

testData1Display();          // [5, 2, 3]
testData1Display('string');  // "Poll results are 5, 2, 3"
```

`window`를 건드리지 않고, `answers` 속성을 가진 임시 객체를 그 자리에서 만들어서 `this`로 넘겼다. 이게 가능했던 이유는 `displayResults`가 `poll.answers`가 아닌 `this.answers`에만 의존하도록 설계됐기 때문이다 — 메서드를 유연하게 설계한 덕분에 다른 데이터로도 재사용할 수 있었다.

### Challenge #2 — IIFE + Closure

코드 구현 자체는 간단했다.

```js
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
```

진짜 챌린지는 "왜 동작하는지 설명하라"는 부분이었다.

IIFE 실행 → `header`가 IIFE 스코프에 저장 → IIFE 종료, EC(Execution Context)는 call stack에서 제거 → 클릭 이벤트 발생 → 콜백이 자신이 태어난 IIFE의 VE(Variable Environment)를 클로저로 기억하고 있어서 `header`에 접근한다.

EC가 call stack에서 사라져도 variable environment는 메모리 힙에 남아있고, 클로저가 그 참조를 유지한다.

---

## 처음엔 틀렸다

### greeting이 내부 함수로 "전달"된다고 생각했다

`greet('Hey')`가 내부 함수를 반환할 때, `greeting` 값을 내부 함수에 파라미터처럼 넘겨준다고 생각했다.

```js
const greet = function (greeting) {
  return function (name) {    // 이 함수의 파라미터는 name 하나뿐
    console.log(`${greeting} ${name}`);
  };
};
```

내부 함수의 파라미터는 `name` 하나뿐이다. `greeting`을 알 수 있는 이유는 전달받아서가 아니라, 내부 함수가 자신이 태어난 `greet`의 스코프를 클로저로 기억하고 있기 때문이다. 클로저를 "값의 전달"로 이해했던 오류였다.

### var 루프에서 0이 출력될 거라 예상했다

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 예상: 0, 1, 2
// 실제: 3, 3, 3
```

`i`의 초깃값이 0이니까 첫 번째 콜백은 0을 기억할 거라고 생각했다. 클로저가 변수의 **값**을 복사해서 기억한다고 암묵적으로 전제하고 있었다.

실제로 클로저는 변수 **자체(참조)를** 기억한다. 콜백이 **실행되는 시점**은 루프가 끝난 후이고, 그 시점의 `i`는 이미 3이다. 세 콜백 모두 같은 `i`를 바라보고 있어서 전부 3이 나온다.

`let`으로 바꾸면 `0, 1, 2`가 나오는 이유: `let`은 블록 스코프라서 반복마다 새 `{}`에 묶이고, 각 콜백이 서로 다른 `i`를 클로저로 기억한다.

값을 기억한다고 생각했던 클로저가 실제로는 참조를 기억한다는 것 — 이게 `var` 루프 버그의 근본 원인이고, `let`이 만들어진 이유 중 하나다.

### 스코프 체인을 호출 위치로 착각했다

Challenge #2에서 IIFE가 종료된 후 클릭 이벤트 콜백이 `header`에 접근할 수 있는 이유를 이렇게 설명했다.

> "콜백이 실행될 때, `addEventListener` EC의 VE에서 `header`를 찾는다."

틀렸다. `addEventListener`는 콜백을 **등록**한 것이지, 콜백이 **태어난 곳**이 아니다. 클로저는 어디서 **호출됐는가**가 아니라 어디서 **정의됐는가**로 결정된다. 콜백은 IIFE 안에서 태어났기 때문에, IIFE의 VE를 기억한다.

스코프는 코드가 작성된 위치에서 정적으로 결정된다. 실행 흐름이 아니다.

### HOF의 "higher"가 실행 우선순위를 뜻한다고 생각했다

`higher-order function`의 `higher`를 "실행 순서상 먼저 실행되는 함수"로 이해했다. 콜백보다 먼저 실행되니까 "higher"라는 식으로.

실제 의미는 추상화 단계가 한 층 위에 있다는 것이다. 데이터를 다루는 함수보다, **함수 자체를 다루는 함수**가 더 높은 추상화 단계에 있다는 의미에서 "higher."

이 차이를 이해하고 나서 `map`, `filter`, `addEventListener`, `setTimeout`이 모두 같은 개념의 이름을 가진 이유가 납득됐다.

---

## 더 파고든 것

> 💬 **AI 대화 인사이트**
>
> **처음에 흐릿했던 부분:** `bind()`가 내부적으로 어떻게 동작하는지. call/apply/bind를 그냥 외워서 써왔다.
>
> **대화를 통해 깨달은 것:** `bind()`를 직접 구현해보면서 구조가 보였다.

```js
const myBind = function (fn, thisArg) {
  return function (...args) {
    return fn.call(thisArg, ...args);
  };
};
```

`bind()`가 반환한 함수는 자신이 태어난 자리(`myBind` 내부)를 기억하기 때문에, `myBind`가 끝난 후에도 `fn`과 `thisArg`에 접근할 수 있다. 이것이 클로저다.

**bind() = call() + 클로저.** `call()`이 더 원시적인 연산이고, `bind()`는 그 위에 만들어진 것이다. 두 개념이 독립적인 주제처럼 소개됐지만, 실제로는 층위가 다른 관계였다.

> 💬 **AI 대화 인사이트**
>
> **처음에 흐릿했던 부분:** "callback"이라는 이름이 왜 그 이름인지 생각해본 적 없었다.
>
> **대화를 통해 깨달은 것:** callback = 호출 시점의 제어권을 상대방에게 넘기는 것.

내가 함수를 정의하지만, 내가 호출하지 않는다. `transformer`가 즉시 호출할 수도 있고, `setTimeout`이 1초 뒤에 호출할 수도 있고, 브라우저가 클릭할 때 호출할 수도 있다. 이 모든 경우에 구조는 동일하다 — 호출 시점의 제어권이 나에게 없다.

비동기 JavaScript에서 콜백이 사용되는 이유가 이 구조에서 출발한다. 나중에 배울 Promise나 async/await도 같은 문제(제어권)를 다르게 해결하는 방식일 것이라는 예측이 생겼다.

---

## 실무 연결

**함수를 반환하는 함수 — React form 이벤트 핸들러 중복 제거**

```jsx
// Before — 비슷한 핸들러가 필드마다 반복된다
const handleNameChange = (e) => setForm(prev => ({ ...prev, name: e.target.value }));
const handleEmailChange = (e) => setForm(prev => ({ ...prev, email: e.target.value }));

// After — 함수를 반환하는 함수 패턴
const handleChange = (field) => (e) =>
  setForm(prev => ({ ...prev, [field]: e.target.value }));

<input onChange={handleChange('name')} />
<input onChange={handleChange('email')} />
```

외부 함수 `handleChange`는 설정(어떤 필드를 업데이트할지)을, 내부 함수는 실행(이벤트 발생 시 처리)을 담당한다. `handleChange('name')`을 호출하는 시점에 이벤트 핸들러가 만들어지고, 브라우저가 클릭을 감지하면 내부 함수가 실행된다.

**클로저 캡슐화 — React `useState`의 원리**

```js
const makeCounter = function () {
  let count = 0;
  return {
    increment() { count++; },
    getCount() { return count; }
  };
};

const counter = makeCounter();
counter.count; // undefined — 직접 접근 불가
```

`count`는 `makeCounter`의 스코프에 갇혀 있고, 반환된 메서드를 통해서만 접근할 수 있다. React `useState`도 같은 구조다 — `count`에 직접 할당할 수 없고, 반드시 `setCount()`를 통해야 한다. 클래스 없이도 private 변수를 구현하는 패턴이고, React의 상태 관리 원칙이 이 구조 위에 있다.

**Default Parameters — 필수값 보호**

```js
const required = (name) => { throw new Error(`${name} is required`); };

function createUser({
  id   = required('id'),
  name = required('name'),
  role = 'viewer',
} = {}) {
  return { id, name, role };
}

createUser({ name: 'Mingi' }); // Error: id is required — 즉시 명확하게 터진다
```

반드시 있어야 하는 값에 기본값을 설정하면, 누락됐을 때 에러 대신 의도치 않은 값이 조용히 들어간다. 기본값 자리에 함수 호출을 넣어 즉시 에러를 던지는 패턴이 이 문제를 해결한다.
