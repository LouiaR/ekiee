import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, Glyphicon } from 'react-bootstrap';

const spinning = keyframes`
from { transform: scale(1) rotate(0deg); }
to { transform: scale(1) rotate(360deg); }
`;

const Spin = styled(Glyphicon)`
	margin-right: 7px;
	top: 2px;
	animation: ${spinning} 1s infinite linear;
`;

export default function LoaderButton({
	isLoading,
	className = '',
	disabled = false,
	...props
}) {
	return (
		<Button
			className={`LoaderButton ${className}`}
			disabled={disabled || isLoading}
			{...props}>
			{isLoading && <Spin glyph='refresh' className='spinning' />}
			{props.children}
		</Button>
	);
}
