import React from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { menu } from '../data';
import useCurrentPath from '../libs/useCurrentPath';
import { useAppContext } from '../libs/context';

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	border-bottom: 1px solid #f0f0f0;
	line-height: 5rem;
`;

const Item = styled.li`
	display: inline-block;
	font-size: 1.5rem;
	border-bottom: ${({ select }) => select && '1px solid red'};
	a {
		color: ${({ select }) => select && 'green'};
	}

	:hover {
		border-bottom: 1px solid red;
		a {
			color: green;
		}
	}
`;

const List = styled.ul`
	display: flex;
	${Item}:not(:last-child) {
		margin-right: 1rem;
	}
`;

const Nav = styled.nav``;

const Logo = styled.span`
	display: block;
	font-size: 1.8rem;
	letter-spacing: 0.25rem;
`;

const NavBar = () => {
	const current = useCurrentPath();
	const { isUserAuthenticated, userIsAuthenticated } = useAppContext();
	const history = useHistory();

	const logout = () => {
		Auth.signOut();
		userIsAuthenticated(false);
		history.push('/signin');
	};

	return (
		<Header>
			<h1>
				<Logo>
					<Link to='/'>Ekiee</Link>
				</Logo>
			</h1>
			<Nav>
				{isUserAuthenticated ? (
					<List onClick={logout}>
						<Item>Logout</Item>
					</List>
				) : (
					<List>
						{menu.map((item) => (
							<Item
								key={item.item.path}
								select={current.path === item.item.path}>
								<Link to={item.item.path}>{item.item.title}</Link>
							</Item>
						))}
					</List>
				)}
			</Nav>
		</Header>
	);
};

export default NavBar;
