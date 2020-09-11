import { useState } from 'react';

export const useFormFields = (initialState) => {
	const [fields, setFields] = useState(initialState);
	return [
		fields,
		(e) => {
			const { name, value } = e.target;
			setFields((prev) => ({ ...prev, [name]: value }));
		},
	];
};
