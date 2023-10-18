import { FC } from "react";
import styles from "./Profile.module.scss";
import { Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { WalletEnum } from "../../redux/types";
import { setIsLoggedIn } from "../../redux/user/userSlice";

export interface ProfilePropsType {

}

export const Profile: FC<ProfilePropsType> = ({ }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userAccount = useSelector((state: RootState) => state.user.userData)
  let nick = userAccount.nickname

  const onChangeEvent = (e:any) => {
    nick = e.target.value
  }

  const logout = () => {
    window.location.reload();
  }

  const onSave = () => {
    userAccount.nickname = nick;
  }

  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <div className={styles.profile_header}>
          <h2>Profile</h2>
          <Button variant="contained" color="error" onClick={logout}>DISCONNECT</Button>
        </div>

        <div className={styles.profile_contents}>
          <div className={styles.profile_avatar}>
            <img src = "/image/profile.svg"/>
          </div>
          <div className={styles.profile_text}>
            <div>
              <p>Wallet Address</p>
              <TextField
                id="outlined-number"
                label="Wallet Address"
                type="text"
                value = {userAccount.accountName}
                sx={{width:"100%", color:"red"}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{display: "flex"}}>
              <div className={styles.profile_email}>
                <p>Email</p>
                <TextField
                  id="outlined-number"
                  label="Email"
                  type="text"
                  sx={{width:"100%"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value = {userAccount.email}
                />
              </div>
              <div className={styles.profile_nickname}>
                <p>NickName</p>
                <TextField
                  id="outlined-number"
                  label="NickName"
                  type="text"
                  value = {userAccount.nickname}
                  onChange={onChangeEvent}
                  sx={{width:"100%"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profile_footer}>
          <Button variant="contained" color="warning">RESEND VERIFICATION EMAIL</Button>
          <Button variant="contained" color="error" sx={{marginLeft:"20px"}} onClick={onSave}>SAVE</Button>
        </div>

      </section>
      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>
          © Copyright 2022 Let's Fight
        </p>
      </footer>
    </main>
  );
};
