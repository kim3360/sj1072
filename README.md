# 7강 State and Lifecycle

## State와 Lifecycle의 정의

state란?
+ 리액트 Componenet의 상태관리 
+ 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함
+ state를 변경할때는 setState 사용

``` jsx
// state를 직접 수정 (잘못된 사용법)
this.state = {
    name: 'Inje'
};
```

``` jsx
// setState 함수를 통한 수정 (정상적인 사용법)
this.setState({
    name: 'Inje'
});
```

Lifecycle

<img src="./src/images/image1.png" alt="Lifecycle" width="1200px" height="500px">

+ Mounting(생성)
+ Updating(업데이트)
+ Unmounting(삭제)

Component가 계속 존재하는 것이 아니라, 시간의 흐름에 따라 생성되고 업데이트 되다가 사라진다.

# 8강 Hooks

## Hooks의 개념과 useState, useEffect

<img src="./src/images/image2.png" alt="컴포넌트 종류" width="1200px" height="500px">

useState() : state를 사용하기 위한 Hook


``` jsx
const [변수명, set함수명] = useState(초기값);
```

``` jsx
import React, {useState} from "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    retrun(
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onClick={()=> setCount(count + 1)}> 클릭 </button>
        </div>
    );
}
```

useEffiect() : Side effect를 수행하기 위한 Hook
``` jsx
useEffect(이펙트 함수, 의존성 배열); 
```

+ 이펙트가 의존하고 있는 배열 안에 있는 변수가 하나라도 값이 변경되면 이펙트 함수 실행
+ 처음 컴포넌트가 렌더링된 이후와 업데이트로 인한 재렌더링 이후 실행

``` jsx
useEffiect(이펙트 함수, []);
```

+ 이펙트 함수가 mount와 unmount시에 한 번씩만 실행

``` jsx
import React, {useState, useEffect} from "react";

function Counter(props){
    const [count, setCount] = useState(0);

    // componenetDidMount, componenetDidUppdate와 비슷하게 작동한다.
    useEeffect(()=> {
        //브라우저 API를 사용해서 document의 title을 업데이트한다.
        document.title = `You clicked ${count} times`;
    });

    return(
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onclick={() => setCount(count + 1)}>클릭</button>
        </div>
    );
}
```

``` jsx
function UserStatusWithCounter(props){
    const [count, setCount] = useState(0);
    useEeffect(() => {
        document.title = `총 ${count}번 클릭했습니다.`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEeffect(() => {
        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return() => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });

    function handleStatusChange(status){
        setIsOnline(status.isOnline);
    }
}
```
## useMemo, useCallback, useRef

useMemo란? : Memoized value를 리턴하는 Hook
+ 연산량이 많이 드는 함수의 호출 결과를 저장해 두었다가 같은 입력 값으로 함수를 호출

``` jsx 
const memoizedValue = useMemo(
    () => {
        // 연산량이 높은 작업을 수행하여 결과를 반환
        return computeExpensiveValue(의존성 변수, 의존성 변수2);
    },
    [의존성 변수1, 의존성 변수2]
);
```

useCallback란? : useMemo() Hook과 유사하지만 값이 아닌 함수를 반환

``` jsx
const memoizedCallback = useCallback(
    () => {
        doSometing(의존성 변수1, 의존성 변수2);
    },
    [의존성 변수1, 의존성 변수2]
);
```

``` jsx
import {useState, useCallback} from 'react';

function ParentComponenet(props){
    const [count, setCount] = useState(0);

    //컴포넌트가 마운트 될 때만 함수가 정의됨
    const handleClick = useCallback((event) => {
        //클릭 이벤트 처리
    }, []);

    return(
        <div>
            <button onClick={()=> {setCount(count + 1);}}>{count}</button>
            <ChildComponenet handleClick={handleClick}/>
        </div>
    );
}
```
useRef란 : Reference를 사용하기 위한 훅
+ 특정 컴포넌트에 접근할 수 있는 객체

``` jsx
const refContainer = useRef(초기값);
```

## Hook의 규칙과 Custom Hook 만들기

Hook의 규칙

+ Hook은 최상위 레벨에서마 호출
+ 반복문이나 조건문 안에서 Hook 호출은 안됌
+ 컴포넌트가 렌더링될 때마다 매번 같은 순서로 호출
+ 컴포넌트내에서만 Hook을 호출

Custom Hook 만들기

```jsx
import React, { useState, useEffect } from "react";

function UserStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });

    if (isOnline === null) {
        return '대기중';
    }
    return isOnline ? '온라인' : '오프라인';
}
```

Custom Hook 추출하기

``` jsx
import { useState, useEffect } from "react";

function useUserStatus(userId) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ServerAPI.subscribeUserStatus(userId, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(userId, handleStatusChange);
        };
    });

    return isOnline;
}

```

Custom Hook 사용하기

``` jsx
function UserStatus(props) {
	const isOnline = useUserStatus(props.user.id);

	if (isOnline === null) {
		return "대기중...";
	}
	return isOnline ? "온라인" : "오프라인";
}

function UserListItem(props) {
	const isOnline = useUserStatus(props.user.id);

	return (
        <li style={{color: isOnline ? 'green' : 'black'}}>{props.user.name}</li>
    );
}
```

# 8강 Handling Events

##Event의 정의 및 Event 다루기

DOM의 Event
``` jsx
// DOM에서 이벤트를 처리
<button onclick="activate()"> Activate </button>
```

리액트의 Event
``` jsx
// 리액트에서 이벤트 처리리
<button onClick={activate}> Activate </button>
```

``` jsx 
function Toggle(props) {
    const [isToggleOn, setIsToggleOn] = useState(true);

    // 방법 1. 함수 안에 함수로 정의
    function handleClick() {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }

    // 방법 2. arrow function을 사용하여 정의
    const handleClick =() => {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }

    return (
        <button onClick={handleClick}>{isToggleOn ? "켜짐" : "꺼짐"} </button>
    );
}
```

Arguments란? : Event Handler에 전달할 데이터

``` jsx
function MyButton(props) {
    const handleDelete = (id, event) => {
        console.log(id, event.target);
    };

    return (
        <button onClick={(event) => handleDelete(1, event)}> 삭제하기 </button>
    );
}
```

# 9강 Conditional Rendering

## Conditional Rendering의 정의와 Inline Conditions

Conditional Rendering란? : 어떠한 조건에 따라서 렌더링이 달라지는 것

``` jsx 
function UserGreeting(props) {
    return <h1>다시 오셨군요!</h1>;
}

function GuestGreeting(porps) {
    return <h1>회원가입을 해주세요. </h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;

    if(isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}
```

Element Variables란? : 리액트의 엘리먼트를 변수처럼 다루는 방법

```jsx 
function LoginButton(props) {
	return <button onClick={props.onClick}></button>;
}
function LogoutButton(props) {
	return <button onClick={props.onClick}></button>;
}

function LoginControl(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLoginClick = () => {
		setIsLoggedIn(true);
	};

	const handleLogoutClick = () => {
		setIsLoggedIn(false);
	};

	let button;
	if (isLoggedIn) {
        // button이라는 변수에 컴포넌트를 대입
		button = <LogoutButton onClick={handleLogoutClcik} />;
	} else {
		button = <LoginButton onClick={handleLoginClcik} />;
	}

	return (
		<div>
			<Greeting isLoggedIn={isLoggedIn} />
			{buttton}
		</div>
	);
}
```

Inline Conditions란? : 조건문을 코드 안에 집어넣는 것
+ true && expression -> expression
+ false && expression -> false


Inline if
``` jsx
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;

    return (
        <div>
            <h1>안녕하세요!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    현재 {unreadMessages.length}개의 읽지 않은 메시지가 있습니다.
                </h2>
            }
        </div>
    );
}
```

Inline if-Else
+ ? 연산자를 사용
+ condition ? true : false

```jsx
function LoginControl(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLoginClick = () => {
		setIsLoggedIn(true);
	};

	const handleLogoutClick = () => {
		setIsLoggedIn(false);
	};

	return (
		<div>
			<Greeting isLoggedIn={isLoggedIn} />
			{isLoggedIn ? <LogoutButton onClick={handleLogoutClick} /> : <LoginButton onClick={handleLoginClcik} />}
		</div>
	);
}
```

컴포넌트 렌더링을 안할때
``` jsx
function WarningBanner(props) {
    if (!props.warning) {
        return null;
    }
    return (
        <div>경고경고경고</div>
    );
}

function MainPage(props) {
    const [showWarning, setShowWarning] = useState(false);

    const handleToggleClick = () => {
        setShowWarning(prevShowWarning => !prevShowWarning);
    }

    return (
        <div>
            <WarningBanner warning={showWarning}/>
            <button onClick={handleToggleClick}>{showWarning ? "감추기" ; "보이기" }</button>
        </div>
    )
}
```















