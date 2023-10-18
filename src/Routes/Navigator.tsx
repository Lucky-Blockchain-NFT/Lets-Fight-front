import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navigator = () => {
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/profile");
		} else {
			navigate("/wallet-manage");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return null;
};

export default Navigator