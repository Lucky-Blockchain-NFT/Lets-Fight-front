import React, { useEffect, useState } from "react";
import styles from "./Fighters.module.scss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Grid } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import NFTCard from "../../components/NFTCard";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { filterFighters } from "../helpers";
import  { btnStyle } from "../../components/PackCard/PackCard";
import { retrieveAssetsThunk } from "../../redux/user/assetsThunk";
import { RetrieveType } from "../../redux/types";

const filterData = [
  {
    value: "series",
    data: ["series1", "promo"]
  },
  {
    value: "name",
    data: ["Name", "Ryu", "Chun-Li", "Nash", "M. Bison", "Cammy", "Birdie", "Ken", "Necalli", "Vega", "R. Mika", "Gill", "Rashid", "Karin", "Zangief", "Laura", "Dhalsim", "F.A.N.G", "Alex", "Guile", "Ibuki", "Balrog", "Juri", "Urien", "Akuma", "Kolin", "Ed", "Abigail", "Menat", "Zeku", "Sakura", "Blanka", "Falke", "Cody", "G", "Sagat", "Seth", "E. Honda", "Poison", "Kage", "Lucia"]
  },
  {
    value: "rarity",
    data: ["Rarity", "Golden", "Build", "Base", "Foil", "Battle", "Weld", "Action", "Collector's Edition"]
  },
  {
    value: "powerscore",
    data: ["Powerscore", "1", "2", "3", "4", "5"]
  },
  {
    value: "class-card",
    data: ["Class Card", "Class - Base", "Class - Foil", "Class - Weld", "Class - Battle", "Class - Action", "Class - Collector's Edition"]
  },
];

export const Fighters = () => {
  const [filters, setFilters] = useState(filterData.map(filter => filter.data[0]));
  const [showSimpleNft, changeSimpleNftShow] = useState(false);
  const [currentPortionToShow, changeCurrentPortionToShow] = useState(25);
  const unStakedList = useSelector((state: RootState) => state.user.fighters) as any
  const userData = useSelector((state: RootState) => state.user.userData) as any

  const [showNFTs, setShowNFTs] = useState<any>([]);
  const dispatch = useDispatch();

  const handleChangeCheck = () => {
    const nextStatus = !showSimpleNft;
    if (nextStatus) {
      const newNftList = showNFTs.filter((nft: any) => nft.backed_tokens.length);
      setShowNFTs(newNftList);
    } else {
      const newList = filterFighters(unStakedList, filters)
      setShowNFTs(newList);
    }

    changeSimpleNftShow(nextStatus);
  };

  useEffect(() => {
    if (userData.accountName) {
      dispatch(retrieveAssetsThunk(RetrieveType.fighters))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let uriPrefix = "https://dweb.link/ipfs/";

  useEffect(() => {
    setShowNFTs(unStakedList.filter((item: any) => item.schema.schema_name === filterData[0].data[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unStakedList, unStakedList.length]);

  const handleChange = (event: any, index: any) => {
    let _filters = [...filters];
    _filters[index] = event.target.value
    const newFilters = _filters;

    setFilters(newFilters);

    let newList = filterFighters(unStakedList, newFilters);

    if (showSimpleNft) {
      newList = newList.filter((nft: any) => nft.backed_tokens.length);
    }

    setShowNFTs(newList);
  };

  console.log(unStakedList)

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <nav style={
          {
            marginBottom: "32px",
            backgroundColor:"#1a203c"
          }
        }>
          <ul className={styles.NavItems}>
            {filterData.map((filter, index) => (
              <li className="NavItem" style={{ height: "40px", color:"white" }} key={index}>
                <FormControl sx={{ m: 1, minWidth: 120, margin: 0, width: "100%"}}>
                  <Select
                    name={filter.value}
                    style={{height:"40px"}}
                    value={filters[index]}
                    onChange={(e) => handleChange(e, index)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {filter.data.map((data, idx) => (
                      <MenuItem key={data} value={data}>
                        <b>{data}</b>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </li>
            ))}
          </ul>
        </nav>

        <FormControlLabel
          sx={{ mb: 4 }}
          control={
            <Checkbox
             style = {{color:"#ea923e"}}
             checked={showSimpleNft}
             onChange={handleChangeCheck}
             name="backed_nft"
            />
          }
          label="Only Backed NFTs"
        />

        <Box>
          <Grid container spacing={0} >
            {showNFTs
             .slice(0, currentPortionToShow)
             .map((NFT: any) => {
              return (
               <React.Fragment key={NFT.data.img + NFT.asset_id}>
                 <NFTCard
                  uri={uriPrefix + NFT.data.img}
                  name={NFT.name}
                  assetID={NFT.asset_id}
                  backed_tokens={NFT.backed_tokens}
                  powerScore={NFT.data.powerscore}
                 />
               </React.Fragment>
               )
             })}
          </Grid>
        </Box>
        

        {currentPortionToShow < showNFTs.length && (
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
           <Button sx={btnStyle} onClick={() => {
             if (currentPortionToShow + 25 > showNFTs.length) {
               changeCurrentPortionToShow(showNFTs.length);
               return;
             }
             changeCurrentPortionToShow(currentPortionToShow + 25);
           }}>
            Load more
           </Button>
         </Box>
        )}
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerAnchor}>
          © Copyright 2022 Let's Fight
        </p>
      </footer>
    </main>
  );
};
