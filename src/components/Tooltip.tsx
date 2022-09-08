import { ComponentPropsWithoutRef } from 'react';
import ReactTooltip from 'react-tooltip';

export function Tooltip({ children, ...props }: ComponentPropsWithoutRef<'div'>) {
	return (
		<>
			<div {...props}>{children}</div>
			<ReactTooltip
				className="!opacity-100 !py-1 !px-2 !text-xs !font-medium !shadow-lg"
				backgroundColor="#27272a"
				textColor="#d4d4d8"
				arrowColor="#27272a"
				effect="solid"
			/>
		</>
	);
}

{
	/* <div className='has-tooltip'>
<span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>Some Nice Tooltip Text</span>
Custom Position (above)
</div> */
}
