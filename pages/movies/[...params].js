/* dynamic routes  
  예시 -> /movies/[id] => query : string
  예시 -> /movies/[...id] => query : Array
 */

import { useRouter } from 'next/router';
import Seo from '../Seo';

export default function Detail({ params }) {
	const router = useRouter();
	console.log('router:', router);
	console.log('params ->', params);
	const [title, id] = params || [];
	return (
		<div>
			<Seo title={title} />
			<h4>{title} </h4>
		</div>
	);
}

export function getServerSideProps({ params: { params } }) {
	return {
		props: {
			params
		}
	};
}
