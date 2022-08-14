import axios from 'axios';
import { useEffect, useState } from 'react';
import Seo from './Seo';

export default function Home() {
	const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';
	const [movies, setMovies] = useState([]);
	const BASE_URL = `https://api.themoviedb.org/3`;
	const url = `/movie/popular?api_key=${API_KEY}`;
	useEffect(() => {
		(() =>
			axios({
				method: 'GET',
				baseURL: BASE_URL,
				timeout: 1000 * 20,
				url
			}).then((result) => {
				setMovies(result.data.results);
			}))();
	}, []);

	return (
		<>
			<Seo title='Home' />
			<div>Hello</div>
		</>
	);
}
