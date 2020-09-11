import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useCurrentPath = () => {
	let history = useHistory();
	const [path, setPath] = useState('home');

	const setRoute = () => {
		const location = window.location.href.split('/');
		const pathName = location[location.length - 1];
		setPath(pathName ? pathName : 'home');
	};

	useEffect(() => {
		history.listen((location) => {
      const path = location.pathname.substring(1) || 'home';
			setPath(path);
		});
		setRoute();
	}, [history]);
	return { path };
};

export default useCurrentPath;
