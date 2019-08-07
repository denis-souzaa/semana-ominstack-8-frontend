import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

import { Container, Action, Empty } from './styles';

export default function Main({ match }) {
	const [ users, setUsers ] = useState([]);

	useEffect(
		() => {
			async function loadUsers() {
				const response = await api.get('/devs', {
					headers: {
						user: match.params.id
					}
				});

				setUsers(response.data);
			}

			loadUsers();
		},
		[ match.params.id ]
	);

	async function handleLike(id) {
		await api.post(`/devs/${id}/likes`, null, {
			headers: {
				user: match.params.id
			}
		});

		updateUsers(id);
	}

	async function handleDislike(id) {
		await api.post(`/devs/${id}/dislikes`, null, {
			headers: {
				user: match.params.id
			}
		});
		updateUsers(id);
	}

	function updateUsers(id) {
		setUsers(users.filter((user) => user._id !== id));
	}

	return (
		<Container>
			<Link to="/">
				<img src={logo} alt="logo" />
			</Link>

			{users.length > 0 ? (
				<ul>
					{(users || []).map((user) => (
						<li key={user._id}>
							<img src={user.avatar} alt={user.name} />
							<footer>
								<strong>{user.name}</strong>
								<p>{user.bio}</p>
							</footer>
							<Action>
								<button type="button" onClick={() => handleDislike(user._id)}>
									<img src={dislike} alt="" />
								</button>
								<button type="button" onClick={() => handleLike(user._id)}>
									<img src={like} alt="" />
								</button>
							</Action>
						</li>
					))}
				</ul>
			) : (
				<Empty>Acabou :(</Empty>
			)}
		</Container>
	);
}
