import { AppThunk } from '../store';
import { setUserData, setUserLoginStatusData } from './userSlice';
import AnchorLink from 'anchor-link';
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport';
import * as waxjs from '@waxio/waxjs/dist';
import mainData from '../../data.json';
import { LoginStatusType, WalletEnum } from '../types';
import { LoginApi } from '../../api/login.api';

export const loginThunk = (
  type: WalletEnum,
  selectedChain: any,
  navigate: any
): AppThunk => {
  return async (dispatch, getState) => {
    const userData = getState().user.userData;

    const transport = new AnchorLinkBrowserTransport();

    let newUserData = {
      loginType: userData.loginType,
      accountName: userData.accountName,
      anchorSession: userData.anchorSession,
      waxSession: userData.waxSession,
      nickname: '',
      balance: {},
      email: '',
    } as any;

    newUserData.loginType = type;

    newUserData.waxSession = new waxjs.WaxJS({
      rpcEndpoint: selectedChain,
    });

    if (type === 'wax') {
      await newUserData.waxSession.login('').then((data: any) => {
        newUserData.accountName = data;
      });
    } else {
      const anchorLink = new AnchorLink({
        transport,
        chains: [
          {
            chainId: mainData.anchorChainId,
            nodeUrl: mainData.anchorEndpoint,
          },
        ],
      });
      anchorLink.login('test').then((identity) => {
        const { session } = identity;
        newUserData.anchorSession = session;
        newUserData.accountName = session.auth.toString().split('@')[0];
      });
    }

    await newUserData.waxSession.rpc
      .get_currency_balance('eosio.token', newUserData.accountName, 'wax')
      .then((result: any) => {
        // console.log(result)
        newUserData.balance = result[0];
        // console.log(newUserData)
        // navigate('/');
        dispatch(setUserData(newUserData));
        // console.log(userData)
        dispatch(setUserLoginStatusData(LoginStatusType.new));
        dispatch(setUserData(newUserData));
        return true;
      });

      dispatch(setUserLoginStatusData(LoginStatusType.new));
      dispatch(setUserData(newUserData));



    LoginApi.getUser(newUserData.accountName).then((result: any) => {
      console.log(newUserData);
      console.log(result);
      if(result === undefined){

        dispatch(setUserLoginStatusData(LoginStatusType.new));
        dispatch(setUserData(newUserData));

      }
      switch (result?.status) {
        case 404: {
          dispatch(setUserLoginStatusData(LoginStatusType.new));
          dispatch(setUserData(newUserData));
          break;
        }
        case 403: {
          dispatch(setUserLoginStatusData(LoginStatusType.notAuthorized));
          newUserData.nickname = result.data.nickname;
          newUserData.email = result.data.email;
          dispatch(setUserData(newUserData));
          break;
        }
        case 200: {
          newUserData = { ...newUserData, nickname: result.data.nickname };
          newUserData.email = result.data.email;
          navigate('/');
          dispatch(setUserData(newUserData));
          break;
        }
      }
    });
  };
};

export const setNewUserThunk = (
  accountName: string,
  emailAddress: string,
  nickname: string
): AppThunk => {
  return async (dispatch, getState) => {
    LoginApi.setNewUser(accountName, emailAddress, nickname).then(
      async (result) => {
        if (result.status === 200) {
          await LoginApi.sendEmail(accountName, emailAddress, nickname);
        }
      }
    );
  };
};

export const confirmEmailThunk = (accountName: string): AppThunk => {
  return async (dispatch, getState) => {
    LoginApi.confirmEmail(accountName).then((result) => {
      if (result.status !== 200) {
        console.log('User already exist!');
      }
    });
  };
};
