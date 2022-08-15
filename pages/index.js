import axios from 'axios';
import { useEffect, useState } from 'react';
import Seo from './Seo';

export default function Home() {
	const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
	const [movies, setMovies] = useState();
	const BASE_URL = `https://api.themoviedb.org/3`;
	const url = `/movie/popular?api_key=${API_KEY}`;
	useEffect(() => {
		(() =>
			axios({
				method: 'GET',
				// baseURL: BASE_URL,
				timeout: 1000 * 20,
				url: '/api/movies'
			}).then((result) => {
				setMovies(result.data.results);
			}))();
	}, []);

	return (
		<>
			<div className='container'>
				<Seo title='Home' />
				{movies?.map((movie) => (
					<div key={movie.id}>
						<div className='movie' key={movie.id}>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							/>
							<h4>{movie.original_title}</h4>
						</div>
					</div>
				))}
				<style jsx>{`
					.container {
						display: grid;
						grid-template-columns: 1fr 1fr;
						padding: 20px;
						gap: 20px;
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
