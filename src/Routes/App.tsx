import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import { Dashboard } from "../pages/Dashboard";
import { Fighters } from "../pages/Fighters";
import { Profile } from "../pages/Profile";
import { Registration } from "../pages/Registeration";
import { WalletManager } from "../pages/WalletManager";
import PacksPage from "../pages/Packs/Packs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Navigator from "./Navigator";
import NewUser from "../pages/NewUser/NewUser";
import Arsenal from "../pages/Arsenal/Arsenal";

export const App = () => {
  const userData = useSelector((state: RootState) => state.user.userData);

  return (
    <>
      <Header />
      <Routes>
        <Route
         path="/new-user/:wallet"
         element={<NewUser />}
        />
        <Route
         path="/"
         element={<Dashboard/>}
        />
        <Route
         path="/fighters"
         element={!userData.accountName ? <Navigator /> : <Fighters />}
        />
        <Route
          path="/profile"
          element={!userData.accountName ? <Navigator /> : <Profile />}
        />
        <Route
          path="/arsenal"
          element={!userData.accountName ? <Navigator /> : <Arsenal />}
        />
        <Route
         path="/reg"
         element={<Registration />}
        />
        <Route
         path="/packs"
         element={!userData.accountName ? <Navigator /> : <PacksPage />}
        />
        <Route
         path="/wallet-manage"
         element={<WalletManager />}
        />
        <Route path="*" element={<Navigator />} />
      </Routes>
    </>
  );
};
