import React, { useState } from 'react';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Container } from './styles';

export default function Login({ history }) {
	const [ username, setUserName ] = useState('');

    async function handleSubmit (e) {
        e.preventDefault();

		const response = await api.post('/devs',{username});

		const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<img src={logo} alt="logo" />
				<input
					placeholder="Digite seu usuário do github"
					value={username}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<button type="submit">Enviar</button>
			</form>
		</Container>
	);
}
