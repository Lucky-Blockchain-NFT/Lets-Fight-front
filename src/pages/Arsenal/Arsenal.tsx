import React, { useEffect, useState } from "react";
import styles from "./Arsenal.module.scss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Box, Button } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import NFTCard from "../../components/NFTCard";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { retrieveAssetsThunk } from "../../redux/user/assetsThunk";
import { RootState } from "../../redux/store";
// import { filterArsenal, filterFighters } from "../helpers";
import { filterArsenal } from "../helpers";
import { btnStyle } from "../../components/PackCard/PackCard";
import { RetrieveType } from "../../redux/types";

const filterData = [
  {
    value: "series",
    data: ["actions"]
  },
  {
    value: "name",
    data: ["Name", "P", "B", "K", "S", "D", "C"]
  },
  {
    value: "rarity",
    data: ["Rarity", "Legendary", "Epic", "Rare", "Common"]
  },
  {
    value: "powerscore",
    data: ["Powerscore", '0.60', '0.65', '0.70', '0.75', '0.80', '0.85', '0.90', '0.95', '1.00', '1.05', '1.10',
      '1.15', '1.20', '1.25', '1.30', '1.35', '1.40', '1.45', '1.50', '1.55', '1.60', '1.65', '1.70', '1.75', '1.80',
      '2.80', '2.85', '2.90', '2.95', '3.00', '3.05', '3.10', '3.15', '3.20', '3.25', '3.30', '3.40',
    '4.40', '4.45', '4.50', '4.55', '4.60', '4.65', '4.70', '4.75', '4.80', '4.85', '4.90', '5.00',]
  }
];

const Arsenal = () => {
  const [filters, setFilters] = useState(filterData.map(filter => filter.data[0]));
  const [showSimpleNft, changeSimpleNftShow] = useState(false);

  const [currentPortionToShow, changeCurrentPortionToShow] = useState(25);

  const unStakedList = useSelector((state: RootState) => state.user.arsenal) as any
  const userData = useSelector((state: RootState) => state.user.userData) as any


  const [showNFTs, setShowNFTs] = useState<any>([]);
  const dispatch = useDispatch();

  const handleChangeCheck = () => {
    const nextStatus = !showSimpleNft;
    if (nextStatus) {
      const newNftList = showNFTs.filter((nft: any) => nft.backed_tokens.length);
      setShowNFTs(newNftList);
    } else {
      const newList = unStakedList.filter((item: any) => ['actions'].includes(item.schema.schema_name || ''))
      setShowNFTs(newList);
    }

    changeSimpleNftShow(nextStatus);
  };

  useEffect(() => {
    if (userData.accountName) {
      dispatch(retrieveAssetsThunk(RetrieveType.arsenal))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let uriPrefix = "https://dweb.link/ipfs/";
  console.log(unStakedList)

  useEffect(() => {
    const newList = unStakedList.filter((item: any) => ['actions'].includes(item.schema.schema_name || ''))
    setShowNFTs(newList);
    console.log(showNFTs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unStakedList, unStakedList.length]);

  const handleChange = (event: any, index: any) => {
    let _filters = [...filters];
    _filters[index] = event.target.value
    const newFilters = _filters;

    setFilters(newFilters);

    const newList = filterArsenal(unStakedList.filter((item: any) => ['actions'].includes(item.schema.schema_name || '')), newFilters)

    setShowNFTs(newList);
  };


  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <nav style={{ marginBottom: "32px", backgroundColor:"#1a203c" }}>
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
             .map((NFT: any) => (
              <NFTCard
               key={NFT.data.img + NFT.asset_id}
               uri={uriPrefix + NFT.data.img}
               name={NFT.name}
               assetID={NFT.asset_id}
               backed_tokens={NFT.backed_tokens}
               powerScore={NFT.data.powerscore}
              />
            ))}
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

export default Arsenal;