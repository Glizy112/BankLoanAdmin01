import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Input,
    InputLabel,
    Modal,
    Radio,
    RadioGroup,
    TableFooter,
    TextField,
    Typography,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from "@mui/material";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import EmptyState from "../icons/empty";
import { Upload as UploadIcon } from "../icons/upload";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import Trash from "../icons/trash";
import VendorPDF from "../components/vendor/vendor-pdf";
import Compressor from "compressorjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DDAForm(props) {
    const [imageLoading, setImageLoading] = useState(false);

    const handleUpload = (e) => {
        setImageLoading(true);
        const arr = [...(props?.uploadedFile)];
    
        if (e.target.files) {
          Object.values(e.target.files).map((item) => {
            new Compressor(item, {
              quality: 0.3,
              convertTypes: ["image/png", "image/webp"],
              convertSize: 1000000,
              success(result) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                  arr.push(evt.target.result);
                };
                reader.readAsDataURL(result);
              },
            });
          });
        }
        props?.setUploadedFile(arr);
        //setUploadStamp(arr);
        setTimeout(() => setImageLoading(false), 1000);
    };

    const handleStampUpload = (e) => {
        setImageLoading(true);
        const arr = [...(props?.uploadedStamp)];
    
        if (e.target.files) {
          Object.values(e.target.files).map((item) => {
            new Compressor(item, {
              quality: 0.3,
              convertTypes: ["image/png", "image/webp"],
              convertSize: 1000000,
              success(result) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                  arr.push(evt.target.result);
                };
                reader.readAsDataURL(result);
              },
            });
          });
        }
        //setUploadFile(arr);
        props?.setUploadedStamp(arr);
        setTimeout(() => setImageLoading(false), 1000);
    };

    const showImages = () => {
        if (imageLoading) {
          return (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress disableShrink />
            </Box>
          );
        } else {
          return (
            <ImageList cols={3}>
              {props?.uploadedFile?.map((item, idx) => (
                <ImageListItem key={idx}>
                  <img
                    src={item}
                    alt={`${item}_${idx}`}
                    loading="lazy"
                    style={{ width: 100, height: 100 }}
                  />
                  <ImageListItemBar
                    sx={{
                      background: "transparent",
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`star ${item.title}`}
                        onClick={() => props?.setUploadedFile(props?.uploadedFile?.filter((nItem) => nItem !== item))}
                      >
                        <Trash />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          );
        }
    };

    const showStamp = () => {
        return (
          <ImageList>
            {props?.uploadedStamp?.map((item, idx) => (
              <ImageListItem key={idx}>
                <img
                  src={item}
                  alt={`${item}_${idx}`}
                  loading="lazy"
                  style={{ width: 100, height: 100 }}
                />
                <ImageListItemBar
                  sx={{
                    background: "transparent",
                  }}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${item.title}`}
                      onClick={() => props?.setUploadedStamp(props?.uploadedStamp?.filter((nItem) => nItem !== item))}
                    >
                      <Trash />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            ))}
          </ImageList>
        );
    };

    return (
        <>
            <form onSubmit={props?.formik.handleSubmit}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                              Borrower Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.visitDate && props?.formik.errors.visitDate)}
                                fullWidth
                                helperText={props?.formik.touched.visitDate && props?.formik.errors.visitDate}
                                label="Date"
                                margin="normal"
                                name="visitDate"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="date"
                                variant="outlined"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.name && props?.formik.errors.name)}
                                fullWidth
                                helperText={props?.formik.touched.name && props?.formik.errors.name}
                                label="Applicant Name"
                                margin="normal"
                                name="name"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter name"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.applicant_fullResidentialAddress && props?.formik.errors.applicant_fullResidentialAddress)}
                                fullWidth
                                helperText={props?.formik.touched.applicant_fullResidentialAddress && props?.formik.errors.applicant_fullResidentialAddress}
                                label="Applicant Permanent Address"
                                margin="normal"
                                name="applicant_fullResidentialAddress"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="textarea"
                                variant="outlined"
                                placeholder="e.g. XYZ, ABC Colony, GHI City."
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.telephone_mobile && props?.formik.errors.telephone_mobile)}
                                fullWidth
                                helperText={props?.formik.touched.telephone_mobile && "e.g. 9834928400"}
                                label="Applicant Contact Number"
                                margin="normal"
                                name="telephone_mobile"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                            />                    
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.coApplicant_name && props?.formik.errors.coApplicant_name)}
                                fullWidth
                                helperText={props?.formik.touched.coApplicant_name && props?.formik.errors.coApplicant_name}
                                label="Co-Applicant Name"
                                margin="normal"
                                name="coApplicant_name"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter name"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.coApplicant_relation && props?.formik.errors.coApplicant_relation)}
                                fullWidth
                                helperText={props?.formik.touched.coApplicant_relation && "e.g. spouse/wife, father, mother, brother, sister, etc."
                                    //props?.formik.errors.coApplicant_relation
                                }
                                label="Co-Applicant Relation"
                                margin="normal"
                                name="coApplicant_relation"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter relation type"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.loan_type && props?.formik.errors.loan_type)}
                                fullWidth
                                helperText={props?.formik.touched.loan_type && props?.formik.errors.loan_type}
                                label="Type of Loan Applied"
                                margin="normal"
                                name="loan_type"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. house loan, auto loan(or vehicle loan), etc."
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.loan_amt_req && props?.formik.errors.loan_amt_req)}
                                fullWidth
                                helperText={props?.formik.touched.loan_amt_req && props?.formik.errors.loan_amt_req}
                                label="Applied Loan Amount"
                                margin="normal"
                                name="loan_amt_req"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. 1000000"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.trade_license && props?.formik.errors.trade_license)}
                                fullWidth
                                helperText={props?.formik.touched.trade_license && props?.formik.errors.trade_license}
                                label="Trade License"
                                margin="normal"
                                name="trade_license"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter the license number"
                            />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <FormControl margin="normal">
                              <FormLabel>Is applicant existing account holder ?</FormLabel>
                              <RadioGroup
                                row
                                name="existing_bank"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                              >
                                {["Yes", "No"]?.map((item, idx) => (
                                  <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                        </Grid>
                        {
                            props?.formik.values?.existing_bank==="Yes" &&
                            (
                                <>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.existing_bank_time && props?.formik.errors.existing_bank_time)}
                                        fullWidth
                                        helperText={props?.formik.touched.existing_bank_time && props?.formik.errors.existing_bank_time}
                                        label="Time dealing with bank(in Years)"
                                        margin="normal"
                                        name="existing_bank_time"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="number"
                                        variant="outlined"
                                        placeholder="e.g. 3"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.existing_account_type && props?.formik.errors.existing_account_type)}
                                        fullWidth
                                        helperText={props?.formik.touched.existing_account_type && props?.formik.errors.existing_account_type}
                                        label="Nature of existing account"
                                        margin="normal"
                                        name="existing_account_type"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="text"
                                        variant="outlined"
                                        placeholder="e.g. current, savings, business, etc."
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.existing_account_no && props?.formik.errors.existing_account_no)}
                                        fullWidth
                                        helperText={props?.formik.touched.existing_account_no && props?.formik.errors.existing_account_no}
                                        label="Existing Account Number"
                                        margin="normal"
                                        name="existing_account_no"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="text"
                                        variant="outlined"
                                        placeholder="e.g. 9992382198341016"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl margin="normal" sx={{pl: 1}}>
                                    <FormLabel>If Confidential opinion called ?</FormLabel>
                                    <RadioGroup
                                        row
                                        name="confidential_opinion"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                    >
                                        {["Yes", "No"]?.map((item, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                        />
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {
                                    props?.formik.values?.confidential_opinion==="Yes" &&
                                    (
                                    <Grid item xs={12} md={4}>
                                        <FormControl margin="normal">
                                        <FormLabel>Is Confidential opinion satisfactory ?</FormLabel>
                                        <RadioGroup
                                            row
                                            name="confidential_opinion_status"
                                            onBlur={props?.formik.handleBlur}
                                            onChange={props?.formik.handleChange}
                                        >
                                            {["Yes", "No"]?.map((item, idx) => (
                                            <FormControlLabel
                                                key={idx}
                                                value={item}
                                                control={<Radio />}
                                                label={item}
                                            />
                                            ))}
                                        </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    ) 
                                }
                                </>
                            )
                        }
                        {
                            props?.formik.values.loan_type?.includes("Vehicle" || "Auto" || "vehicle" || "auto" || "Motor" || "motor") && 
                            (
                            <>
                                <Grid item xs={12} md={12}>
                                    <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                        Vehicle Dealer Verification
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.auto_dealer_name && props?.formik.errors.auto_dealer_name)}
                                        fullWidth
                                        helperText={props?.formik.touched.auto_dealer_name && props?.formik.errors.auto_dealer_name}
                                        label="Vehicle Dealer Name"
                                        margin="normal"
                                        name="auto_dealer_name"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter dealer name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.auto_dealer_address && props?.formik.errors.auto_dealer_address)}
                                        fullWidth
                                        helperText={props?.formik.touched.auto_dealer_address && props?.formik.errors.auto_dealer_address}
                                        label="Address of Vehicle Dealer"
                                        margin="normal"
                                        name="auto_dealer_address"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="textarea"
                                        variant="outlined"
                                        placeholder="Enter dealer address"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.auto_dealer_established && props?.formik.errors.auto_dealer_established)}
                                        fullWidth
                                        helperText={props?.formik.touched.auto_dealer_established && props?.formik.errors.auto_dealer_established}
                                        label="Establishment Year"
                                        margin="normal"
                                        name="auto_dealer_established"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="text"
                                        variant="outlined"
                                        placeholder="e.g. 2020"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormControl margin="normal" sx={{pl: 3}}>
                                    <FormLabel>Is Dealer authorized ?</FormLabel>
                                    <RadioGroup
                                        row
                                        name="auto_dealer_authorized"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                    >
                                        {["Yes", "No"]?.map((item, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                        />
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.vehicle_manufacturer && props?.formik.errors.vehicle_manufacturer)}
                                        fullWidth
                                        helperText={props?.formik.touched.vehicle_manufacturer && props?.formik.errors.vehicle_manufacturer}
                                        label="Vehicle Manufacturer & Model Name"
                                        margin="normal"
                                        name="vehicle_manufacturer"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type="text"
                                        variant="outlined"
                                        placeholder="e.g. Maruti Suzuki Baleno-Zeta(petrol)"
                                    />
                                </Grid>
                                {
                                    props?.formik.values?.auto_dealer_authorized==="Yes" &&
                                    (
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            error={Boolean(props?.formik.touched.authorization_year && props?.formik.errors.authorization_year)}
                                            fullWidth
                                            helperText={props?.formik.touched.authorization_year && props?.formik.errors.authorization_year}
                                            label="Authorization Year"
                                            margin="normal"
                                            name="authorization_year"
                                            onBlur={props?.formik.handleBlur}
                                            onChange={props?.formik.handleChange}
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 2020"
                                        />
                                    </Grid>
                                    )
                                }
                                <Grid item xs={12} md={4}>
                                    <FormControl margin="normal">
                                    <FormLabel>Local dealer of same product ?</FormLabel>
                                    <RadioGroup
                                        row
                                        name="local_dealer_check"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                    >
                                        {["Yes", "No"]?.map((item, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                        />
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl margin="normal">
                                    <FormLabel>Mode of Visit</FormLabel>
                                    <RadioGroup
                                        row
                                        name="visit_mode"
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                    >
                                        {["Offline", "Online"]?.map((item, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                        />
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </>
                            )
                        }

                        {/* <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.existing_bank && props?.formik.errors.existing_bank)}
                                fullWidth
                                helperText={props?.formik.touched.existing_bank && props?.formik.errors.existing_bank}
                                label="Is applicant existing account holder ?"
                                margin="normal"
                                name="existing_bank"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter name"
                            />
                        </Grid> */}

                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Residence Verification
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Dependant Children"
                                name="noOfChildren"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 2"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Dependant Adults"
                                name="noOfAdults"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 2"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.currentResidenceTime && props?.formik.errors.currentResidenceTime)}
                                fullWidth
                                helperText={props?.formik.touched.currentResidenceTime && "Only put the starting year"
                                    //props?.formik.errors.currentResidenceTime
                                }
                                label="Current Residence Time (since)"
                                name="currentResidenceTime"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. 2013"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Earning Family Members"
                                name="noOfEarningMembers"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 3"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl margin="normal">
                            <FormLabel>Status of Residence</FormLabel>
                            <RadioGroup
                                row
                                name="parentsResidenceType"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Owned", "Rented"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.twVehicle && props?.formik.errors.twVehicle)}
                                fullWidth
                                helperText={props?.formik.touched.twVehicle && props?.formik.errors.twVehicle}
                                label="No. of Two-Wheeler Vehicles"
                                margin="normal"
                                name="twVehicle"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 2"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.fwVehicle && props?.formik.errors.fwVehicle)}
                                fullWidth
                                helperText={props?.formik.touched.fwVehicle && props?.formik.errors.fwVehicle}
                                label="No. of Four Wheeler Vehicles"
                                margin="normal"
                                name="fwVehicle"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 1"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Details not asked directly from the applicant
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                            <FormLabel>Applicant located in ?</FormLabel>
                            <RadioGroup
                                row
                                name="residence_locality"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["City", "Village", "Town"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.residence_locality_scene && props?.formik.errors.residence_locality_scene)}
                                fullWidth
                                helperText={props?.formik.touched.residence_locality_scene && "e.g. residential buildings, apartments, industrial area, etc."
                                    //props?.formik.errors.residence_locality_scene
                                }
                                label="Applicant Residence Surroundings"
                                name="residence_locality_scene"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter the surroundings"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                            <FormLabel>Is entrance motorable ?</FormLabel>
                            <RadioGroup
                                row
                                name="motorable_entrance"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                            <FormLabel>Is Address Confirmed ?</FormLabel>
                            <RadioGroup
                                row
                                name="address_confirmed"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.pincode && props?.formik.errors.pincode)}
                                fullWidth
                                helperText={props?.formik.touched.pincode && props?.formik.errors.pincode}
                                label="Residence Pin Code"
                                margin="normal"
                                name="pincode"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 151001"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.landmark && props?.formik.errors.landmark)}
                                fullWidth
                                helperText={props?.formik.touched.landmark && props?.formik.errors.landmark}
                                label="Prominent Landmark"
                                margin="normal"
                                name="landmark"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. Something Nearby"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                            <FormLabel>Standard of Living</FormLabel>
                            <RadioGroup
                                row
                                name="living_standard"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Upper Class", "Middle Class", "Lower Class"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.house_colour && props?.formik.errors.house_colour)}
                                fullWidth
                                helperText={props?.formik.touched.house_colour && props?.formik.errors.house_colour}
                                label="Colour of House / Complex"
                                margin="normal"
                                name="house_colour"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. Whitish Red"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.interiors && props?.formik.errors.interiors)}
                                fullWidth
                                helperText={props?.formik.touched.interiors && props?.formik.errors.interiors}
                                label="Interiors Condition"
                                margin="normal"
                                name="interiors"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. painted or Un-Painted"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.assets_seen && props?.formik.errors.assets_seen)}
                                fullWidth
                                helperText={props?.formik.touched.assets_seen && "e.g. Televisions-2, A.C.-3, Radio, Home Theater, etc."
                                    //props?.formik.errors.assets_seen
                                }
                                label="Applicant Assets"
                                margin="normal"
                                name="assets_seen"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter here.."
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.noOfStoreys && props?.formik.errors.noOfStoreys)}
                                fullWidth
                                helperText={props?.formik.touched.noOfStoreys && props?.formik.errors.noOfStoreys}
                                label="Number of Storeys"
                                margin="normal"
                                name="noOfStoreys"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 3"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl>
                            <FormLabel>Watchman {`(if any)`}</FormLabel>
                            <RadioGroup
                                row
                                name="watchman"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl>
                            <FormLabel>Lift {`(if any)`}</FormLabel>
                            <RadioGroup
                                row
                                name="living_standard"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.society_board && props?.formik.errors.society_board)}
                                fullWidth
                                helperText={props?.formik.touched.society_board && props?.formik.errors.society_board}
                                label="Society Board Name (if any)"
                                name="society_board"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. Basant Vihar"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl margin="normal">
                            <FormLabel>Applicant's name outside gate ?</FormLabel>
                            <RadioGroup
                                row
                                name="residence_name_plate"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl margin="normal">
                            <FormLabel>External Appearance of Building or Society ?</FormLabel>
                            <RadioGroup
                                row
                                name="external_appearance"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Excellent", "Good", "Average"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl margin="normal">
                            <FormLabel>Alloted Separate Parking Slot ?</FormLabel>
                            <RadioGroup
                                row
                                name="parking_slot"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.residence_area && props?.formik.errors.residence_area)}
                                fullWidth
                                helperText={props?.formik.touched.residence_area && "e.g. 125 sq. yards"
                                    //props?.formik.errors.residence_area
                                }
                                label="Residence Area (in sq./sq.yards/grounds)"
                                margin="normal"
                                name="residence_area"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter total area"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal">
                            <FormLabel>If house locked after 2 visits ?</FormLabel>
                            <RadioGroup
                                row
                                name="house_visit_check"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        {
                            props?.formik.values?.house_visit_check==="Yes" && (
                        <>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.applicant_residence_time && props?.formik.errors.applicant_residence_time)}
                                fullWidth
                                helperText={props?.formik.touched.applicant_residence_time && props?.formik.errors.applicant_residence_time}
                                label="Years lived at Current Residence"
                                margin="normal"
                                name="applicant_residence_time"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 1"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.client_occupation && props?.formik.errors.client_occupation)}
                                fullWidth
                                helperText={props?.formik.touched.client_occupation && "e.g. Retailer, Business Owner, Banker, Manager, etc."
                                    //props?.formik.errors.client_occupation
                                }
                                label="Applicant Occupation"
                                margin="normal"
                                name="client_occupation"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter occupation"
                            />
                        </Grid>
                        </>
                        )}
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Applicant Identification Sources
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal">
                            <FormLabel>Applicant Identification Mode</FormLabel>
                            <RadioGroup
                                row
                                name="identification_mode"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Offline", "Online"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.applicant_pan && props?.formik.errors.applicant_pan)}
                                fullWidth
                                helperText={props?.formik.touched.applicant_pan && "e.g. BXHWA9807C"
                                    //props?.formik.errors.applicant_pan
                                }
                                label={`Applicant PAN (${props?.formik.values?.name})`}
                                margin="normal"
                                name="applicant_pan"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter PAN Number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.coApplicant_pan && props?.formik.errors.coApplicant_pan)}
                                fullWidth
                                helperText={props?.formik.touched.coApplicant_pan && "e.g. BAGTG2504A"
                                    //props?.formik.errors.coApplicant_pan
                                }
                                label={`Co-Applicant PAN (${props?.formik.values?.coApplicant_name})`}
                                margin="normal"
                                name="coApplicant_pan"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter PAN Number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal">
                            <FormLabel>Address Verification Mode</FormLabel>
                            <RadioGroup
                                row
                                name="address_verify_mode"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Offline", "Online"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.applicant_aadhaar && props?.formik.errors.applicant_aadhaar)}
                                fullWidth
                                helperText={props?.formik.touched.applicant_aadhaar && "e.g. 7407 7236 2484"
                                    //props?.formik.errors.applicant_aadhaar
                                }
                                label={`Applicant Aadhaar (${props?.formik.values?.name})`}
                                margin="normal"
                                name="applicant_aadhaar"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter Aadhaar Number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.coApplicant_aadhaar && props?.formik.errors.coApplicant_aadhaar)}
                                fullWidth
                                helperText={props?.formik.touched.coApplicant_aadhaar && "e.g. 2276 1348 0405"
                                    //props?.formik.errors.coApplicant_aadhaar
                                }
                                label={`Co-Applicant Aadhaar (${props?.formik.values?.coApplicant_name})`}
                                margin="normal"
                                name="coApplicant_aadhaar"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter Aadhaar Number"
                            />
                        </Grid>
                        {/* Date-Time Picker for calling date & time Pending */}
                        {/* Date of visit to property spot and other property details and builders pending (TBD)
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Loan Against Property Details
                            </Typography>
                        </Grid>
                        */}
                        {/* Takeover of  loans data pending (TBD) */}

                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Builders of Property Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.builder_established && props?.formik.errors.builder_established)}
                                fullWidth
                                helperText={props?.formik.touched.builder_established && props?.formik.errors.builder_established}
                                label="Established Since (in Years)"
                                margin="normal"
                                name="builder_established"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter total years"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.builder_totalProjects && props?.formik.errors.builder_totalProjects)}
                                fullWidth
                                helperText={props?.formik.touched.builder_totalProjects && props?.formik.errors.builder_totalProjects}
                                label="Total no. of projects"
                                margin="normal"
                                name="builder_totalProjects"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter total projects"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.builder_soldFlats && props?.formik.errors.builder_soldFlats)}
                                fullWidth
                                helperText={props?.formik.touched.builder_soldFlats && props?.formik.errors.builder_soldFlats}
                                label="Total Flats Sold"
                                margin="normal"
                                name="builder_soldFlats"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter sold flats"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.builder_builtFlats && props?.formik.errors.builder_builtFlats)}
                                fullWidth
                                helperText={props?.formik.touched.builder_builtFlats && props?.formik.errors.builder_builtFlats}
                                label="Total Flats Built"
                                margin="normal"
                                name="builder_builtFlats"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter built flats"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.builder_marketEnquiry && props?.formik.errors.builder_marketEnquiry)}
                                fullWidth
                                helperText={props?.formik.touched.builder_marketEnquiry && props?.formik.errors.builder_marketEnquiry}
                                label="Market Enquiry"
                                margin="normal"
                                name="builder_marketEnquiry"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter here.."
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal">
                            <FormLabel>Whether project approved by zonal office ?</FormLabel>
                            <RadioGroup
                                row
                                name="projectApproved"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl>
                            <FormLabel>Quality of Construction</FormLabel>
                            <RadioGroup
                                row
                                name="builder_buildQuality"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Excellent", "Good", "Average"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl>
                            <FormLabel>Nature of Property</FormLabel>
                            <RadioGroup
                                row
                                name="propertyNature"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Agricultural", "Non-agricultural"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        
                        
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Takeover Information {`(if any)`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.takeover_reason && props?.formik.errors.takeover_reason)}
                                fullWidth
                                helperText={props?.formik.touched.takeover_reason && props?.formik.errors.takeover_reason}
                                label="Reason for takeover"
                                margin="normal"
                                name="takeover_reason"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter here.."
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.original_advance_amount && props?.formik.errors.original_advance_amount)}
                                fullWidth
                                helperText={props?.formik.touched.original_advance_amount && props?.formik.errors.original_advance_amount}
                                label="Original Advance Amount"
                                margin="normal"
                                name="original_advance_amount"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter advance amount"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.outstanding_amount && props?.formik.errors.outstanding_amount)}
                                fullWidth
                                helperText={props?.formik.touched.outstanding_amount && props?.formik.errors.outstanding_amount}
                                label="Outstanding Amount"
                                margin="normal"
                                name="outstanding_amount"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter here.."
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal">
                            <FormLabel>Whether Regular ?</FormLabel>
                            <RadioGroup
                                row
                                name="takeover_regular_check"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.loan_residual_period && props?.formik.errors.loan_residual_period)}
                                fullWidth
                                helperText={props?.formik.touched.loan_residual_period && props?.formik.errors.loan_residual_period}
                                label="Residual Period of Loan"
                                margin="normal"
                                name="loan_residual_period"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. 1 year or 6 months"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.takeover_doc_verify_date && props?.formik.errors.takeover_doc_verify_date)}
                                fullWidth
                                helperText={props?.formik.touched.takeover_doc_verify_date && props?.formik.errors.takeover_doc_verify_date}
                                label="Residual Period of Loan"
                                margin="normal"
                                name="takeover_doc_verify_date"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="date"
                                variant="outlined"
                                //placeholder="e.g. 1 year or 6 months"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                error={Boolean(props?.formik.touched.confidential_opinion_banks && props?.formik.errors.confidential_opinion_banks)}
                                fullWidth
                                helperText={props?.formik.touched.confidential_opinion_banks && props?.formik.errors.confidential_opinion_banks}
                                label="Confidential Opinion of other banks"
                                margin="normal"
                                name="confidential_opinion_banks"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter here.."
                            />
                        </Grid>
                        {/*ITR Reports Pending (TBD)- Done just below */}

                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Applicant ITR Verification{`(${props?.formik.values?.name})`}
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.applicant_itr_time_periods && props?.formik.errors.applicant_itr_time_periods)}
                                fullWidth
                                helperText={props?.formik.touched.applicant_itr_time_periods && props?.formik.errors.applicant_itr_time_periods}
                                label="ITR-Proof Financial Years"
                                margin="normal"
                                name="applicant_itr_time_periods"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter total years"
                            />
                        </Grid>

                        {
                            Array.from(Array(props?.formik.values?.applicant_itr_time_periods)).map((item, idx)=> (
                                <Grid container spacing={2} pl={2} key={idx} pt={idx===0 ? 3 : 6}>
                                    <Grid key={`${idx}_session`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Session Year"
                                            name={`applicant_itr_periods.${idx}.session`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 2020-21"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_acknowledgeNumber`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Acknowledgement Number"
                                            name={`applicant_itr_periods.${idx}.acknowledgementNo`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 923858320281220"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_pan`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Applicant PAN"
                                            name={`applicant_itr_periods.${idx}.PAN`}
                                            onBlur={(e)=> props?.formik.setFieldValue(`applicant_itr_periods.${idx}.PAN`, e.target.value)
                                                //props?.formik.handleBlur
                                            }
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            value={props?.formik.values?.applicant_pan}
                                            placeholder="e.g. BQYPK2503B"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_itr_filled`} item xs={12} md={3}>
                                        <FormControl>
                                            <FormLabel>ITR filled properly ?</FormLabel>
                                            <RadioGroup
                                                row
                                                name={`applicant_itr_periods.${idx}.itr_filed_correctly`}
                                                onBlur={props?.formik.handleBlur}
                                                onChange={props?.formik.handleChange}
                                            >
                                                {["Yes", "No"]?.map((item, idx) => (
                                                <FormControlLabel
                                                    key={idx}
                                                    value={item}
                                                    control={<Radio />}
                                                    label={item}
                                                />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        {/* <TextField 
                                            fullWidth
                                            label="ITR filled properly"
                                            name={`applicant_itr_periods.${idx}.session`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 2020-21"
                                        /> */}
                                    </Grid>
                                    <Grid key={`${idx}_gross_total_income`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Gross Total Income"
                                            name={`applicant_itr_periods.${idx}.gross_total_income`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 1500000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_total_taxable_income`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Total Taxable Income"
                                            name={`applicant_itr_periods.${idx}.total_taxable_income`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 1000000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_total_itr_tax`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Total Tax (ITR)"
                                            name={`applicant_itr_periods.${idx}.total_itr_tax`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 10000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_TDS`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="TDS"
                                            name={`applicant_itr_periods.${idx}.TDS`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 500"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_self_assess_paidTax`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Self-Assessment Paid Tax"
                                            name={`applicant_itr_periods.${idx}.self_assess_paidTax`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 5000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_filingDate`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Date of Filing"
                                            name={`applicant_itr_periods.${idx}.filing_date`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="date"
                                            variant="outlined"
                                            placeholder="Select Date"
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_remarks`} item xs={12} md={6}>
                                        <TextField 
                                            fullWidth
                                            label="Remarks"
                                            name={`applicant_itr_periods.${idx}.remarks`}
                                            onBlur={()=> console.log("Session data-> ", props?.formik.values?.applicant_itr_periods)
                                            //props?.formik.handleBlur
                                            }
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            //rows={3}
                                            //multiline
                                            type="textarea"
                                            variant="outlined"
                                            placeholder="Enter any remarks or observations on ITR"
                                        />
                                    </Grid>
                                </Grid>
                            ))
                        }

                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Co-Applicant ITR Verification{`(${props?.formik.values?.coApplicant_name})`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.coApplicant_itr_time_periods && props?.formik.errors.coApplicant_itr_time_periods)}
                                fullWidth
                                helperText={props?.formik.touched.coApplicant_itr_time_periods && props?.formik.errors.coApplicant_itr_time_periods}
                                label="ITR-Proof Financial Years"
                                margin="normal"
                                name="coApplicant_itr_time_periods"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="Enter total years"
                            />
                        </Grid>

                        {
                            Array.from(Array(props?.formik.values?.coApplicant_itr_time_periods)).map((item, idx)=> (
                                <Grid container spacing={2} pl={2} key={idx} pt={idx===0 ? 3 : 6}>
                                    <Grid key={`${idx}_session`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Session Year"
                                            name={`coApplicant_itr_periods.${idx}.session`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 2020-21"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_acknowledgeNumber`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Acknowledgement Number"
                                            name={`coApplicant_itr_periods.${idx}.acknowledgementNo`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 923858320281220"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_pan`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Applicant PAN"
                                            name={`coApplicant_itr_periods.${idx}.PAN`}
                                            onBlur={(e)=> props?.formik.setFieldValue(`coApplicant_itr_periods.${idx}.PAN`, e.target.value)}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            value={props?.formik.values?.coApplicant_pan}
                                            placeholder="e.g. BQYPK2503B"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_itr_filled`} item xs={12} md={3}>
                                        <FormControl>
                                            <FormLabel>ITR filled properly ?</FormLabel>
                                            <RadioGroup
                                                row
                                                name={`coApplicant_itr_periods.${idx}.itr_filed_correctly`}
                                                onBlur={props?.formik.handleBlur}
                                                onChange={props?.formik.handleChange}
                                            >
                                                {["Yes", "No"]?.map((item, idx) => (
                                                <FormControlLabel
                                                    key={idx}
                                                    value={item}
                                                    control={<Radio />}
                                                    label={item}
                                                />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        {/* <TextField 
                                            fullWidth
                                            label="ITR filled properly"
                                            name={`applicant_itr_periods.${idx}.session`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="text"
                                            variant="outlined"
                                            placeholder="e.g. 2020-21"
                                        /> */}
                                    </Grid>
                                    <Grid key={`${idx}_gross_total_income`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Gross Total Income"
                                            name={`coApplicant_itr_periods.${idx}.gross_total_income`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 1500000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_total_taxable_income`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Total Taxable Income"
                                            name={`coApplicant_itr_periods.${idx}.total_taxable_income`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 1000000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_total_itr_tax`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Total Tax (ITR)"
                                            name={`coApplicant_itr_periods.${idx}.total_itr_tax`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 10000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_TDS`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="TDS"
                                            name={`coApplicant_itr_periods.${idx}.TDS`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 500"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_self_assess_paidTax`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Self-Assessment Paid Tax"
                                            name={`coApplicant_itr_periods.${idx}.self_assess_paidTax`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="number"
                                            variant="outlined"
                                            placeholder="e.g. 5000"
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_filingDate`} item xs={12} md={3}>
                                        <TextField 
                                            fullWidth
                                            label="Date of Filing"
                                            name={`coApplicant_itr_periods.${idx}.filingDate`}
                                            onBlur={props?.formik.handleBlur}
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            type="date"
                                            variant="outlined"
                                            placeholder="Select Date"
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </Grid>
                                    <Grid key={`${idx}_remarks`} item xs={12} md={6}>
                                        <TextField 
                                            fullWidth
                                            label="Remarks"
                                            name={`coApplicant_itr_periods.${idx}.remarks`}
                                            onBlur={()=> console.log("Co-Applicant Session data-> ", props?.formik.values?.coApplicant_itr_periods)
                                            //props?.formik.handleBlur
                                            }
                                            onChange={ 
                                                props?.formik.handleChange
                                            }
                                            //rows={3}
                                            //multiline
                                            type="textarea"
                                            variant="outlined"
                                            placeholder="Enter any remarks or observations on ITR"
                                        />
                                    </Grid>
                                </Grid>
                            ))
                        }

                        {/* {   props?.formik.values?.applicant_itr_periods?.length > 0 &&
                            props?.formik.values?.applicant_itr_periods?.map((item, idx)=> (
                                <>
                                </>
                            ))
                        } */}

                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Bank Account Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_entity && props?.formik.errors.business_entity)}
                                fullWidth
                                helperText={props?.formik.touched.business_entity && "e.g. M/S. XYZ Enterprises"
                                    //props?.formik.errors.business_entity
                                }
                                label="Applicant Business Name"
                                margin="normal"
                                name="business_entity"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter official business name"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_bank_account && props?.formik.errors.business_bank_account)}
                                fullWidth
                                helperText={props?.formik.touched.business_bank_account && props?.formik.errors.business_bank_account}
                                label="Bank Account No."
                                margin="normal"
                                name="business_bank_account"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter bank account number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_bank_name && props?.formik.errors.business_bank_name)}
                                fullWidth
                                helperText={props?.formik.touched.business_bank_name && props?.formik.errors.business_bank_name}
                                label="Bank Name and Branch"
                                margin="normal"
                                name="business_bank_name"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Enter bank name with branch info."
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.banking_remarks && props?.formik.errors.banking_remarks)}
                                fullWidth
                                helperText={props?.formik.touched.banking_remarks && props?.formik.errors.banking_remarks}
                                label="Banking Remarks"
                                margin="normal"
                                name="banking_remarks"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="textarea"
                                multiline
                                row={10}
                                variant="outlined"
                                placeholder="Enter here.."
                            />
                        </Grid>
                        {/* Business Balance Sheet Verification not applied in case of auto or vehicle loan */}
                        {/* In case of salaried persons  
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Income Details
                            </Typography>
                        </Grid>
                        */}
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Business Verification Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.full_business_address && props?.formik.errors.full_business_address)}
                                fullWidth
                                helperText={props?.formik.touched.full_business_address && props?.formik.errors.full_business_address}
                                label="Full Business Address (with name)"
                                margin="normal"
                                name="full_business_address"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="textarea"
                                multiline
                                variant="outlined"
                                placeholder="M/s. XYZ Enterprises, ABC Road, GHI City."
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.telephone_mobile && props?.formik.errors.telephone_mobile)}
                                fullWidth
                                helperText={props?.formik.touched.telephone_mobile && props?.formik.errors.telephone_mobile}
                                label="Contact Number"
                                margin="normal"
                                name="telephone_mobile"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. 9724249820"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl margin="normal">
                            <FormLabel>Electricity Bill Checked ?</FormLabel>
                            <RadioGroup
                                row
                                name="electricity_bill"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_type && props?.formik.errors.business_type)}
                                fullWidth
                                helperText={props?.formik.touched.business_type && props?.formik.errors.business_type}
                                label="Type of Business / Co."
                                margin="normal"
                                name="business_type"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. Prop., Partnership, etc."
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_landmark && props?.formik.errors.business_landmark)}
                                fullWidth
                                helperText={props?.formik.touched.business_landmark && props?.formik.errors.business_landmark}
                                label="Landmark"
                                margin="normal"
                                name="business_landmark"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="Any landmark near business"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl margin="normal">
                            <FormLabel>Locality of Business ?</FormLabel>
                            <RadioGroup
                                row
                                name="business_locality"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Excellent", "Good", "Average"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.businessPremiseType && props?.formik.errors.businessPremiseType)}
                                fullWidth
                                helperText={props?.formik.touched.businessPremiseType && props?.formik.errors.businessPremiseType}
                                label="Type of Ownership"
                                margin="normal"
                                name="businessPremiseType"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. rented, owned, etc."
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_office_type && props?.formik.errors.business_office_type)}
                                fullWidth
                                helperText={props?.formik.touched.business_office_type && props?.formik.errors.business_office_type}
                                label="Type of Office"
                                margin="normal"
                                name="business_office_type"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. residential, commercial, etc."
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_hours && props?.formik.errors.business_hours)}
                                fullWidth
                                helperText={props?.formik.touched.business_hours && props?.formik.errors.business_hours}
                                label="Daily Business Hours"
                                margin="normal"
                                name="business_hours"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 8"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_website && props?.formik.errors.business_website)}
                                fullWidth
                                helperText={props?.formik.touched.business_website && props?.formik.errors.business_website}
                                label="Business Website"
                                margin="normal"
                                name="business_website"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. fashionly.xo"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.employeeCount && props?.formik.errors.employeeCount)}
                                fullWidth
                                helperText={props?.formik.touched.employeeCount && props?.formik.errors.employeeCount}
                                label="Total Employees"
                                margin="normal"
                                name="employeeCount"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 10"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched.workNature && props?.formik.errors.workNature)}
                                fullWidth
                                helperText={props?.formik.touched.workNature && props?.formik.errors.workNature}
                                label="Nature of Business"
                                margin="normal"
                                name="workNature"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. trade, service, etc."
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_branches && props?.formik.errors.business_branches)}
                                fullWidth
                                helperText={props?.formik.touched.business_branches && props?.formik.errors.business_branches}
                                label="Business Branches (if any)"
                                margin="normal"
                                name="business_branches"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 3"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal" sx={{pl: 4}}>
                            <FormLabel>Employment Terms</FormLabel>
                            <RadioGroup
                                row
                                name="employment_terms"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Part-Time", "Full-Time"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.business_time && props?.formik.errors.business_time)}
                                fullWidth
                                helperText={props?.formik.touched.business_time && props?.formik.errors.business_time}
                                label="Years of business/employment"
                                margin="normal"
                                name="business_time"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 4"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl margin="normal">
                            <FormLabel>Name plate outside business ?</FormLabel>
                            <RadioGroup
                                row
                                name="business_name_plate"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Yes", "No"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                                Facilities at Premises 
                            </Typography>
                        </Grid>
                        {
                            [
                                {
                                    label: "Reception Area",
                                    name: "business_reception"
                                },
                                {
                                    label: "Security Guard",
                                    name: "business_security"
                                },
                                {
                                    label: "Cabin",
                                    name: "business_cabin"
                                },
                                {
                                    label: "Security/Typist",
                                    name: "business_typist"
                                },
                                {
                                    label: "Air Conditioner",
                                    name: "business_ac"
                                },
                                {
                                    label: "Xerox",
                                    name: "business_xerox"
                                },
                                {
                                    label: "Fax",
                                    name: "business_fax"
                                },
                                {
                                    label: "Computer",
                                    name: "business_computer"
                                }].map((facility, idx)=> (
                                <Grid item key={idx} xs={12} md={3}>
                                    <FormControl margin="normal">
                                    <FormLabel>{facility.label}</FormLabel>
                                    <RadioGroup
                                        row
                                        name={`${facility.name}`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                    >
                                        {["Yes", "No"]?.map((item, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                        />
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                            ))
                        }
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.officeArea && props?.formik.errors.officeArea)}
                                fullWidth
                                helperText={props?.formik.touched.officeArea && props?.formik.errors.officeArea}
                                label="Business Office Size"
                                margin="normal"
                                name="officeArea"
                                onBlur={()=> console.log(props?.formik.values)
                                    //props?.formik.handleBlur
                                }
                                onChange={props?.formik.handleChange}
                                type="text"
                                variant="outlined"
                                placeholder="e.g. 12*13 sq.feet"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.applicant_cibil && props?.formik.errors.applicant_cibil)}
                                fullWidth
                                helperText={props?.formik.touched.applicant_cibil && props?.formik.errors.applicant_cibil}
                                label="Applicant CIBIL Score"
                                margin="normal"
                                name="applicant_cibil"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 750"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.coApplicant_cibil && props?.formik.errors.coApplicant_cibil)}
                                fullWidth
                                helperText={props?.formik.touched.coApplicant_cibil && props?.formik.errors.coApplicant_cibil}
                                label="Co-Applicant CIBIL Score"
                                margin="normal"
                                name="coApplicant_cibil"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 750"
                            />
                        </Grid>
                        <Grid item xs={12} md={8} sx={{mt: 3}}>
                            <Typography color={"textSecondary"} variant={"h6"}>
                                Proof Images
                            </Typography>
                            {props?.uploadedFile?.length > 0 && showImages()}
                            <Button
                                startIcon={<UploadIcon fontSize="small" />}
                                sx={{ mr: 1, mt: 3 }}
                                component="label"
                            >
                                Upload Business Proof Images
                                <input
                                type="file"
                                hidden
                                multiple
                                onChange={(e) => handleUpload(e)}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ mt: 5 }}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mb: 2 }}>
                              Company Stamp
                            </Typography>
                            {props?.uploadedStamp?.length > 0 && showStamp()}
                            <Button
                              startIcon={<UploadIcon fontSize="small" />}
                              sx={{ mr: 1 }}
                              component="label"
                            >
                              Upload Stamp
                              <input
                                type="file"
                                hidden
                                multiple
                                onChange={(e) => handleStampUpload(e)}
                              />
                            </Button>
                            <h5 style={{ color: "crimson", marginTop: 8 }}>
                              {" "}
                              * Disclaimer: Please upload only company or organization stamp here.
                              Stamp should ideally be in png format.
                            </h5>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        py: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 5,
                    }}
                    >
                    <Button
                        color="success"
                        disabled={!props?.formik.isValid}
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </Box>
            </form>
        </>
    );
}

export default DDAForm;