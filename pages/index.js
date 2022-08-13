import NavBar from '../components/NavBar';
export default function Home() {
	return (
		<>
			<NavBar />
			<div>Hello</div>
			<style jsx>{`
				div {
					color: pink;
				}
			`}</style>
		</>
	);
}
