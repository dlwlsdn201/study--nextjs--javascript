# NextJS 란?

## Static Pre Rendering

---

- NextJS 의 가장 큰 장점 중 하나로서, 미리 렌더링하는 기능이다.

### react-app

---

- CSR 방식
- 즉, 브라우저가 자바스크립트를 가져와서 유저가 보는 UI 요소들을 **모두 처리**한다.
(브라우저가 HTML 을 가져올 떄 비어있는 div (`<div id=’root’></div>`) 을 가져옴.

### next-app

---

- SSR 방식
- 즉, 시각적인 요소들은 서버에서 미리 처리(pre-rendering) 되어 브라우저로 전달하게 되고, 브라우저에서는  **API 요청**만 처리한다.
- 유저가 매운 느린 연결을 하고 있거나, 브라우저에서 자바스크립트 비활성화를 해놔도 사용자는 최소한의 HTML(초기 코드값)을 볼 수 있다.
- 서버에서 react 페이지 pre rendering → 렌더링 완료 후, HTML 로 변환 → 페이지의 소스코드에 삽입 → 브라우저에서 HTML 먼저 출력
- 장점 : SEO, 구글 검색엔진을 위해 유용함.

## 설치 및 환경

---

### 기본 생성

- 아래의 명령어로 NextJS 프로젝트를 생성할 수 있다.
    
    ```bash
    $npx create-next-app <프로젝트명>
    ```
    

### 최신버전으로 생성

- 최신 nextJS 버전으로 설치하고 싶을 경우
    
    ```bash
    $npx create-next-app@latest
    ```
    

### 타입스크립트 기반의 NextJS 프로젝트 생성

- TypeScript기반의 NextJS 프로젝트를 생성하고 싶을 경우
    
    ```bash
    $npx create-next-app --typescript
    ```
    

### NextJS 프로젝트 구성

![image](https://user-images.githubusercontent.com/53039583/187058267-b178cabf-bc65-4668-bdc0-4ec06e371c26.png)

### pages

- 프로젝트 페이지(컨테이너)에 대한 컴포넌트가 관리되는 폴더
- `pages/index.js` 컴포넌트는 url 이 `/` 일 때, default 로 렌더링되며, 나머지 페이지 컴포넌트들은 `url/[컴포넌트명]` 주소로 접근할 수 있다. 즉, 컴포넌트 파일명이 곧 페이지 주소로 자동 할당된다.
- 페이지 컴포넌트명은 **소문자**, **숫자**, `-` 또는 `_` 을 포함할 수 있다.
- 페이지 컴포넌트들은 `export default` 로 export 되어야한다. (아닐 경우, TypeError 발생)
    - 아래의 경우, about 페이지는 `url/about` 으로 접근 가능
        
        ![image](https://user-images.githubusercontent.com/53039583/187058271-40b6f8f5-676a-4fe5-be74-0c91976738b9.png)
        

## 네비게이션 컴포넌트

---

- NextJS 에서 네비게이션 요소를 구현할 때, `<a/>` 태그만 단독으로 사용하는 것은 지양하고, **NextJS 자체에서 제공하는**  `<Link herf=''`
- `/>` 컴포넌트를 사용해야 한다.
- 그 이유는, <a/> 태그로 페이지 이동 시, 페이지 전체가 새로고침 되어버리기 때문에 NextJS 의 SSR 장점을 무력화시키기 때문이다.
    
    ```jsx
    import Link from 'next/link';
    import React from 'react';
    
    export default function NavBar() {
    	return (
    		<nav>
    			<Link href='/'>
    				<a className="HomeBtn" style={{color: 'blue'}}>Home</a>
    				Home
    			</Link>
    			<Link href='/about'>
    				<a>about</a>
    			</Link>
    		</nav>
    	);
    }
    ```
    
- <a> 태그 없이 <Link></Link> 컴포넌트 사이에 string 형식의 데이터만 입력해도 동작은 하지만, 
`<Link><a>…</a></Link>` 형식으로 정의하는 것을 추천한다. 
그 이유는 <Link> 컴포넌트는 `href` 프로퍼티만 취급하고 className 정의, style 설정 등의 기능은 할 수 없기 때문이다.

## 라우터와 연결시켜주는 Hook 함수 `useRouter()`

---

- NextJS 자체에서 제공하는 `useRouter()` Hook 함수를 통해 라우팅 기능을 이용할 수 있다.
    
    ```jsx
    import Link from 'next/link';
    import { useRouter } from 'next/router';
    import React from 'react';
    
    export default function NavBar() {
    	const router = useRouter();
    	console.log('router:', router);
    	return (
    		<nav>
    			<Link href='/'>
    				<a>Home</a>
    			</Link>
    			<Link href='/about'>
    				<a>about</a>
    			</Link>
    		</nav>
    	);
    }
    ```
    
    ```json
    // useRouter() 에 대한 return Object
    {
    	asPath: "/about" //basePath 또는 locale 이 포함되지 않은 path
    	back: ƒ ()
    	basePath: "" // 활성화 되어 있는 basePath (next.config.js에 지정한 경로 접두사)
    	beforePopState: ƒ ()
    	components: {/: {…}, /_app: {…}, /about: {…}}
    	defaultLocale: undefined
    	domainLocales: undefined
    	events: {on: ƒ, off: ƒ, emit: ƒ}
    	isFallback: false // fallback에 관련된 값 boolean  또는 'blocking'으로 들어옴.
    	isLocaleDomain: false 
    	isPreview: false // 현재 미리보기 모드인지 여부
    	isReady: true // 라우터 field가 클라이언트 측에서 업데이트되고 사용할 준비가 되었는지 여부
    	locale: undefined
    	locales: undefined
    	pathname: "/about" // 활성화 되어 있는 base path (next.config.js에 지정한 경로 접두사)
    	prefetch: ƒ ()
    	push: ƒ ()
    	query: {} // 현재 route 값 (/pages 폴더 하위에 있는 페이지 경로)
    	reload: ƒ ()
    	replace: ƒ ()
    	route: "/about"
    }
    ```
    

### router 관련 사용되는 메서드

- `router.push(url, as, options)` : history stack에 쌓여서 **뒤로가기 가능**
- `router.replace(url, as, options)` : history stack에 안 쌓여서 **뒤로가기 불가능**
    
    (* 외부 url 로 이동하는 경우 `window.location` 을 사용하는 것을 더 추천) 
    
- `router.prefetch(url, as)` : 빠른 클라이언트 전환을 위해 페이지 데이터를 미리 로드함.
(*next/link 의 경우 자동으로 페이지를 미리 가져오기 때문에 next/link 가 없는 탐색에서 유용함)
- `router.beforePopState({url, as, options})` : 라우터가 동작하기 전에 특정 작업을 하고 싶을 때 사용
    
    ```jsx
    import { useEffect } from 'react'
    import { useRouter } from 'next/router'
    
    export default function Page() {
      const router = useRouter()
    
      useEffect(() => {
        router.beforePopState(({ url, as, options }) => {
          // 아래 두 url로만 이동을 허용하고 싶을때
          if (as !== '/' && as !== '/other') {
            // Have SSR render bad routes as a 404.
            window.location.href = as
            return false
          }
    
          return true
        })
      }, [])
    
      return <p>Welcome to the page</p>
    }
    ```
    
- `router.back()` : 뒤로가기 버튼 클릭과 같은 기능
(*window.history.back() 이 실행됨)
- `router.reload()` : 새로고침 버튼 클릭과 같은 기능
    
    (*window.history.reload() 이 실행됨)
    
    ```jsx
    import { useRouter } from 'next/router'
    
    export default function Page() {
      const router = useRouter()
    
      return (
        <button type="button" onClick={() => router.reload()}>
          Click here to reload
        </button>
      )
    }
    ```
    
- `router.events` : next/router로 이벤트를 감지해서 특정 이벤트가 발생하면 함수를 실행.
    
    **1. routeChangeStart**
    
    `routeChangeStart(url, { shallow })`  경로가 변경되기 시작할때 발생
    
    **2. routeChangeComplete**
    
    `routeChangeComplete(url, { shallow })`  경로가 완전히 변경되면 발생
    
    **3. routeChangeError**
    
    `routeChangeError(url, { shallow })`  경로 변경시 오류가 발생하거나 경로 전환 취소시 발생 (err.cancelled - 탐색이 취소되었는지 여부)
    
    **4. beforeHistoryChange**
    
    `beforeHistoryChange(url, { shallow })`  브라우저의 history를 변경하기 전에 발생
    
    **5. hashChangeStart**
    
    `hashChangeStart(url, { shallow })`  해시는 변경되지만 페이지는 변경되지 않을때 발생
    
    **6. hashChangeComplete**
    
    `hashChangeComplete(url, { shallow })`  해시가 변경되었지만 페이지는 변경되지 않을때 발생
    
    ```jsx
    import { useEffect } from 'react'
    import { useRouter } from 'next/router'
    
    export default function MyApp({ Component, pageProps }) {
      const router = useRouter()
    
      useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
          console.log(
            `App is changing to ${url} ${
              shallow ? 'with' : 'without'
            } shallow routing`
          )
        }
    
        router.events.on('라우터이벤트 이름 ex) routeChangeStart' handleRouteChange)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
          router.events.off('라우터이벤트 이름 ex) routeChangeStart' handleRouteChange)
        }
      }, [])
    
      return <Component {...pageProps} />
    }
    ```
    

## 라우터에 의해 호출된 컴포넌트가 아닐 경우, `match`|`location`|`history` 객체에 접근 방법

---

- next/router 라이브러리에서 제공하는 `withRouter()` 을 사용한다.
    
    ```jsx
    import { withRouter } from 'next/router'
    
    function Page({ router }) {
      return <p>{router.pathname}</p>
    }
    
    export default withRouter(Page)
    ```
    
- typescript 환경에서 사용할 경우
    
    ```tsx
    import React from 'react'
    import { withRouter, NextRouter } from 'next/router'
    
    interface WithRouterProps {
      router: NextRouter
    }
    
    interface MyComponentProps extends WithRouterProps {}
    
    class MyComponent extends React.Component<MyComponentProps> {
      render() {
        return <p>{this.props.router.pathname}</p>
      }
    }
    
    export default withRouter(MyComponent)
    ```
    

## NextJS 에서 CSS  사용하기

---

- NextJS 에서 css 파일을 사용하려면 `[파일명].module.css` 형식으로 css 파일을 생성하여 특정 컴포넌트에서 import 한다.

### 기본적인 css 적용 (비추천)

- module.css 파일에 정의된 class를 js 컴포넌트에서 프로퍼티로 호출하여 className 으로 사용햘 수 있다
    
    ```css
    /* NavBar.module.css */
    
    .active {
      color: red;
    }
    
    .underline {
      text-decoration: none;
    }
    ```
    
    ```jsx
    // NavBar.js
    
    import Link from 'next/link';
    import { useRouter } from 'next/router';
    import React from 'react';
    import styles from './NavBar.module.css';
    
    export default function NavBar() {
    	const router = useRouter();
    	return (
    		<nav>
    			<Link href='/'>
    				<a
    					className={router.pathname === '/' ? styles.active : ''}>
    					Home
    				</a>
    			</Link>
    			<Link href='/about'>
    				<a className={router.pathname === '/about' ? styles.active : ''}>
    					about
    				</a>
    			</Link>
    		</nav>
    	);
    }
    ```
    
- 2개 이상의 className 을 정의하려면 아래의 방식 중 하나를 택하여 구현할 수 있다.
    - `className={[class1, class2, …].join(” “)}`  → […].join(” “) 사용
    - `className={`${class1} ${class2} ${class3}`}` → 백틱 문자 사용

- **이 기본적인 방법은 코드가 프로젝트 규모가 커질수록 오히려 코드를 복잡하게 만들 수 있기 때문에 그닥 추천하지는 않는다..**

### `<style jsx>…</style>` 태그로 css 적용

- HTML 에서 <style> 태그 사용하는 방식과 동일하며, 따로 import 할 필요가 없다.
- 적용되는 스코프는 선언한 컴포넌트 내부로 한정된다. 즉, 아래의 컴포넌트에서 선언된 
`<style jsx>…</style>` 태그는 즉 다른 컴포넌트에 영향을 주지 않는다.
- style 태그에 `jsx` 프로퍼티를 선언해줘야 한다.
    
    ```jsx
    import Link from 'next/link';
    import { useRouter } from 'next/router';
    
    export default function NavBar(props) {
    	const router = useRouter();
    	return (
    		<nav>
    			<Link href='/'>
    				<a className={router.pathname === '/' ? 'active' : ''}>Home</a>
    			</Link>
    			<Link href='/about'>
    				<a className={router.pathname === '/about' ? 'active' : ''}>about</a>
    			</Link>
    			<style jsx>{`
    				.active {
    					background-color: blue;
    					color: ${props.isData ? 'green' : 'red'};
    					padding: 4px;
    				}
    			`}</style>
    		</nav>
    	);
    }
    ```
    

### Global style 적용하기

- NextJS 의 중요한 컨셉인  `_app.js` 컴포넌트로 Global style 을 적용시킬 수 있다.
- `_app.js` 는 페이지 컴포넌트들의 청사진 개념이다. 즉, 요청한 page 컴포넌트를 _app.js 을 거쳐서 최종적으로 렌더링 시킨다.
    - _app.js 파일명은 고정이다. 즉, 사용자가 커스터마이징 할 수 없다. (단, 코드 내 컴포넌트명은 가능)
    - _app.js 의 인자는 아래와 같다.
        - `Component` : page 컴포넌트 자체
        - `pageProps`: **`getInitialProps`**, **`getStaticProps`**, **`getServerSideProps`** 중 하나를 통해 fetch한 초기 속성값
1. `<style jsx>…</style>` 태그로 global style 적용할 경우
    - `_app.js` 에 `<style jsx global>{`<CSS문법>`}</style>`  을 선언하면, 모든 페이지에 전역적으로 적용된다.
    - 단점 : Next.js 에서는 계층구조를 하나의 루트가 아닌 페이지별로 생각해야 한다. 즉, 특정 페이지의 컴포넌트에 global css 을 선언했을 때, 다른 페이지로 이동하면 그 global css는 작동하지 않는 단점이 있다.
    
    ```jsx
    // pages/_app.js
    
    import NavBar from '../components/NavBar';
    
    export default function App({ Component, pageProps }) {
    	return (
    		<>
    			<NavBar />
    			<Component {...pageProps} />
    			<style jsx global>{`
    				a {
    					color: white;
    				}
    			`}</style>
    		</>
    	);
    }
    ```
    
2. `.css` 파일로 **global style 적용할 경우** (가장 추천하는 방법)
    - 일반 .css 파일은 _app.js 컴포넌트 이외에서는 직접적으로 import 할 수 없다.
    따라서, GloalStyles.css 같은 파일은 `_app.js` 에 `import <.css파일경로>` 구문으로 임포트 하여 모든 페이지에 적용시켜야 한다.

```jsx
// pages/_app.js

import NavBar from '../components/NavBar';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<>
			<NavBar />
			<Component {...pageProps} />
		</>
	);
}
```

## NextJS  프로젝트의 주로 쓰는 Layout 패턴

---

- NextJS 에서 주로 따르는 구조 패턴은 `<Layout/>` 컴포넌트를 사용한다.

### <Layout/> 컴포넌트

- 주로 페이지마다 공통적으로 표현해야 하는 요소들을 관리한다. (Head, footer 등)
- 하지만, 독립적인 레이아웃이 요구되는 몇몇 특정 페이지가 있다. _app.js 또는 Layout 자체에서 조건문으로 처리
    
    ```jsx
    import NavBar from './NavBar';
    
    // children : <Layout> ... </Layout> 사이에 있는 모든 요소
    export default function Layout({ children }) {
    	return (
    		<>
    			<NavBar />  
    			<div>{children}</div>
    		</>
    	);
    }
    ```
    
    - 네비게이션 요소(`<NavBar/>`) 는 대부분 페이지에 공통적으로 사용되므로 위의 코드처럼 <Layout/> 컴포넌트에서 관리하는 것이 효율적이다.

### Layout 을 적용한 NextJS 프로젝트 구조

- `_app.js`
    
    ```jsx
    import Layout from '../components/Layout';
    import '../styles/globals.css';
    
    export default function App({ Component, pageProps }) {
    	return (
    		<>
    			<Layout>
    				<Component {...pageProps} />
    			</Layout>
    		</>
    	);
    }
    ```
    

## NextJS 에서 제공하는 헤더 컴포넌트 `<Head>`

---

- 일반 react-app 에서는 앱의  head 부분을 관리하기 위해 `react helmet` 같은 패키지를 따로 설치해야하고 환경을 따로 일일히 구성해줘야한다.
- 하지만 nextJS 에서는 헤더 영역을 위헤 자체적으로 <Head> 라는 컴포넌트를 제공한다.
- `Seo.js`
    
    ```jsx
    import Head from 'next/head';
    
    export default function Seo({ title }) {
    	return (
    		<Head>
    			<title>{title} | Next Movies</title>
    		</Head>
    	);
    }
    ```
    
- `index.js`
    
    ```jsx
    import Seo from './Seo';
    
    export default function Home() {
    	return (
    		<>
    			<Seo title='Home' />
    			<div>Hello</div>
    		</>
    	);
    }
    ```
    

## NextJS 의 Redirect 와 Rewrite 기능으로 보안성 강화하기

---

### API  key 숨기기

- 숨기는 이유?
    - 유료로 API Key 를 사용하는 경우, 모두에게 공개하고 싶지 않을 수 있음
    - API key 의 사용량이 제한적인 경우 ( ex- 1분에 최대 100번까지 호출 가능)
    - 외부로 유출되므로서, 다른 사용자가 남용할 수도 있음.

### Redirect

- 사용자가 `A 주소로 접근을 시도` → `B 주소로 연결` 및 `브라우저 주소표시줄 변경`
- **사용자**는 바뀐 new url (destination) 을 브라우저 주소창을 통해 알 수 있음
    
    ```jsx
    // next.config.js
    
    /** @type {import('next').NextConfig} */
    
    	const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
    
    	const nextConfig = {
    		reactStrictMode: true,
    		swcMinify: true,
    		async redirects() {
    			// 
    			return [
    				{
    					source: '/old-blog/:path', // pattern-matching : 앞에 주소만 바뀌고, 뒤에 쿼리 (:path) 는 그대로 유지
    					destination: '/new-blog/:path',
    					permanent: false
    				}
    			];
    		},
    	};
    
    module.exports = nextConfig
    ```
    
- `pattern-matching` 지원
    - 주소만 바뀌고 쿼리는 그대로 유지
        
        ```jsx
        // next.config.js
        
        /** @type {import('next').NextConfig} */
        
        	const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
        
        	const nextConfig = {
        		reactStrictMode: true,
        		swcMinify: true,
        		async redirects() {
        			// 바뀐 new url (destination) 을 사용자가 브라우저 주소창을 통해 알 수 있음
        			return [
        				{
        					source: '/old-blog/:path', // pattern-matching : 앞에 주소만 바뀌고, 뒤에 쿼리 (:path) 는 그대로 유지
        					destination: '/new-blog/:path',
        					permanent: false
        				},
        				{
        					source: '/old-blog/:path*', // * : 쿼리 뒤에 어떠한 것들이 추가적으로 붙을 수 있다는 뜻.
        					destination: '/new-blog/:path*',
        					permanent: false
        				}
        			];
        		}
        	};
        
        module.exports = nextConfig
        ```
        
        1. source url 로 접근
            
            ![image](https://user-images.githubusercontent.com/53039583/187058294-d34109e0-9af7-4e36-82dc-aef3960c7aec.png)
            
        2. destination url 로 연결 (뒤에 쿼리(`:path`)는 그대로 유지)
            
            ![image](https://user-images.githubusercontent.com/53039583/187058299-58e4a151-b5e2-45bd-906a-ff38421ea902.png)
            

### Rewrite

- 사용자가 `A 주소로 접근을 시도` → `B 주소로 연결` 및 `브라우저 주소표시줄 변경 X`
- **사용자**는 바뀐 new url (destination) 을 브라우저 주소창을 통해 알 수 없음
- API Key 등 민감한 정보를 가려야할 때, 사용할 수 있음.
    
    ```jsx
    /** @type {import('next').NextConfig} */
    
    	const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
    
    	const nextConfig = {
    		reactStrictMode: true,
    		swcMinify: true,
    
    		async rewrites() {
    			// 바뀐 new url (destination) 을 사용자가 통해 알 수 없음. 즉, source url 이 그대로 사용자에게 보이지만, 실제 연결은 destination 사이트에 연결됨.
    			return [
    				{
    					source: '/api/movies', //source 는 무조건 '/' 으로 시작해야한다.
    					destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    				}
    			];
    		}
    	};
    
    module.exports = nextConfig
    ```
    
    - 위의 코드를 기준으로 사용자가 `서버URL/api/movies` 주소로 접근했을 때, 브라우저 주소표시줄에는  변화없이 source 주소 (`서버URL/api/movies`) 가 표시되지만 실제 연결은 `destination`(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`) 로 된다.
    

## 환경변수 dotenv 를 사용하여 좀 더 안전하게 API_KEY 를 보호하기

---

### 환경변수란?

- 프로세스가 컴퓨터에서 동작하는 방식에 영향을 미치는 동적인 값들의 모임

### dotenv 란?

- 환경변수를 `.env` 라는 확장자 파일에 저장하고 `process.env` 을 통해 리액트 컴포넌트 코드 내에서 불러올 수 있는 의존성 모듈이다.
    
    ```bash
    $npm i --save dotenv or $yarn add --dev dotenv
    $npm i --save-dev @types/dotenv or $yarn add --dev @types/dotenv   # typescript 사용 시
    ```
    
- `.env`
    - **API_KEY, Port, 암호** 등 보안과 관련된 데이터들을 변수로 관리하는 환경변수 파일이다.
    - Private 목적으로 사용되기 때문에 반드시 `.gitignore` 에 추가하여 remote repo 에 올라가지 않도록 한다.
    - 파일 위치는 `프로젝트의 root 경로`에 생성해야 한다.
    - 파일명은 `.env.<mode명>` 으로 저장한다.
    - 변수명 형식은 개발 환경이 리액트인지 아닌지에 따라 조금씩 차이가 있는데, 그 이유는 React에서 `process_env.REACT_APP_`이 예약어이기 때문에, 이를 따르지 않으면 인식을 못할 수도 있기 때문이다.
        - React 환경일 경우 → ‘`REACT_APP_<변수명>`’
        - React 환경이 아닐 경우 → ‘`<변수명>`’

### API KEY를 환경변수로 관리하기

```bash
# /.env

REACT_APP_MOVIE_API_KEY = aad519b83c9fdb2b8aad15936da11445
```

```jsx
# /next.config.js

/** @type {import('next').NextConfig} */

	// const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';

	const nextConfig = {
		reactStrictMode: true,
		swcMinify: true,
		async redirects() {
			// 바뀐 new url (destination) 을 사용자가 브라우저 주소창을 통해 알 수 있음
			return [
				{
					source: '/contract', // 사용자가 접근(요청)하려는 표면상 url
					destination: 'https://www.google.com', // 실제 사용자를 redirection 할 url
					permanent: false // 브라우저나 검색엔진이 이 정보를 기억하는지 여부
				},
				{
					source: '/old-blog/:path', // pattern-matching : 앞에 주소만 바뀌고, 뒤에 쿼리 (:path) 는 그대로 유지
					destination: '/new-blog/:path',
					permanent: false
				},
				{
					source: '/old-blog/:path*', // * : 쿼리 뒤에 어떠한 것들이 추가적으로 붙을 수 있다는 뜻.
					destination: '/new-blog/:path*',
					permanent: false
				}
			];
		},
		async rewrites() {
			// 바뀐 new url (destination) 을 사용자가 통해 알 수 없음. 즉, source url 이 그대로 사용자에게 보이지만, 실제 연결은 destination 사이트에 연결됨.
			return [
				{
					source: '/api/movies', //source 는 무조건 '/' 으로 시작해야한다.
					destination: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
				}
			];
		}
	};

module.exports = nextConfig
```

## NextJS 의 서버사이드렌더링 (SSR)

- SSR 은 아래의 목적들을 충족시켜준다.
    - SEO 에 최적화
    - 유저가 접속하기 전에 브라우저 탭 제목을 바꾸고 싶을 때
    - pre-render 하고 싶을 때

### `getServerSideProps()` 함수 사용하기

- SSR 로 처리할 작업들을 해당 컴포넌트 하단에 `getServerSideProps()` 함수를 선언한다.

```jsx
// pages/Index.js

export default function Home({result}) {...};

// 이 함수는 이름이 정해져있다. (getServerSideProps)
// 서버사이드 렌더링 기능을 사용하게 해주는 함수
export async function getServerSideProps() {
	// 여기 코드들은 오직 server 에서만 처리됨. (SSR)
	// 즉, 백엔드에서 처리되는 코드 영역.
	// API KEY 을 여기에 써서 client 로부터 비공개할 수도 있다.
	const data = await axios({
		method: 'GET',
		baseURL: 'http://localhost:3000', // Server 측에서  API 호출 시, baseURL 이 반드시 필요함. (Front 에서는 브라우저에 baseURL이 이미 있기 때문)
		timeout: 1000 * 20,
		url: '/api/movies'
	});

	return {
		// props 는 _app 에서 pageProps 라는 파라미터를 통해 각 페이지의 props 으로 전달된다.
		// 각 페이지는 { props } 로 받아서 사용할 수 있다.
		props: {
			results: data.data.results
		}
	};
```

### 결론

- Only SSR  사용 → API 요청까지 모두 끝나면 모든 요소들을 한 번에 출력해주지만, 사용자가 빈화면을 봐야하는 상황이 생길 수 있고 매번 요청 때마다 서버에서 다시 페이지를 구성하여 브라우저에게 보여주기 때문에 CSR 보다 비교적 느리다.
- SSR + CSR 사용 → Nav, sideBar 요소는 CSR 방식으로 하여 페이지 이동 시 계속 고정되도록 하고, 동적 데이터가 필요한 메인 요소들은 SSR 처리를 해준다.
- Only CSR 사용 → 초기 화면 출력은 SSR 보다 느리지만, 페이지 이동 시에는 SSR 보다 오히려 빠르다. 하지만, 초기 화면 출력이 느려서 검색엔진이 ‘빈화면' 으로 인식하여 검색 노출이 잘 안될 수 있다.

## Dynamic Routes 사용하기

- NextJS 에서는 자체적으로 Route 기능은 제공하지 않지만, Dynamic Routes 라는 기능을 제공한다.
- Dynamic Routes 란 동적인 쿼리에 대한 페이지 처리를 도와주는 기능이다.
- Dynamic Routes 을 적용할 파일명은 반드시 대괄호(`[]`) 을 감싸야 한다.

### 예시

- 만약 영화 정보 사이트에서 특정 영화를 클릭하면 해당 영화 id 를 쿼리로 전송하여, 해당 영화의 상세 페이지로 라우팅하는 기능을 구현하려고 한다.
    
    ![image](https://user-images.githubusercontent.com/53039583/187058354-225d83f3-4d75-4b91-84d2-012b259ca308.png)
    
    1. `pages/` 폴더에서 `movies` 폴더 생성 및 특정 영화에 대한 고유 id 를 쿼리로 받기 위해 `[id].js` 라는 js 파일을 movies 폴더 안에 생성한다.
        
        ![image](https://user-images.githubusercontent.com/53039583/187058358-0609235f-b221-4c22-8980-a6fba7c2a0d1.png)

        
    2. `[id].js`  페이지에 대한 코드를 간단하게 작성한다.
        
        ```tsx
        // movies/[id].js
        
        import { useRouter } from 'next/router';
        
        export default function Detail() {
        	const router = useRouter();
        	console.log('router ->', router);
        	return 'detail';
        } 
        ```
        
    3. 브라우저 접속창에 `url/movies/<임의의 ID>`  을 입력하면 아래와 같이 [id].js 에 작성했던 코드들이 실행되는 것을 볼 수 있다.
    즉, 실제 주소창에 임의로 입력했던 ID 가 동적 쿼리로 인식하여 `[id].js`  Dynamic Routes  파일이 실행된 것이다.
        
        ![image](https://user-images.githubusercontent.com/53039583/187058361-b60fb822-8c12-4eca-9585-f296c23980f2.png)
        

### router hook

- 어떨 때는 유저가 form 같은 것을 제출하고 나면 코드를 통해 자동으로 유저를 navigating 하고 싶은 상황이 발생할 때, router hook 함수를 따로 생성할 수 있다.
    
    ```jsx
    // pages/index.js
    
    (...)
    
    const router = useRouter();
    
    	// 직접 클릭 이벤트로 구현한 라우팅 함수
    	const onClick = (id, title) => {
    		// router.push(`/movies/${id}`);  // router.push 의 간단한 사용 방법
    		router.push(                     // router.push 의 심화 사용 방법
    			{
    				pathname: `/movies/${id}`,
    				query: {
    					title
    				}
    			},
    			`/movies/${id}`
    		);
    	};
    
    return (
    	(...)
    	{results?.map((movie) => (
    		<div
    			onClick={() => onClick(movie.id, movie.original_title)}
    			className='movie'
    			key={movie.id}>
    			<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    			<h4>
    				<Link
    					href={{
    						pathname: `/movies/${id}`,
    						query: {
    							title: movie.original_title
    						}
    					}}
    					as={`/movies/${id}`}>
    					<a>{movie.original_title}</a>
    				</Link>
    			</h4>
    		</div>
    	))}
    	(...)
    )
    ```
    

## Catch All URL

- 말 그대로 모든 것을 캐치해내는 URL 을 뜻한다.
- pages 하위에 Dynamic Routes 파일명을 스프레드 연산자 `[...<파일명>].js` 으로 설정하면 어떤 URL 이라도 쿼리로 잡을 수 있다.
- […<파일명>].js 로 설정하면, url 뒤에 붙는 모든 쿼리들이 아래와 같이 Array 형태로 라우터에 전달된다.
    
    ![image](https://user-images.githubusercontent.com/53039583/187058386-e8333545-4927-4c9d-b28f-68b2998806d0.png)

    

### 예시

- 영화 정보 페이지에서 특정 영화 상세 정보 페이지 이동 시, url 및 브라우저 제목에 해당 영화의 제목을 나타내고 싶을 때
    1. `[id].js` → `[…params].js`  으로 파일명 변경 및 getServerSideProps() 에서 ctx.params.params  을 prop으로 받아 페이지 컴포넌트에 전달
        
        ![image](https://user-images.githubusercontent.com/53039583/187058387-29785b04-695a-4acc-99c9-7195328c314b.png)

        
    2. […index].js 에서 Array 타입의 `params` 을 prop 으로 전달받아, Seo 및 상세정보 페이지 본문에 영화 제목 `title` 데이터 전달
        
        ![image](https://user-images.githubusercontent.com/53039583/187058392-a88d5b44-c836-47ae-aa00-aaf6634fc8f3.png)

        
        ![image](https://user-images.githubusercontent.com/53039583/187058395-b9295eee-bf5a-4d4c-b1b1-71dfa6f1a97f.png)
        

## 404 Error page

- nextjs 에서 `/pages/` 에 `404.js` 이름으로 페이지 파일을 생성하면 NextJS에서 자동으로 404 에러 발생 시, `404.js` 페이지 컴포넌트로 라우팅 해준다.
- 404 Error Page 는 무료 템플릿들도 많으니, 굳이 처음부터 새로 만들지 않아도 된다.
    
    ![image](https://user-images.githubusercontent.com/53039583/187058407-ac87029a-08a2-4177-944e-b250b179d355.png)
    

## 프레임워크와 라이브러리의 차이?

---

### 프레임워크

---

- 개발자가 직접 작성한 코드를 가지고 정해진 프로세스대로 처리하여 최종 결과물을 보여주는 것
- 개발자는 특정한 룰을 따라야함

### 라이브러리

---

- 개발자가 필요한 도구를 불러와서 사용하여 목적을 달성하는 것
- 사용하는 데 큰 제약이 없음 (자유도 높음)

# 기타

---

## axios 라이브러리로 fetch 처리 방법

- axios 라이브러리를 사용하면, `async/await` 키워드를 따로 사용하지 않아도 처리할 수 있다.

```jsx
import axios from 'axios';

const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
const [movies, setMovies] = useState([]);
const BASE_URL = `https://api.themoviedb.org/3`;
const url = `/movie/popular?api_key=${API_KEY}`;

axios({
	method: 'GET',
	baseURL: BASE_URL,
	timeout: 1000 * 20,
	url
}).then((result) => {
	setMovies(result.data.results);
}))();
```

## <a> 태그 안에 <div> 태그를 넣는건 문법적으로 옳지 않다?

- **HTML 5 이전** → <a>…</a> 내부에 인라인 요소만 넣을 수 있음. 즉, div 태그를 넣을 수 없다.
- **HTML 5 이후** → <a>…</a> 내부에 블럭요소 즉, <div> 태그를 넣을 수 있다. (단, <a> 태그 내부에만 가능하며, 그 외에 인라인 요소 내부에 블럭 요소를 넣는 것은 문법적으로 맞지 않다)

## 라우터는 프론트에서만 실행된다?

- 컴포넌트 내부에서 router 을 사용하면 router는 클라이언트 사이드 즉, 프론트에서만 실행된다.