import React, { useEffect } from "react";
import { useState } from "react";
import "../NFTCard/card.css"
import Button from '@mui/material/Button';
import {  Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
// import { burnNftThunk, openPackThunk } from "../../redux/user/nftThunk";
import { openPackThunk } from "../../redux/user/nftThunk";

export const box_style = {
	display: "flex",
	justifyContent: "space-between",
	flexDirection: "column",
	margin: "auto",
	height: "100%",
	maxWidth: "200px",
	width: "70%",
	p: 2,
	padding: "10px 5px 10px 5px",
	bgcolor: '#1a1f3c',
	borderRadius: 4,
	border: "2px solid",
	backgroundImage: "radial-gradient(circle, #5c0067 0%, #06313a 100%)",
}

export const btnStyle = {
	width: "100%",
	minWidth:"2px",
	color: "white",
	height: "100%",
	fontWeight: "bold",
	borderColor: "#d3b69a",
	borderRadius: "15px",
	fontSize: "10px"
}

export interface URIProp {
	uri: any,
	name: string,
	assetID: string,
	backed_tokens?: any,
	template_mint: any,
	templateId: string,
	collection_name: string
}

const NFTPackCard = ({ uri, name, assetID, backed_tokens, template_mint, templateId, collection_name }: URIProp) => {
	const dispatch = useDispatch();

	//------------ for model start------------

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//------------ for model end------------

	const [itemBackTokens, setItemBackTokens] = useState(0);

	useEffect(() => {
		if (backed_tokens && backed_tokens.length != 0) {
			let tmp = parseInt(backed_tokens[0].amount) / 100000000;
			tmp = Math.floor(tmp * 100) / 100;
			setItemBackTokens(tmp);
		}
	}, [backed_tokens])


	return (
	 <Grid xl={2.4} md={4} sm={6} xs={12} style={{marginBottom:"50px"}}>
		 <Box sx={box_style}>
			 <Box style={{ width: "100%", margin: "auto" }}>
				 <Box sx={{ width: "90%", textAlign: "center", margin: "auto" }}>
					 <img style={{ width: "100%", borderRadius: "16px" }} src={uri} alt="card" />
				 </Box>
			 </Box>
			 <Box style={{ width: "100%", margin: "auto", marginBottom: "0px" }}>
				 <Box>
					 <Typography className="name" variant="h6" style={{ fontSize: "13px", width: "90%", margin: "auto" }} component="div" sx={{ flexGrow: 1 }}>
						 {name}
					 </Typography>
				 </Box>
				 {/*<Grid item xs={12}>*/}
					 <Box
						sx={{
							fontWeight: "bold",
							boxShadow: 1,
							borderRadius: 3,
							width: "90%",
							padding: '4px',
							border: '1px solid white',
							margin: '4px auto 12px auto'
						}}
					 > <Typography className="name" variant="h6" style={{ fontSize: "13px", width: "90%", margin: "auto" }} component="div" sx={{ flexGrow: 1 }}>
						 Mint #{template_mint}
					 </Typography>
					 </Box>
				 {/*</Grid>*/}
				 <Grid container style={{ justifyContent: "space-between", width: "90%", margin: "auto", marginTop: "5px" }}>
					 <Grid item xs={12}>
						 <Box
							sx={{
								bgcolor: '#ea923e',
								fontWeight: "bold",
								boxShadow: 1,
								borderRadius: 3,
								width: "100%",
								height: "70%"
							}}
						 >
							 <Button sx={btnStyle} onClick={() => {
								 dispatch(openPackThunk(assetID, collection_name, templateId))
							 }}>Open</Button>
						 </Box>
					 </Grid>
				 </Grid>
			 </Box>
		 </Box>
	 </Grid>
	);
};

export default NFTPackCard;