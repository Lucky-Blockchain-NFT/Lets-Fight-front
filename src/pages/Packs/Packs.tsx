import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "../Fighters/Fighters.module.scss";
import { Box, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PackGroupCard from "../../components/PackCard/PackGroupCard";
import { PackTemplateType, RetrieveType } from "../../redux/types";
import { getTemplatesThunk } from "../../redux/user/nftThunk";
import NFTPackCard from "../../components/PackCard/PackCard";
import { retrieveAssetsThunk } from "../../redux/user/assetsThunk";

const uriPrefix = "https://dweb.link/ipfs/";

const filterData = [
	{ value: "Series", data: ["series1"] },
	{ value: "Pack Name", data: ["Pack Name", "Standard Pack", "Ultimate Pack", "Promo two Pack", "Final Pack Duo"] },
];


const PacksPage = () => {
	const unStakedList = useSelector((state: RootState) => state.user.packs) as any
	const packTemplateList = useSelector((state: RootState) => state.user.packTemplateList) as any
	const userData = useSelector((state: RootState) => state.user.userData) as any
	const [showPacks, setShowPack] = useState<any>([]);
	const [selectedFilter, changeFilter] = useState<any>(filterData.map(item => item.data[0]));
	const dispatch = useDispatch();

	useEffect(() => {
		if (userData.accountName) {
			dispatch(retrieveAssetsThunk(RetrieveType.packs))
			dispatch(getTemplatesThunk())
		}
	}, [])


	useEffect(() => {
		setShowPack(unStakedList);
	}, [unStakedList, unStakedList.length]);


	const handleChange = (event: any, index: any) => {
		const value = event.target.value;
		changeFilter(selectedFilter.map((item: string, inx: number) => {
			if (inx === index) {
				return value;
			}
			return item;
		}))
	};



	return (
	 <main style={{ width: '80%' }} className={styles.main}>

		 <nav style={{ marginBottom: "32px", backgroundColor:"#1a203c" }}>
			 <ul className={styles.NavItems}>
				 {filterData.map((filter, index) => (
					<li className="NavItem" style={{ height: "40px", color:"white" }} key={index}>
						<FormControl sx={{ m: 1, minWidth: 120, margin: 0, width: "100%" }}>
							<Select
							 style={{ height: "40px" }}
							 value={selectedFilter[index]}
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

		 <Box>
			 <Grid container spacing={0}>
				 {packTemplateList?.filter((item: PackTemplateType) => {
					 if (selectedFilter.includes('Pack Name')) {
						 return Boolean(selectedFilter.includes(item.template_series));
					 } else {
						 return selectedFilter.includes(item.template_series) && selectedFilter.includes(item.template_name);
					 }
				 }).map((item: PackTemplateType) => (
						<Grid key={item.imgLink} item textAlign={"center"} xl={2} md={2.4} sm={6} xs={12} style={{marginBottom:"50px"}}>
							<h3>{item.template_name}</h3>
							<Box marginTop={'16px'}>
								<Grid container spacing={0} >
									<PackGroupCard
									 uri={item.imgLink}
									 name={item.template_name}
									 userTemplateMints={unStakedList.filter((userItem: any) => item.template_id == userItem.template.template_id).map((userItem: any) => {
										 return {
											 assetId: userItem.asset_id,
											 mintId: userItem.template_mint
										 }
									 })}
									 collection_name={item.collection_name}
									/>
								</Grid>
							</Box>
						</Grid>
				 ))}

			 </Grid>
		 </Box>

		 <section className={styles.section}>
			 <nav style={{ marginBottom: "32px", height: "30px", backgroundColor:"#1a203c" }}>
			 </nav>

			 <Box>
				 <Grid container spacing={0} >
					 {showPacks
						.filter((item: any) => {
							if (selectedFilter.includes("Pack Name")) {
								return selectedFilter.includes(item.template.immutable_data.series)
							} else {
								return selectedFilter.includes(item.template.immutable_data.series) && selectedFilter.includes(item.name);
							}
						})
						.map((NFT: any) => (
						 <NFTPackCard
							key={NFT.data.img}
							uri={uriPrefix + NFT.data.img}
							name={NFT.name}
							assetID={NFT.asset_id}
							templateId={NFT.template.template_id}
							backed_tokens={NFT.backed_tokens}
							template_mint={NFT.template_mint}
							collection_name={NFT.collection.collection_name}
						 />
						))}
				 </Grid>
			 </Box>
		 </section>

		 <footer className={styles.footer}>
			 <p className={styles.footerAnchor}>
				 © Copyright 2022 Let's Fight
			 </p>
		 </footer>
	 </main>
	)
}

export default PacksPage;