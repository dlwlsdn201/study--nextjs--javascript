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
