import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useFetching = async action => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action());
	}, [dispatch, action]);
};