import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import * as rdd from 'react-device-detect';

interface Props {
	children: (props: typeof rdd) => ReactNode;
}

function DeviceContainer({ children }: Props) {
	return children(rdd);
}

const Device = dynamic(() => Promise.resolve(DeviceContainer), { ssr: false });

export { Device };
