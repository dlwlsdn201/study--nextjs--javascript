import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Seo from './Seo';

export default function Home({ results }) {
	// const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
	const [movies, setMovies] = useState();
	const BASE_URL = `https://api.themoviedb.org/3`;
	// const url = `/movie/popular?api_key=${API_KEY}`;
	// useEffect(() => {
	// 	const test = axios({
	// 		method: 'GET',
	// 		// baseURL: BASE_URL,
	// 		timeout: 1000 * 20,
	// 		url: '/api/movies'
	// 	});
	// 	(async () => console.log('test:', await test))();
	// 	setMovies(test);
	// (() =>
	// 	axios({
	// 		method: 'GET',
	// 		// baseURL: BASE_URL,
	// 		timeout: 1000 * 20,
	// 		url: '/api/movies'
	// 	}).then((result) => {
	// 		setMovies(result.data.results);
	// 	}))();
	// }, []);

	const router = useRouter();

	// 직접 클릭 이벤트로 구현한 라우팅 함수
	const onClick = (id, title) => {
		router.push(`/movies/${title}/${id}`);
		// router.push(
		// 	{
		// 		pathname: `/movies/${id}`,
		// 		query: {
		// 			title
		// 		}
		// 	},
		// 	`/movies/${id}`
		// );
	};

	return (
		<>
			<div className='container'>
				<Seo title='Home' />
				{results?.map((movie) => (
					<div
						onClick={() => onClick(movie.id, movie.original_title)}
						className='movie'
						key={movie.id}>
						<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
						<h4>
							<Link href={`/movies/${movie.original_title}/${movie.id}`}>
								<a>{movie.original_title}</a>
							</Link>
						</h4>
					</div>
				))}
				<style jsx>{`
					.container {
						display: grid;
						grid-template-columns: 1fr 1fr;
						padding: 20px;
						gap: 20px;
					}

					.movie {
						cursor: pointer;
					}

					.movie img {
						max-width: 100%;
						border-radius: 12px;
						transition: transform 0.2s ease-in-out;
						box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
					}
					.movie:hover img {
						transform: scale(1.05) translateY(-10px);
					}
					.movie h4 {
						font-size: 18px;
						text-align: center;
					}
				`}</style>
			</div>
		</>
	);
}

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
}