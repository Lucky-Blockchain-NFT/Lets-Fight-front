import styles from './WalletManager.module.scss';
import { Box, Button, Grid, Modal, Typography, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, setNewUserThunk } from '../../redux/user/loginThunk';
import { LoginStatusType, WalletEnum } from '../../redux/types';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useForm, Controller } from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
// import { withStyles } from '@material-ui/core';
// import { setUserData } from '../../redux/user/userSlice';
import CloseSvg from '../../image/close.svg';

export const CssTextField = styled(MuiTextField)({
  root: {
    'MuiInputBase-input': {
      color: 'white !important',
    },
    '& label.Mui': {
      color: 'white !important',
    },
    '& label.Mui-focused': {
      color: 'white !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white !important',
    },
    '& label..Mui-disabled': {
      color: 'white !important',
    },
    '& .MuiInput-underline.Mui-disabled:after': {
      borderBottomColor: 'white !important',
    },
    '& .MuiOutlinedInput-root': {
      '& .Mui-disabled': {
        borderColor: 'white !important',
        color: 'white !important',
        '-webkit-text-fill-color': 'white !important',
      },
      '&.Mui-disabled fieldset': {
        borderColor: 'white !important',
        color: 'white !important',
      },
      '& fieldset': {
        borderColor: 'white !important',
        color: 'white !important',
      },
      '&:hover fieldset': {
        borderColor: 'white !important',
        color: 'white !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white !important',
        color: 'white !important',
      },
      '& .Mui-disabled fieldset': {
        borderColor: 'white !important',
        color: 'white !important',
        '-webkit-text-fill-color': 'white !important',
      },
      '&:hover .Mui-disabled fieldset': {
        borderColor: 'white !important',
        color: 'white !important',
        '-webkit-text-fill-color': 'white !important',
      },
    },
  },
});

const StyledButton = styled(Button)({
  color: 'white',
  backgroundColor: '#ea923e',
  border: '1px solid #ea923e',
  '&.Mui-selected, &:hover': {
    color: 'white',
    backgroundColor: '#ea923e',
    filter: 'brightness(0.9)',
    border: '1px solid black',
  },
});

const style = {
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
  textAlign: 'center',
  borderRadius: '16px',
  p: 4,
};

const errorText = {
  email: {
    required: 'Email is Required',
    pattern: 'Invalid Email Address',
  },
} as any;

export const WalletManager = () => {
  const [firstCheckBox, setFirstCheckBox] = useState(false);
  const [secondCheckBox, setSecondCheckBox] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);

  const navigate = useNavigate();
  const [showModal, changeShowModal] = useState(true);
  const [isRequestSend, changeRequestSend] = useState(false);
  const userLoginStatus = useSelector(
    (state: RootState) => state.user.userLoginStatus
  );
  const userData = useSelector(
    (state: RootState) => state.user.userData
  ) as any;
  const dispatch = useDispatch();

  const firstCheckBoxHandleOnChange = (event: any) => {
    setFirstCheckBox(event.target.checked);
  };

  const secondCheckBoxHandleOnChange = (event: any) => {
    setSecondCheckBox(event.target.checked);
  };

  const { control, register, handleSubmit } = useForm({
    reValidateMode: 'onBlur',
  });

  const image_style = {
    width: '30px',
    marginRight: '12px',
  };

  const handleOnSubmit = (data: any) => {
    // debugger;
    dispatch(setNewUserThunk(data.wallet, data.email, data.nickname));
    changeRequestSend(true);
    // setTimeout(() => {
    //   changeShowModal(false);
    //   changeRequestSend(false);
    //   window.location.reload();
    // }, 2500);
  };

  const cancelModalHandler = () => {
    // const emptyUser = {
    //    loginType: WalletEnum.wax,
    //    accountName: '',
    //    anchorSession: {},
    //    waxSession: {},
    //    nickname: "",
    //    balance: '',
    //    email: ""
    // }
    // dispatch(setUserData(emptyUser));
    // changeShowModal(false);
    // changeRequestSend(false);
    window.location.reload();
  };

  console.log(userLoginStatus !== LoginStatusType.authorized &&
      userLoginStatus !== null &&
      showModal &&
      userData?.accountName)
  console.log(userLoginStatus, 'userLoginStatus')
  // console.log(LoginStatusType.authorized, 'LoginStatusType.authorized')
  // console.log(showModal, 'showModal')
  // console.log(userData, 'userData')

  useEffect(() => {
    // Trigger a re-render when userLoginStatus changes
    setForceRerender(!forceRerender);
    console.log(userLoginStatus)
  }, [userLoginStatus]);

  return (
    <main className={styles.main}>
      {
        userLoginStatus !== LoginStatusType.authorized &&
        userLoginStatus !== null &&
        showModal &&
        userData?.accountName &&
        (
          <Modal
            open
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              component="form"
              sx={style}
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              {!isRequestSend ? (
                <>
                  <Grid container spacing={3}>
                    <Grid style={{ position: 'relative' }} item xs={12}>
                      <Typography
                        id="modal-modal-title"
                        variant={'h6'}
                        color="white"
                        fontWeight={'bold'}
                      >
                        Complete Your Profile
                        <img
                          onClick={() => cancelModalHandler()}
                          style={{
                            width: '30px',
                            position: 'absolute',
                            right: '-20px',
                            top: '6px',
                            cursor: 'pointer',
                          }}
                          src={CloseSvg}
                          alt=""
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        id="modal-modal-title"
                        variant={'subtitle1'}
                        align="left"
                        color="white"
                      >
                        Your email address is only used for receiving important
                        updates. Your nickname will be seen by other players.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CssTextField
                        sx={{
                          input: { color: 'white' },
                          '& label': { color: 'white !important' },
                        }}
                        disabled={userData?.accountName}
                        {...register('wallet', {
                          value: userData?.accountName,
                          required: true,
                          maxLength: 35,
                        })}
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Wallet"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        control={control}
                        name="email"
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern:
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        }}
                        render={({ field, fieldState: { error } }: any) => (
                          <CssTextField
                            sx={{
                              input: { color: 'white !important' },
                              '& label': { color: 'white' },
                            }}
                            required
                            {...field}
                            type="email"
                            fullWidth
                            label="Email"
                            error={error !== undefined}
                            helperText={
                              error ? errorText.email[error.type] : ''
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CssTextField
                        sx={{
                          input: { color: 'white !important' },
                          '& label': { color: 'white' },
                        }}
                        {...register('nickname', {
                          required: false,
                          maxLength: 35,
                        })}
                        autoComplete="given-name"
                        name="nickname"
                        required={false}
                        fullWidth
                        id="Nickname"
                        label="Nickname"
                      />
                    </Grid>

                    <Grid style={{ textAlign: 'left' }} item xs={12}>
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            value={firstCheckBox}
                            onChange={firstCheckBoxHandleOnChange}
                          />
                        }
                        label={
                          <div>
                            I confirm that I am 18 years or over and I agree to
                            the&nbsp;
                            <a
                              style={{
                                color: 'white',
                                textDecoration: 'underline',
                              }}
                              href={'https://google.com'}
                            >
                              terms and conditions
                            </a>
                          </div>
                        }
                        labelPlacement="end"
                      />
                    </Grid>

                    <Grid style={{ textAlign: 'left' }} item xs={12}>
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            value={secondCheckBox}
                            onChange={secondCheckBoxHandleOnChange}
                          />
                        }
                        label="I agree to receive newsletters and promotional emails"
                        labelPlacement="end"
                      />
                    </Grid>

                    <Grid style={{ textAlign: 'center' }} item xs={12}>
                      <StyledButton
                        variant="outlined"
                        type="submit"
                        disabled={!firstCheckBox || !secondCheckBox}
                      >
                        Submit
                      </StyledButton>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <h2 style={{ textAlign: 'center' }}>Check your email</h2>
              )}
            </Box>
          </Modal>
        )}

      <section className={styles.section}>
        <div className={styles.leftside}>
          <h1>New To Blockchain?</h1>
          <Box sx={{ maxWidth: '80%', margin: 'auto' }}>
            You need to create an account to play Let's-Fight
          </Box>

          <div className={styles.wallet_connect}>
            <Button variant="contained" color="error" className={styles.button}>
              CREATE ACCOUNT
            </Button>
          </div>
        </div>
        <div className={styles.rightside}>
          <h1>Advanced Players</h1>
          <Box sx={{ maxWidth: '80%', margin: 'auto' }}>
            Please connect to your wallet and login your Let's-Fight account
          </Box>

          <div className={styles.wallet_connect}>
            <Button
              onClick={() =>
                dispatch(
                  loginThunk(
                    WalletEnum.wax,
                    'https://wax.greymass.com',
                    navigate
                  )
                )
              }
              variant="contained"
              color="warning"
              className={styles.button}
            >
              <img src="/image/walleticon/wax.png" alt="" style={image_style} />
              CLOUD WALLET
            </Button>
          </div>
          <div className={styles.wallet_connect}>
            <Button
              variant="contained"
              color="primary"
              className={styles.button}
            >
              <img
                src="/image/walleticon/anchor.png"
                alt=""
                style={image_style}
              />
              ANCHOR
            </Button>
          </div>
          <div className={styles.wallet_connect}>
            <Button variant="contained" color="info" className={styles.button}>
              <img
                src="/image/walleticon/scatter.png"
                alt=""
                style={image_style}
              />
              SCATTER
            </Button>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>© Copyright 2022 Let's Fight</p>
      </footer>
    </main>
  );
};
