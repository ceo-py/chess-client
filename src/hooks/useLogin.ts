import { IUserDetails, IUserResponse } from '@user-types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { decode } from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { dataEndPoint } from '../helpers/misc/config';

export const useLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [userData, setUserData] = useState<IUserDetails>();
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const provideDetails = (email: string, password: string) => {
		setEmail(email);
		setPassword(password);
	};

	useEffect(() => {
		if (email && password) {
			setLoading(true);
			axios
				.post(`${dataEndPoint}/api/v1/login`, { email, password })
				.then((res: AxiosResponse) => {
					const decodedToken = decode(
						res.data.access_token
					) as IUserResponse;
					setUserData({
						name: decodedToken.name,
						email: decodedToken.email,
						token: res.data.access_token,
					});
					sessionStorage.setItem('name', JSON.stringify(decodedToken.name));
					sessionStorage.setItem('email', JSON.stringify(decodedToken.email));
					sessionStorage.setItem('token', JSON.stringify(res.data.access_token));
					setLoading(false);
				})
				.catch((err: AxiosError) => {
					if (err.response?.status === 401) {
						setError('Incorrect credentials');
					} else if (
						err.response?.status === 400 ||
						err.response?.status === 500
					) {
						setError('Something went wrong, please try again');
					} else {
						setError(err.message);
					}
					setLoading(false);
				});
		}
	}, [email, password]);

	return { userData, provideDetails, error, loading };
};
