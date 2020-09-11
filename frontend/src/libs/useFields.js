import { useState } from 'react';

const initialState = {
	username: '',
	name: '',
	confirmationCode: '',
	password: '',
};

export const useFields = () => {
	const [fields, changeValue] = useState(initialState);

	function change(e) {
		const { name, value } = e.target;
		changeValue((prev) => ({ ...prev, [name]: value }));
	}

	return {
		fields,
		change,
	};
};

// export default useFields;
