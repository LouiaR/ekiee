import React from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
`;

const Layout = ({ children }) => {
	return (
		<div>
			<NavBar />
			<Main>{children}</Main>
		</div>
	);
};

export default Layout;
