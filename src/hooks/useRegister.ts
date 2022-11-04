import { IUser } from '@user-types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { dataEndPoint } from '../helpers/misc/config';

export const useRegister = () => {
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [userData, setUserData] = useState<IUser>();
	const [error, setError] = useState<string>('');

	const provideDetails = (name: string, email: string, password: string) => {
		setEmail(email);
		setPassword(password);
		setName(name);
	};

	useEffect(() => {
		if (email && password && name) {
			axios
				.post(`${dataEndPoint}/api/v1/users`, { name, email, password })
				.then((res: AxiosResponse) => {
					if (res.status === 201) {
						setUserData({ name, email, password });
					}
				})
				.catch((err: AxiosError) => {
					console.log(err);
					if (err.response?.status === 409) {
						setError('Email already taken');
					} else if (
						err.response?.status === 400 ||
						err.response?.status === 500
					) {
						setError('Something went wrong, please try again');
					} else {
						setError(err.message);
					}
				});
		}
	}, [email, name, password]);

	return { userData, provideDetails, error };
};
