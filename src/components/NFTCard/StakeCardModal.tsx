import React, { FC, useState } from 'react'
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { addBackTokenThunk } from "../../redux/user/nftThunk";

const modal_style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#1a203c',
	color: 'white',
	border: '4px solid #000',
	boxShadow: 24,
	borderColor: '#ea923e',
	textAlign: "center",
	borderRadius: "16px",
	p: 4,
};

type StakeCardModalType = {
	open: boolean,
	handleClose: any,
	assetID: any
}

const StakeCardModal: FC<StakeCardModalType> = ({ open, assetID, handleClose }) => {
	const [backTokensAmountInput, setBackTokensAmount] = useState(0);
	const dispatch = useDispatch();
	const changeInputValue = (event: any) => {
		const value = event.target.value;
		if (value >= 0) {
			setBackTokensAmount(value);
		}
	};

	const backToken = () => {
		if (backTokensAmountInput === 0) {
			alert("please set stake amount");
			return ;
		}
		dispatch(addBackTokenThunk(backTokensAmountInput, assetID))

		handleClose();
	}

	return (
	 <Modal
		open={open}
		onClose={handleClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	 >
		 <Box sx={modal_style}>
			 <Typography id="modal-modal-title" variant="h6" component="h2">
				 Type stake amounts
			 </Typography>
			 <Typography id="modal-modal-description" sx={{ mt: 5 }}>
				 <TextField
					style={{color:"white"}}
					id="outlined-number"
					label="Number"
					type="number"
					value={backTokensAmountInput}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={changeInputValue}
				 />
			 </Typography>
			 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
				 <Button
					variant="outlined"
					sx={{ mr: 2 }}
					onClick={handleClose}>
					 Cancel
				 </Button>

				 <Button
					variant="contained"
					onClick={() => backToken()}>
					 Confirm
				 </Button>
			 </Typography>
		 </Box>
	 </Modal>
	)
}

export default StakeCardModal