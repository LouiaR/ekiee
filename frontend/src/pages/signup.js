import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

import Form from '../components/styles/Form';
import LoaderButton from '../components/styles/LoaderButton';
import { useFormFields } from '../components/libs/useFormFields';
import { useUserContext } from '../components/libs/userContext';
import { useHistory } from 'react-router-dom';

function Signup() {
	const initialState = {
		name: '',
		username: '',
		password: '',
		confirmPassword: '',
		code: '',
	};
	const [isLoading, setIsLoading] = useState(false);
	const { setIsUserAuth } = useUserContext();
	const [fields, handleFieldChange] = useFormFields(initialState);
	const [newUser, setNewUser] = useState(null);
	const history = useHistory();

	async function handleSignup(e) {
		e.preventDefault();
		const { username, password } = fields;
		try {
			const user = await Auth.signUp({ username, password });
			console.log(user);
			setNewUser(true);
		} catch (error) {
			console.log(error, 'error');
		}
	}

	async function handleConfirmationCode(e) {
		e.preventDefault();
		const { code, username } = fields;
		console.log(fields);
		try {
			await Auth.confirmSignUp(code, username);
			// await Auth.signIn({ ...fields });
			setIsUserAuth(true);
			history.push('/');
		} catch (error) {
			console.log('err', error);
			setIsLoading(false);
		}
	}

	const validateForm = () => {
		return fields.username.length > 0 && fields.password.length > 8;
	};

	function renderSignUpForm() {
		return (
			<Form method='post' onSubmit={handleSignup}>
				<fieldset>
					<h2>Sign Up for An Account</h2>
					{/* <Error error={error} /> */}
					<label htmlFor='name'>
						Name
						<input
							type='text'
							name='name'
							placeholder='name'
							value={fields.name}
							onChange={handleFieldChange}
						/>
					</label>
					<label htmlFor='email'>
						Email
						<input
							type='email'
							name='username'
							placeholder='email'
							value={fields.username}
							onChange={handleFieldChange}
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
							onChange={handleFieldChange}
						/>
					</label>
					<label htmlFor='confirmPassword'>
						Password
						<input
							autoComplete='new-password'
							type='password'
							name='confirmPassword'
							placeholder='Confirm password'
							value={fields.confirmPassword}
							onChange={handleFieldChange}
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
	function confirmationCodeForm() {
		return (
			<Form method='post' onSubmit={handleConfirmationCode}>
				<fieldset>
					<h2>Enter confirmation code</h2>
					{/* <Error error={error} /> */}
					<label htmlFor='code'>
						Code
						<input
							type='tel'
							name='code'
							placeholder='Enter code'
							id='code'
							value={fields.code}
							onChange={handleFieldChange}
						/>
					</label>

					<button type='submit'>Sign Up!</button>
				</fieldset>
			</Form>
		);
	}
	return newUser ? confirmationCodeForm() : renderSignUpForm();
}

export default Signup;
// 069287