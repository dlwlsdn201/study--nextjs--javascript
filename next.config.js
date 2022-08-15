/** @type {import('next').NextConfig} */

	const API_KEY = 'aad519b83c9fdb2b8aad15936da11445';

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
					destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
				}
			];
		}
	};

module.exports = nextConfig
