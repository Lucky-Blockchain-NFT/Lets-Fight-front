import { InputType, UserDataType, WalletEnum } from "../redux/types";

export const sendTransaction = (config: { userData: UserDataType, action: any, inputType: InputType }) => {
	const { userData, action, inputType } = config;
	if (userData.loginType === WalletEnum.anchor) {
		userData.anchorSession.transact({ action })
		return userData.anchorSession.transact({ action });
	} else {
		let actionToUse = [action];
		if (inputType === InputType.array) {
			actionToUse = action;
		}

		return userData.waxSession.api.transact({ actions: actionToUse}, {
			blocksBehind: 3,
			expireSeconds: 1200,
		});
	}
};