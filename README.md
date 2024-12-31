# 4강

## JSX의 정의와 역할

JSX란 : JavaScript + XML/HTML

예시
``` jsx
const element = <h1>Hello, word!</h1>;
```

JSX를 사용한 코드
``` jsx
const element = (
    <h1 clssName="greeting"> Hello, world!</h1>
)
```

JSX를 사용하지 않은 코드
``` jsx
const element = React.createElement(
    'h1',
    { className: 'greeting'},
    'Hello, world!'
)
```


# JSX의 장점 및 사용법

버그를 발견하기 쉬움
간결함
Injection Attacks 방어 

``` jsx
const name = '소플';
const element = <h1>안녕, {name}</h1>;

React.DOM.render(
    element,
    document.getElementById('root')
);
```

5강

Elements의 정의와 생김새

Elements란 : 리액트 앱을 구성하는 가장 작은 블록들


React.createElement(
    type,
    [props],
    [...children]
)

Elements의 특징 및 렌더링하기

im + mutable = immutable(불변성)

6강

Components와 Props의 정의

Props -> React component -> React element


Props의 특징 및 사용법

모든 리액트 컴포넌트는 props를 직접 바꿀 수 없고, 같은 Props에 대해서는 항상 같은 결과를 보여줄것 


Component 만들기 및 렌더링

Function Component

function Welcome(props) {
    return <h1>안녕, {props}</h1>;
}

Class Component

class Welcome extends React.Component{
    render() {
        return <h1>안녕, {this.props.name}</h1>;
    }
}

HTML div 태그로 인식

const element = <div />;

Welcome이라는 리액트 Component로 인식

const element = <Welcome name="리액트" />;


function Welcome(props) {
    return <h1>안녕, {props.name}</h1>;
}

const element = <Welcome name="인제" />;
ReactDOM.render(
    element,
    document.getElementById('root')
)

#Component 합성과 추출
-------------------------
``` jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App(props) {
    return(
        <div>
         <Welcome name="Mike" />
         <Welcome name="Steve" />
         <Welcome name="Jane" />
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```
<img src="./src/images/image7.png" alt="컴포넌트 합성" width="500px" height="1000px">



``` jsx
function Comment(props) {
    return (
        <div className="comment">
         <div className="user-info">
          <img className="avatar" src={props.author.avatarUrl} alt={props.author.name}/>
           <div className="user-info-name">
            {props.author.name}
           </div>
         </div>
         
         <div className="comment-text">
          {props.text}
         </div>

         <div className="comment-date">
          {formatDate(props.date)}
         </div>
        </div>
    );
}
```

``` jsx
function Comment(props) {
    return (
        <div className="comment">
         <div className="user-info">
          <Avatar  user ={props.author} />
           <div className="user-info-name">
            {props.author.name}
           </div>
         </div>
         
         <div className="comment-text">
          {props.text}
         </div>

         <div className="comment-date">
          {formatDate(props.date)}
         </div>
        </div>
    );
}
``` 

``` jsx
function Comment(props) {
    return (
        <div className="comment">
          <UserInfo user ={props.author} />      
         <div className="comment-text">
          {props.text}
         </div>
         <div className="comment-date">
          {formatDate(props.date)}
         </div>
        </div>
    );
}
```
<img src="./src/images/image8.png" alt="컴포넌트 추출" width="500px" height="1000px">





