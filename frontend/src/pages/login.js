import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import Form from '../components/styles/Form';
import Error from '../components/errorMessage';
import { useUserContext } from '../components/libs/userContext';
import { useFormFields } from '../components/libs/useFormFields';
import LoaderButton from '../components/styles/LoaderButton';

function Signin() {
	const initialState = {
		username: '',
		password: '',
	};
	const [fields, setFields] = useFormFields(initialState);

	const { setIsUserAuth } = useUserContext();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const validateForm = () => {
		return fields.username.length > 0 && fields.password.length > 8;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password } = fields;
		setIsLoading(true);

		try {
			await Auth.signIn(username, password);
			setIsUserAuth(true);
			history.push('/');
		} catch (e) {
			setIsLoading(false);
			alert(e.message);
		}
	};

	return (
		<Form method='post' onSubmit={handleSubmit}>
			<fieldset>
				<h2>Sign into your account</h2>
				{!validateForm() && (
					<Error error={{ message: 'Please fill all info' }} />
				)}
				<label htmlFor='email'>
					Email
					<input
						autoComplete='username'
						type='email'
						name='username'
						placeholder='username'
						value={fields.email}
						onChange={setFields}
					/>
				</label>
				<label htmlFor='password'>
					Password
					<input
						autoComplete='new-password'
						type='password'
						name='password'
						placeholder='password'
						value={fields.password}
						onChange={setFields}
					/>
				</label>
				<LoaderButton
					block
					type='submit'
					bsSize='large'
					isLoading={isLoading}
					disabled={!validateForm()}>
					Login
				</LoaderButton>
			</fieldset>
		</Form>
	);
}

export default Signin;
