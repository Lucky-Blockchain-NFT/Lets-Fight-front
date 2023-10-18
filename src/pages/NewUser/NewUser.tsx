import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { confirmEmailThunk } from "../../redux/user/loginThunk";

const NewUser = () => {
	const { wallet } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (wallet) {
			dispatch(confirmEmailThunk(wallet));
			setTimeout(() => {
				navigate('/wallet-manage')
			}, 2000)
		}
	}, [])

	return (
	 <h2 style={{ color: 'white', textAlign: 'center' }}>
	 		You will be redirected soon...
	 </h2>
	)
}

export default NewUser;