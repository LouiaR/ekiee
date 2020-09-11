import React from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { useUserContext } from './libs/userContext';

function NavBar({ handleLogout }) {
	const { isUserAuth } = useUserContext();

	return (
		<>
			<Navbar fluid collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to='/'>Scratch</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						{isUserAuth ? (
							<NavItem onClick={handleLogout}>Logout</NavItem>
						) : (
							<>
								<LinkContainer to='/signup'>
									<NavItem>Signup</NavItem>
								</LinkContainer>
								<LinkContainer to='/signin'>
									<NavItem>Login</NavItem>
								</LinkContainer>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

export default NavBar;
