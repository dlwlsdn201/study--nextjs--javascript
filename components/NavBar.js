import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
	const router = useRouter();
	console.log('router.pathname:', router.pathname);
	return (
		<nav>
			<Link href='/'>
				<a
					className={[
						styles.underline,
						router.pathname === '/' ? styles.active : ''
					].join(' ')}>
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
