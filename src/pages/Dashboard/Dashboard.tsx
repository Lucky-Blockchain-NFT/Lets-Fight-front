import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { Box, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getDropsThunk } from "../../redux/user/dropsThunk";
import { RootState } from "../../redux/store";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { buyDropThunk, openPackThunk } from "../../redux/user/nftThunk";
import { btnStyle } from "../../components/PackCard/PackCard";
import { CssTextField } from "../WalletManager/WalletManager";

export const Dashboard = () => {
  const dispatch = useDispatch()
  const dropsData = useSelector((state: RootState) => state.user.dropsData) as any
  const [dropItems, setDropItems] = useState(1)

  const handleOnChange = (event: any) => {
    setDropItems(event.target.value)
  }

  useEffect(() => {
    dispatch(getDropsThunk())
  }, [])

  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <div className={styles.mainbg}>
          <img src="/image/main_image.png"/>
        </div>
        <div className={styles.effects}>
          <div>
            <img src="/image/left_main.png"/>
          </div>
          <div className={styles.btn_confirm}>
            <Button >&nbsp;</Button>
          </div>
          <div>
            <img src="/image/right_main.png"/>
          </div>
        </div>
      </section>

      <section style={{
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        width: "90%"
      }}>
        <h1  style={{
          alignSelf: "center"
        }}>Let`s fight Shop</h1>

        <h3 style={{
          padding: "30px 0 40px 0",
          alignSelf: "center"
        }}>After you purchase your Let`s fight pack, you can open it at Pack page</h3>

        {dropsData.map((drop: any) => {
          return (
             <Grid key={drop.display_data.description + drop.img} container style={{ backgroundColor: "rgb(26, 32, 60)",
               padding: "16px 24px",
               margin: '24px',
               width: '49%',
               justifyContent: "space-between",
             }}>
               <Grid item xs={5}>
                 <img srcSet={drop.img} alt={''}/>
               </Grid>
               <Grid item xs={6}>
                 <Typography
                  className="name"
                  variant="h3"
                  style={{ fontSize: "22px", width: "100%", margin: "auto", fontWeight: "bold", marginBottom: "16px" }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                 >
                   {drop.display_data.name}
                 </Typography>

                 <Typography
                  className="name"
                  variant="h4"
                  style={{ fontSize: "18px", width: "100%", margin: "auto", fontWeight: "bold" }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                 >
                   Price: {drop.listing_price}
                 </Typography>

                 <Typography
                  className="name"
                  variant="h4"
                  style={{ fontSize: "18px", width: "100%", margin: "auto", fontWeight: "bold" }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                 >
                   Available: {drop.max_claimable - drop.current_claimed} / {drop.max_claimable}
                 </Typography>

                 <Typography
                  className="name"
                  variant="h4"
                  style={{ fontSize: "18px", width: "100%", margin: "auto", fontWeight: "bold" }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                 >
                   Ending: {moment.utc(drop.end_time * 1000).format("DD/MM/YYYY hh:mm")} UTC
                 </Typography>

                 <Typography
                  className="name"
                  variant="h4"
                  style={{ marginTop: '20px', fontSize: "15px", width: "100%", margin: "auto" }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                 >
                   {drop.display_data.description}
                 </Typography>
               </Grid>
               <Grid item xs={5} style={{display: "flex"}}>
                 <CssTextField
                  label='Count'
                  sx={{ input: { color: 'white' }, "& label": {color: "white !important"} }}
                  style={{width: "30%", margin: "auto", alignSelf: "center"}}
                  value={dropItems}
                  onChange={handleOnChange}
                 />
               </Grid>
               <Grid item xs={6}>
                 <Box
                  sx={{
                    bgcolor: '#ea923e',
                    fontWeight: "bold",
                    boxShadow: 1,
                    borderRadius: 3,
                    width: "100%",
                    margin: "16px auto",
                    height: "70%"
                  }}
                 >
                   <Button sx={btnStyle} onClick={() => {dispatch(buyDropThunk(drop, dropItems))
                   }}>Buy</Button>
                 </Box>
               </Grid>
             </Grid>
          )
        })}
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>
          © Copyright 2022 Let's Fight
        </p>
      </footer>
    </main>
  );
};
