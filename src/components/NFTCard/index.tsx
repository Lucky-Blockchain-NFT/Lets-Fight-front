import React, { useEffect } from "react";
import { useState } from "react";

import "./card.css";
import Button from '@mui/material/Button';
import { FormLabel, Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import StakeCardModal from "./StakeCardModal";
import { burnNftThunk } from "../../redux/user/nftThunk";

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
  // backgroundColor: "#ea923e",
  borderColor: "#d3b69a",
  borderRadius: "15px",
  fontSize: "10px"
}

export interface URIProp {
  uri: any,
  name: string,
  assetID: string,
  backed_tokens?: any,
  powerScore: any,
}

const NFTCard = ({ uri, name, assetID, backed_tokens, powerScore }: URIProp) => {
  const dispatch = useDispatch();

  //------------ for model start------------

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //------------ for model end------------

  const [itemBackTokens, setItemBackTokens] = useState(0);

  useEffect(() => {
    if (backed_tokens.length != 0) {
      const backItem = backed_tokens.find((item: any) => item.token_symbol === 'WAX')
      let tmp = parseInt(backItem.amount) / 100000000;
      tmp = Math.floor(tmp * 100) / 100;
      setItemBackTokens(tmp);
    }
  }, [backed_tokens])

  return (
    <Grid item xl={2.4} md={4} sm={6} xs={12} style={{marginBottom:"50px"}}>
    <Box sx={box_style}>
        <StakeCardModal
          open={open}
          handleClose={handleClose}
          assetID={assetID}
        />

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
        <Grid container style={{ justifyContent: "space-between", width: "90%", margin: "auto", marginTop: "5px" }}>
          <Grid item xs={5}>
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
              <Button sx={btnStyle} onClick={handleOpen}>STAKE</Button>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                bgcolor: '#ea923e',
                fontWeight: "bold",
                boxShadow: 1,
                borderRadius: 3,
                width: "100%",
                height: "77%",
                padding: "0",
                textAlign: "center"
              }}
            >
              <FormLabel style={{}} sx={btnStyle}>{itemBackTokens}</FormLabel>
            </Box>
          </Grid>

          <Grid item xs={5}>
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
              <Button sx={btnStyle} >PWS</Button>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
             sx={{
               bgcolor: '#ea923e',
               fontWeight: "bold",
               boxShadow: 1,
               borderRadius: 3,
               width: "100%",
               height: "77%",
               padding: "0",
               textAlign: "center"
             }}
            >
              <FormLabel style={{}} sx={btnStyle}>{!powerScore ? 0 : powerScore}</FormLabel>
            </Box>
          </Grid>

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
                dispatch(burnNftThunk(assetID))
              }}>BURN</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Grid>
  );
};

export default NFTCard;