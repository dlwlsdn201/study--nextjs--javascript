import Layout from '../components/Layout';
import '../styles/globals.css';


// pageProps : 각 페이지 컴포넌트의 getServerSideProps() 함수에서 return 되는 { props: {...} } 객체임. 즉, 해당 페이지로 props 라는 인자로 전달됨.

export default function App({ Component, pageProps }) {
	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
