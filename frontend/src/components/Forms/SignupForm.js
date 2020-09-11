import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import Form from '../styles/Form';
import { useFields } from '../../libs/useFields';
import { useAppContext } from '../../libs/context';

const SignupForm = () => {
	const { fields, change } = useFields();
	const [isLoading, setIsLoading] = useState(false);
	const [newUser, setNewUser] = useState(null);
	const { userIsAuthenticated } = useAppContext();
  const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password } = fields;
		setIsLoading(true);
		try {
      const user = await Auth.signUp({username, password});
      setNewUser(user);
			setIsLoading(false);
		} catch (e) {
			alert(e.message);
      userIsAuthenticated(false);
      setIsLoading(false);
		}
	};

  const handleConfirmationCode = async (e) => {
		e.preventDefault();
		const { username, confirmationCode } = fields;
		setIsLoading(true);
		try {
      const user = await Auth.confirmSignUp(username, confirmationCode);
      setNewUser(user);
			userIsAuthenticated(true);
			setIsLoading(false);
			history.push('/');
		} catch (e) {
			alert(e.message);
			userIsAuthenticated(false);
		}
  };

	const signUpForm = () => {
		return (
			<Form method='post' onSubmit={handleSubmit}>
				<fieldset disabled={isLoading} aria-busy={isLoading}>
					<h2>Sign up for an account</h2>
					{/* <Error error={error} /> */}
					<label htmlFor='email'>
						Full name
						<input
							type='text'
							name='name'
							placeholder='Full name'
							value={fields.name}
							onChange={change}
						/>
					</label>
					<label htmlFor='email'>
						Email
						<input
							type='email'
							name='username'
							placeholder='email'
							value={fields.username}
							onChange={change}
							autoComplete='email'
						/>
					</label>
					<label htmlFor='password'>
						Password
						<input
							type='password'
							name='password'
							placeholder='password'
							value={fields.password}
							onChange={change}
							autoComplete='new-password'
						/>
					</label>
					<label htmlFor='password'>
						Confirm password
						<input
							type='password'
							name='confirmPassword'
							placeholder='password'
							value={fields.confirmPassword}
							onChange={change}
							autoComplete='new-password'
						/>
					</label>

					<button type='submit'>Sign Up!</button>
				</fieldset>
			</Form>
		);
	};

	const confirmSignUp = () => {
		return (
			<Form method='post' onSubmit={handleConfirmationCode}>
				<fieldset disabled={isLoading} aria-busy={isLoading}>
					<h2>Confirmation Code</h2>
					{/* <Error error={error} /> */}
					<label htmlFor='code'>
            {' '}
						<input
							type='number'
							name='confirmationCode'
							placeholder='Enter code...'
							value={fields.confirmationCode}
							onChange={change}
						/>
					</label>

					<button type='submit'>Verify!</button>
				</fieldset>
			</Form>
		);
	};
	return newUser ? confirmSignUp() : signUpForm();
};

export default SignupForm;
