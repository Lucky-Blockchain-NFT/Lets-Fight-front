import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DropDown from "../DropDown/DropDown";
import './navbar.css';
import discordSvg from '../../image/icon-discord.svg';
import telegramSvg from '../../image/icon-telegram.svg';
import mediumPng from '../../image/medium.png';
import { RootState } from "../../redux/store";

const pages = [
  { page: 'Fighters', link: '/fighters' },
  { page: 'Arsenal', link: '/arsenal' },
  { page: 'Arena', link: '/arena' },
  { page: 'Leaderboard', link: '/leaderboard' },
  { page: 'Hall of fame', link: '/hall' },
  { page: 'Packs', link: '/packs' },
  { page: 'Staking', link: '/staking' }
];

const Header = () => {
  const userAccount = useSelector((state: RootState) => state.user.userData)
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
  const navigate = useNavigate();

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectCity, setSelectCity] = useState<string>("");
  const cities = () => {
    return ["My Profile", "My Inventory", "My Listings", "My Auctions"];
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  const citySelection = (city: string): void => {
    setSelectCity(city);
  };

  const handleHeaderLink = (page: string) => {

    switch (page) {
      case '/':
        navigate("/");
        break;
      case 'Fighters':
        navigate("/fighters");
        break;
      case 'Arsenal':
        navigate("/arsenal");
        break;
      case 'Arena':
        window.open("https://doc.unicial.org");
        break;
      case 'Leaderboard':
        window.open("https://blog.unicial.org");
        break;
      case 'Hall of fame':
        window.open("https://blog.unicial.org");
        break;
      case 'Packs':
        navigate("/packs");
        break;
      case 'Staking':
        window.open("https://blog.unicial.org");
        break;
      case 'Wallet-manage':
        navigate("/wallet-manage");
        break;
    }
  };

  // console.log(isLoggedIn)

  return (
    <Box className = "Navbar" sx={{ flexGrow: 1 }} style={{ position: "sticky", top: 0, zIndex: "100" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography className="logo" variant="h6" component="div" >
            <span onClick={(e) => handleHeaderLink('/')}>LET's FIGHT</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 3 }}>
            {pages.map((item) => (
              <Button
                className={(window.location.href.includes(item.link) ? 'selected' : '')}
                key={item.page}
                sx={{ my: 2, color: 'white', display: 'block', mr: 1 }}
                onClick={(e) => handleHeaderLink(item.page)}
              >
                {item.page}
              </Button>
            ))}
          </Box>
          <Box sx={{ marginRight: 2, display: "flex" }}>
            <a href="https://medium.com/" className="outside_icon">
              <img style={{ borderRadius: "73%" }} src={mediumPng} alt="icon medium" />
            </a>
            <a href="https://https://discord.com/" className="outside_icon">
              <img src={discordSvg} alt="icon discord" />
            </a>
            <a href="https://web.telegram.org/" className="outside_icon">
              <img src={telegramSvg} alt="icon telegram" />
            </a>
             <div style={{ marginTop: "5px", marginLeft: "10px" }}>{userAccount?.balance}</div>
          </Box>

          {isLoggedIn ? (
           <button
            className={showDropDown || window.location.href.includes('/profile') ? "active selected" : ''}
            onClick={() => toggleDropDown()}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
             dismissHandler(e)
            }
           >
             {(userAccount.nickname == "" ? userAccount.accountName : userAccount.nickname)}
             {showDropDown && (
              <DropDown
               cities={cities()}
               showDropDown={false}
               toggleDropDown={(): void => toggleDropDown()}
               citySelection={citySelection}
              />
             )}
           </button>
          ) : (
           <Button
            className={window.location.href.includes('/wallet-manage') ? 'selected ' : ''}
            sx={{ my: 2, color: 'white', display: 'block', mr: 1 }}
            onClick={() => handleHeaderLink('Wallet-manage')}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
             dismissHandler(e)
            }
           >
             Connect
           </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;