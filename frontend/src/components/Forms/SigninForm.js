import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import Form from '../styles/Form';
import { useFields } from '../../libs/useFields';
import { useAppContext } from '../../libs/context';

export const SigninForm = () => {
	const { fields, change } = useFields();
	const { userIsAuthenticated } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password } = fields;
		setIsLoading(true);
		try {
			const user = await Auth.signIn(username, password);
			userIsAuthenticated(true);
			setIsLoading(false);
			history.push('/');
		} catch (e) {
			alert(e.message);
			userIsAuthenticated(false);
			setIsLoading(false);
		}
	};

	return (
		<Form method='post' onSubmit={handleSubmit}>
			<fieldset disabled={isLoading} aria-busy={isLoading}>
				<h2>Sign into your account</h2>
				{/* <Error error={error} /> */}
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

				<button type='submit'>Sign In!</button>
			</fieldset>
		</Form>
	);
};

// 9AphG9pTsmLbiq3
