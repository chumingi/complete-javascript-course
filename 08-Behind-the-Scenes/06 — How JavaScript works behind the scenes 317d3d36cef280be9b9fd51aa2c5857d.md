# 06 — How JavaScript works behind the scenes

생성일: 2026년 3월 2일 오전 10:58

## JavaScript 개요 (고급)

1. High-level — 컴퓨터 자원을 직접 다루지 않음 (추상화), 비교적 느림
2. Garbage-collection — 자바스크립트 엔진 내의 알고리즘, 컴퓨터 메모리에서 사용되지 않는 객체를 자동 제거
3. Interpreted or just -in-time compiled — 인간이 작성한 코드를 자바스크립트 엔진이 기계어로 변환
4. Multi-paradigm — procedural, object-oriented, functional programming 패러다임 모두 지원
5. Prototype-based object-oriented — 모든 요소는 ‘객체’, 이미 만들어진 탬플릿을 가져와 사용
6. First-class functions — 함수를 일반 변수 취급함 (functional programming)
7. Dynamic — 변수의 데이터 타입을 지정하지 않음 (JavaScript 엔진이 코드를 실행할 때 정해짐)
8. Single-threaded — 한 번에 하나의 작업(연산)만 실행, 동시에 발생하는 작업 처리 필요
9. Non-blocking event loop — 장기 실행 작업을 가져가 백그라운드에서 실행 후 완료되면 메인 스레드에 넣음

### JavaScript Engine

- JavaScript 코드 실행기, 브라우저마다 각각의 엔진
- call stack — 코드가 실행되고 있는 위치 (execution context)
- heap — 구조화되지 않은 메모리 풀, 애플리케이션에서 필요한 모든 객체 보관
- 코드를 읽어 구조화된 트리인 **AST**(Abstract Syntaxt Tree)에 저장 ⇒ 전체 코드를 한 번에 기계어로 컴파일 (속도 고려) ⇒ 바로 한 줄씩 실행

### JavaScript Runtime

- JavaScript를 사용하는 데 필요한 모든 것을 담고 있는 컨테이너 (브라우저 runtime은 web API 포함)
- callback queue — 실행할 모든 callback 함수들을 담고 있는 데이터 구조

## Execution Context and Call Stack

### execution context

- JavaScript 코드 조각들이실행되는 환경, 코드가  실행되기 위해필요한 모든 정보를 담고 있음
- **global execution context —** 컴파일 완료 후 생성된 최상위 context (어느 함수에도 포함되지 않음), 크기와 상관없이 JavaScript 프로젝트별로 하나씩 존재 (default context)
- top level code 실행 — 컴퓨터 CPU가 전달받은 기계어 코드를 처리
- 함수 실행—  모든 함수 호출에 대해, 해당 함수를 정확히 실행하는데 필요한 모든 정보가 포함된 새로운 execution context 생성
- 엔진은 실행한 함수로부터 ``**callback function**이 도착하기를 기다림

### execution ccontext 내부

1. Variable environment — 모든 변수와 함수 선언이 저장, argument 객체
2. Scope chain — 현재 함수 외부에 있는 변수에 대한 참조로구성 
3. this 키워드 — 
- arrow function의 execution context는 arguments 객체와 this 키워드를 가지지 않음

### call stack

- execution context들이 쌓여 있는 공간, 현재 실행 중인 execution context가 가장 위에 위치함
- 실행이 완료되면 call stack에서 제거, 이전 execution context로 되돌아감

### 코드로 보는 예제

- 코드 예제
    
    ```html
    const name = "Mingi"
    
    const first = () => {
    	let a = 1;
    	const b = second(7, 9);
    	a = a + b;
    	return a;
    }
    
    function second(x, y) {
    	var c = 2;
    	return c;
    }
    
    const x = first();
    ```
    
- 코드 컴파일 후 실행, global execution context 생성, call stack에 쌓임
- top level code 실행 — 변수 name, 함수 first와 second, 변수 x 선언
- 변수 x가 선언되며 함수 first() 호출 ⇒ 함수 내부 코드를 담은 execution context 생성, call stack에 쌓임
- 현재 context의 variable environments에 변수 a와 b 선언
- 변수 b가 선언되며 함수 second() 호출 ⇒ 함수 내부 코드를 담은 execution context 생성, call stack에 쌓임 (함수 first() 실행 중단)
- second() 함수 실행 중 return 키워드를 만나 c 값 반환 ⇒ call stack에서 context 제거
- 반환값이 b에 저장되고 a 값 연산 ⇒ return 키워드를 만나 a 값 반환 ⇒ call stack에서 context 제거
- 반환값이 global context 내의 변수 x에 할당되고, 실행 종료

## Scope and The Scope

### Scoping (범위 지정)

- 자바스크립트 엔진이 프로그램 내의 변수를 구성하고액세스하는 방식을 제어
- 변수가 어디에 위치하는지, 특정 변수에 접근할 수 잇는 곳과 아닌 곳
- lexical scoping (정적 스코프) — 프로그램 코드에서함수와 블록의 배치에의해전적으로 제어
- scope — 특정 변수가 선언된 공간이나 환경, global/function/block scope
- 변수의 scope — 특정 변수에엑세스할수 있는 코드의 전체 영역

### 3가지 scope

- global scope — top lovel code, 모든 함수나 블록 밖에 선언. 프로그램 어디서나 접근 가능
    
    ```jsx
    const name = "Mingi";
    const country = "Korea";
    const birthYear = 2004;
    ```
    
- function scope — 함수 내에서 선언된 변수는 함수 내에서만 접근 가능 (local scope)
    
    ```jsx
    function calcAGe(birthYear) {
    	const now = 2026;
    	const age = now - birthYear;
    	return age;
    }
    console.log(age);  // ReferenceError
    ```
    
- block scope — if, for 등의 중괄호 내부. 블록 내에서 선언된 변수는 블록 내에서만 접근 가능
    
    ```jsx
    if (year >= 1981 && year <= 1996) {
    	const millenial = true;
    	const food = "Avocado toast";
    }
    console.log(millenial);
    ```
    
- let과 const는 block socpe, var은 function scope (var로 선언된 변수는 블록 밖에서도 접근 가능)
- 통합 코드 예제
    
    ```jsx
    const myName = "Mingi";
    
    function first() {
    	const age = 30;
    	
    	if (age >= 30) {
    		const decade = 3;
    		var millenial = true;
    	}
    	
    	function second() {
    		const job = "Senior in university";
    		console.log(`${myName} is a ${age} old ${job}`);
    	}
    	second();
    }
    first();
    ```