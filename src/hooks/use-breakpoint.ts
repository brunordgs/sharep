import { useEffect, useState } from 'react';

export function useBreakpoint() {
	const [breakpoint, setBreakpoint] = useState(0);

	function resize() {
		setBreakpoint(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	return breakpoint;
}
