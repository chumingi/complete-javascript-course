# 커밋 메세지 설계 가이드 — 포트폴리오 관점

> 모든 접두사 유형의 커밋 메세지를 포트폴리오 관점에서 최적화하는 기준을 정의한다.

---

## 공통 원칙

### 1. 형식은 정보량의 결과다

싱글라인 vs 멀티라인을 먼저 결정하지 않는다.
인사이트가 subject 한 줄에 담기면 싱글라인이 더 강하다.
body는 subject에 없는 독립적인 새 정보가 있을 때만 추가한다.

### 2. Subject는 diff에서 읽을 수 없는 것을 담는다

코드를 보면 알 수 있는 내용은 커밋 메세지에 쓰지 않는다.
구현 방식(HOW)이 아닌 개념적 이해(WHY / WHAT IT MEANS)를 담는다.

### 3. 인사이트 깊이 기준

| 레이어 | 커밋에서의 표현 예시 | 포트폴리오 가치 |
|--------|---------------------|----------------|
| 문법 | `practice Object.entries/values` | 낮음 — diff에 이미 보임 |
| 의도 | `apply bind() for event listener context` | 보통 |
| 원리 | `bind() decouples method from its origin object` | 높음 |
| 경계/설계 | `reuse displayResults with arbitrary context via bind()` | 매우 높음 |

가능한 한 높은 레이어를 목표로 한다.

### 4. 정직성 원칙

실제로 하지 않은 사고 과정을 담지 않는다.

- `choose X over Y` — 실제로 두 옵션을 비교한 흔적(코드, 주석)이 있을 때만 사용
- 강의와의 비교 — 차이가 **개념적**일 때만 body에 담는다. 스타일/문법 차이는 노이즈다

---

## 접두사별 설계

### feat — 개념 실습

**포트폴리오 관점:** "이 사람은 강의를 수동적으로 따라 쳤는가, 아니면 개념을 적극적으로 이해했는가?"

**판단 기준:**

1. 이 실습에서 가장 중요한 이해/발견은 무엇인가?
2. 여러 개념이 담긴 경우, 가장 핵심적인 것이 무엇인가? → 하나를 선택한다
3. `implement X` 또는 `explore X` 수준의 메세지가 되는가? → 한 레이어 더 올린다

**형식 결정:**

- 하나의 실습에서 서로 독립적인 두 가지 원리를 발견한 경우에만 → 멀티라인

**예시:**

```
❌ feat(section10): implement this keyword examples
   → "implement examples"는 노이즈. 어떤 이해를 얻었는지 없다.

❌ feat(section10): explore higher-order functions and callbacks
   → 개념을 나열했지만 어떤 인사이트도 없다.

✅ feat(section10): confirm call site determines this binding, not definition site
✅ feat(section10): trace execution context through nested function calls
```

---

### challenge — 강의 챌린지

**포트폴리오 관점:** "이 사람은 챌린지를 완료했는가, 아니면 챌린지를 통해 강의 코드에서 보지 못했던 것을 발견했는가?"

**판단 기준:**

**Step 1 — 기존 커밋 확인**

같은 섹션의 기존 feat 커밋과 인사이트가 중복되는지 확인한다.
중복이면 챌린지 커밋은 **강의 커밋에 없는 새 정보**를 찾아야 한다.

**Step 2 — 챌린지 파일 분석**

1. **아이디어 주석**: 사전 설계 사고 과정이 있는가
2. **구현 코드**: 강의 코드와 실질적으로 다른 선택을 했는가

아이디어 주석은 이미 코드 안에 있으므로 커밋 메세지에 반복하지 않는다.

**Step 3 — 새로운 것 식별**

강의 커밋에 없고, 이 챌린지에서만 나타나는 것은 무엇인가?

- 독립적으로 설계한 검증 로직
- 강의와 다른 방법론적 선택 (단, 의식적 선택이었을 때만)
- 보너스에서 발견한 원리의 새로운 적용

**Step 4 — 깊이 레이어 판단**

식별한 인사이트가 깊이 기준표의 어느 레이어에 해당하는지 판단한다.
더 높은 레이어로 표현할 수 있으면 올린다.

**형식 결정:**

- 인사이트가 한 문장으로 담기면 → 싱글라인
- 두 개 이상의 독립적 인사이트가 있으면 → 멀티라인 (body에 두 번째 인사이트 추가)

**강의 비교를 body에 담는 기준:**

자력 풀이 vs 강의 풀이 비교를 body에 넣는 것은 아래 조건을 모두 충족할 때만 한다.

1. 차이가 개념적 수준이다 (원리/설계 의도의 차이, 스타일 차이 아님)
2. 해당 개념 차이가 기존 커밋에 없는 새 정보다
3. subject 한 줄에 담기지 않는다

세 조건 중 하나라도 빠지면 body 없이 싱글라인으로 작성한다.

**예시:**

```
❌ challenge(section10): solve poll challenge using bind()
   → "solve poll challenge"는 노이즈. 접두사에서 이미 챌린지임을 알 수 있다.

❌ challenge(section10): apply bind() to fix this keyword
   → 강의 feat 커밋에 이미 있는 인사이트와 중복이다.

✅ challenge(section10): reuse displayResults with arbitrary context via bind()
   → 강의 커밋에 없는 정보 (임의 객체를 context로 사용), 원리 레이어, 정확하다.

✅ challenge(section09): replace manual Set construction with inline spread conversion
   → 구체적 기법, diff에서 읽을 수 없는 설계 의도를 담는다.
```

---

### extra — 추가 챌린지

**포트폴리오 관점:** "이 사람은 강의가 끝난 후에도 스스로 더 깊이 파고들었는가? 어떤 각도에서?"

`extra` 접두사 자체가 "강의 범위를 넘었다"는 신호다.
따라서 메세지는 **무엇을 연습했는가**가 아닌 **어떤 각도에서 더 깊이 들어갔는지**를 보여줘야 한다.

**판단 기준:**

1. 이 추가 챌린지가 강의 챌린지와 어떻게 다른가? 더 응용된 측면이 무엇인가?
2. 실무 맥락이 반영되었는가? 어떤 맥락인가?
3. 이 챌린지를 통해 발견한 원리나 경계는 무엇인가?
4. `practice X` 수준의 메세지가 되는가? → `extra`의 가치를 담지 못한다, 한 레이어 올린다

**형식 결정:**

- 실무 맥락 + 원리 탐구를 동시에 담는 경우 멀티라인이 자연스럽다

**예시:**

```
❌ extra(section09): practice map/set iteration
   → "practice X"는 extra의 가치를 전달하지 못한다.

✅ extra(section09): discover Set deduplication order is insertion-order-stable
   → 구체적인 발견. "이 사람이 직접 실험해봤구나"가 보인다.

✅ extra(section10): model React-like event handler using closure and bind
   → 실무 맥락을 반영한 응용. 강의 챌린지와 차별화된다.
```

---

### project — 미니 프로젝트

**포트폴리오 관점:** "이 사람은 개념을 조합해서 실제로 무언가를 만들 수 있는가? 그 과정에서 어떤 설계 결정을 내렸는가?"

**판단 기준:**

1. 이 프로젝트가 증명하는 원리나 설계 결정은 무엇인가?
2. 어떤 개념이 중심이 되고, 어떤 개념이 그것을 지원하는가?
3. `build X`로 끝나는 메세지가 되는가? → 어떤 원리를 구현했는지로 올린다

**형식 결정:**

- 여러 개념의 조합이므로, 가장 핵심적인 설계 결정 하나에 집중한다
- 보조적인 설계 요소가 독립적인 인사이트를 담는 경우에만 → 멀티라인

**예시:**

```
❌ project(section10): build configurable event handler
   → 무엇을 만들었는지만 말한다. 어떤 원리를 구현했는지 없다.

✅ project(section10): show closure retains config state across calls
   → 프로젝트가 증명하는 원리를 담는다.

✅ project(section10): apply closure and bind to create reusable handler
   → 개념 조합의 구체적 결과를 담는다.
```

---

### docs — 문서 작성

**포트폴리오 관점:** "이 사람이 문서에 기록한 인사이트의 핵심은 무엇인가?"

`docs` 커밋은 어떤 파일을 작성했는지가 아니라, 그 안에 어떤 이해가 담겼는지를 보여줘야 한다.
"write README"는 파일을 열면 알 수 있으므로 커밋 메세지에 쓰지 않는다.

**판단 기준:**

1. 이 문서의 가장 중요한 인사이트는 무엇인가?
2. 오해 교정이나 "처음엔 틀렸다" 내용이 있는가? → 그것이 가장 강력한 소재다
3. 범위가 특정 섹션인가, 프로젝트 전체 문서인가? → 스코프를 결정한다

**스코프 결정:**

- 특정 섹션 README: `docs(sectionXX)`
- 프로젝트 전체 문서 (설계 파일, 가이드 등): `docs` (스코프 없음)

**형식 결정:**

- 오해 교정과 그 교정 내용이 함께 중요할 때 → 멀티라인

**예시:**

```
❌ docs(section10): write section 10 README
   → "write README"는 노이즈. 파일명 보면 안다.

❌ docs(section10): add this keyword section to README
   → 내용이 추가됐다는 것만 알 뿐, 어떤 인사이트인지 없다.

✅ docs(section10): document how call site, not definition site, governs this
   → README에 담긴 핵심 인사이트를 전달한다.

✅ docs(section10): correct initial misconception — arrow functions share outer this
   → 오해 교정이 담긴 경우, 그것이 가장 강력한 소재다.
```

---

### fix — 오류 수정

**포트폴리오 관점:** "이 사람은 버그를 고쳤는가, 아니면 버그의 근본 원인을 이해했는가?"

**판단 기준:**

1. 단순 타이포인가, 아니면 JavaScript 특성에 대한 오해에서 비롯된 버그인가?
2. 개념적 버그라면, 어떤 언어 특성이 이 버그를 만드는가?

**형식 결정:**

- 개념적 버그 (언어 특성의 오해): 근본 원인을 담는다 — 레이어를 올릴 가능성이 높다
- 타이포/구문 오류: 단순하고 정확하게 서술한다. 과도한 설명은 불필요하다

**예시:**

```
❌ fix(section10): fix this keyword bug
   → "fix bug"는 접두사와 중복이다. 무엇이 문제였는지 없다.

✅ fix(section10): correct this loss — method extracted to variable loses original binding
   → 근본 원인(어떤 특성 때문에 버그가 생겼는지)을 담는다.

✅ fix(section09): correct variable name in loop condition
   → 타이포 수정은 이 수준으로 충분하다.
```

---

### refactor — 코드 구조 개선

**포트폴리오 관점:** "이 사람은 코드를 그냥 정리했는가, 아니면 설계 원칙을 적용했는가?"

**판단 기준:**

1. 리팩토링의 동기와 적용한 설계 원칙은 무엇인가? (DRY? 재사용성? 가독성?)
2. 변화가 개념적인가, 스타일적인가? → 스타일 변화는 포트폴리오 가치가 낮다

**형식 결정:**

- 리팩토링 동기(원칙)와 결과가 한 줄로 표현되면 → 싱글라인
- 동기와 구체적인 변화 내용을 함께 담아야 할 때 → 멀티라인

**예시:**

```
❌ refactor(section09): restructure code
   → 아무 정보가 없다.

✅ refactor(section09): extract shared data to break repetition across challenge functions
   → 리팩토링의 동기(DRY)와 방법이 담겨 있다.

✅ refactor(section01): annotate script.js with section headers and expected output
   → 구체적인 변화 내용이 담겨 있다.
```

---

### chore — 설정/구조 변경

**포트폴리오 관점:** 포트폴리오 가치가 낮은 영역이다. 정확하고 간결하게 서술한다.

**판단 기준:**

1. 무엇이 변경되었는가? (파일명, 경로, 설정값)
2. 변경 이유가 자명한가? → 자명하면 이유를 메세지에 쓰지 않는다

**형식 결정:** 항상 싱글라인. body 추가 불필요.

**예시:**

```
✅ chore: add .gitignore
✅ chore: move section 08 assets to correct folder
```
