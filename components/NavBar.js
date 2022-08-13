import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function NavBar() {
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
					padding: 4px;
					color: red;
				}
			`}</style>
		</nav>
	);
}
