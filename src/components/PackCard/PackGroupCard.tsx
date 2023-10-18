import React, { FC, useState } from 'react';
import { Box, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { box_style, btnStyle } from "../NFTCard";
import { openPackThunk } from "../../redux/user/nftThunk";
import { useDispatch } from "react-redux";

type PackGroupCardType = {
	uri: string,
	name: string,
	userTemplateMints?: Array<{ assetId: string, mintId: number | string }>,
	collection_name: string
}

const PackGroupCard: FC<PackGroupCardType> = ({ uri, name, userTemplateMints, collection_name}) => {
	const [selectedAsset, changeAsset] = useState(userTemplateMints?.length ? userTemplateMints[0].assetId : [])
	const dispatch = useDispatch();

	return (
	 <Box key={uri} sx={box_style}>
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
			 <Box>
				 {userTemplateMints?.length ? (
					<Box style={{padding: '5px', color: 'white'}}>
						<FormControl fullWidth style={{color: "white"}}>
							<InputLabel sx={{
								color: "#fff",
							}} id="demo-simple-select-label">Mint</InputLabel>
							<Select
							 labelId="demo-simple-select-label"
							 id="demo-simple-select"
							 value={selectedAsset}
							 label="Mint"
							 sx={{
								 width: '100%',
								 height: 40,
								 marginRight: 15,
								 color: "white",
								 "& .MuiSvgIcon-root": {
									 color: "white",
								 },
							 }}
							 onChange={(event: any) => {
								 changeAsset(event.target.value);
							 }}
							>
								{userTemplateMints.map(item => (
								 <MenuItem value={item.assetId}>#{item.mintId}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				 ) : (
					<Box padding="14px 0">
						<Typography className="name" variant="h6" style={{ fontSize: "13px", width: "90%", margin: "auto" }} component="div" sx={{ flexGrow: 1 }}>
							No items found
						</Typography>
					</Box>
				 )}

			 </Box>
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
						 <Button
							onClick={() => {
								dispatch(openPackThunk(String(selectedAsset || ''), collection_name, null))
							}}
							disabled={!userTemplateMints?.length}
							sx={btnStyle}>
							 OPEN
						 </Button>
					 </Box>
				 </Grid>
			 </Grid>
		 </Box>
	 </Box>
	)
}

export default PackGroupCard;