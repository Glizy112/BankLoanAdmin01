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

export const applicationProfileArr = [{
    // {
    //     id: 1,
    //     value: 'Select from below',
    // },
    educationQualification: [
        {
            value: 'Below 10th',
        },
        {
            value: '10th Pass',
        },
        {
            value: '12th Pass',
        },
        {
            value: 'Diploma/ITI Certification',
        },
        {
            value: 'Graduate',
        },
        {
            value: 'PG/Professional Certification',
        },
    ],
    maritalStatus: [
        {
            id: 2,
            value: 'Single',
        },
        {
            id: 3,
            value: 'Married',
        },
        {
            id: 4,
            value: 'Prefer not to answer',
        },
    ],
    category: [
        {
            value: 'General',
        },
        {
            value: 'SC',
        },
        {
            value: 'ST',
        },
        {
            value: 'OBC',
        },
        {
            value: 'Others',
        },
    ],
    currentResidenceTime: [
        {
            value: '<=1 Year',
        },
        {
            value: '1-3 Years',
        },
        {
            value: '3-5 Years',
        },
        {
            value: '>5 Years',
        },
        {
            value: 'Others',
        },
    ],
    currentResidenceSize: [
        {
            value: '1 RK',
        },
        {
            value: '1 BHK',
        },
        {
            value: '2 BHK',
        },
        {
            value: '>2 BHK',
        }
    ],
    currentCityYears: [
        {
            value: "<=3 Years",
        },
        {
            value: ">3 Years",
        }
    ],
    assets: [
        {
            value: 'Smartphone (Yes)'
        },
        {
            value: 'Washing Machine'
        },
        {
            value: 'Car RC No: '
        },
        {
            value: 'Two-Wheeler (Yes) RC No: '
        },
        {
            value: 'Auto/Cab RC No: '
        },
        {
            value: 'Computer/Laptop (NO)'
        },
        {
            value: 'AC'
        },
        {
            value: 'Fridge (Yes)'
        },
        {
            value: 'Induction (Yes/No)'
        },
    ],
    investments: [
        {
            value: 'Property',
        },
        {
            value: 'Insurance (LIC)',
        },
        {
            value: 'Fixed Deposit',
        },
        {
            value: 'Chit Funds',
        },
        {
            value: 'Post Office Savings',
        },
    ],
    businessProfile: [
        {
            value: 'Auto Driver',
        },
        {
            value: 'Auto Garage/Two Wheeler Repairing Shop',
        },
        {
            value: 'Cab Driver',
        },
        {
            value: 'Carpenter',
        },
        {
            value: 'Kirana Shop',
        },
        {
            value: 'Caterers',
        },
        {
            value: 'Coaching Classes',
        },
        {
            value: 'Computer/Mobile Repair Shop',
        },
        {
            value: 'Diamond Contractors(Polishing work of jewellery)',
        },
        {
            value: 'Cyber Cafe',
        },
        {
            value: 'Fast Food Outlet',
        },
        {
            value: 'Labour Contractor',
        },
        {
            value: 'Milk/Dairy Product Vendor',
        },
        {
            value: 'Pan Shop Owner',
        },
        {
            value: 'Photography/Studio',
        },
        {
            value: 'Spa & Hair Salon',
        },
        {
            value: 'Tailor',
        },
        {
            value: 'Vegetable & Fruit Vendor',
        },
        {
            value: 'Vendor',
        }
        //Other, please specify-> To be Vendor
    ],
    businessPremiseType: [
        {
            value: 'Co-Owned',
        },
        {
            value: 'Self Owned',
        },
        {
            value: 'Joint Ownership',
        },
        {
            value: 'Others',
        },
    ],
    officeArea: [
        {
            value: '<250 Sq. Ft.',
        },
        {
            value: '251-400 Sq. Ft.',
        },
        {
            value: '>400 Sq. Ft.',
        },
    ],
    premisesLocality: [
        {
            value: 'Residential',
        },
        
        {
            value: 'Corporate Hub/Office Space',
        },
        {
            value: 'Commercial',
        },
        {
            value: 'Industrial',
        },
        {
            value: 'Others',
        },
    ],
    businessPopularity: [
        {
            value: 'Average',
        },
        {
            value: 'Good',
        },
        {
            value: 'High',
        },
    ],
    businessStartedBy: [
        {
            value: 'Self',
        },
        {
            value: 'Father/Other Family members',
        },
        {
            value: 'NA',
        },
        {
            value: 'Others',
        },
    ],
    initialFunds: [
        {
            value: 'Own Funding',
        },
        {
            value: 'Borrowed from Family',
        },
        {
            value: 'Loan',
        },
        {
            value: 'Others',
        },
    ],
    loanPurpose: [
        {
            value: 'Flat Purchase',
        },
        {
            value: 'House Purchase',
        },
        {
            value: 'Plot Purchase',
        },
        {
            value: 'Construction',
        },
        {
            value: 'Improvement/Extension',
        },
        {
            value: 'Balance Transfer',
        },
        {
            value: 'Others',
        },
    ],
    propToPurchaseStatus: [
        {
            value: 'Plot to be purchased',
        },
        {
            value: 'Under Construction',
        },
        {
            value: 'Construction Yet to Start',
        },
        {
            value: 'Others',
        },
    ],
    usageOfPurchasedProp: [
        {
            value: 'Self-Occupancy',
        },
        {
            value: 'Investment',
        },
        {
            value: 'Others',
        },
    ]
}] 

function PDVerifyPage(props) {

    const previousBusinessArr = [
        {
            label: 'Name of Previous Business',
            value: 'previousBusinessName',
            fieldType: 'text',
        },
        {
            label: 'Time worked there (in years)',
            value: 'previousBusinessTime',
            fieldType: 'number',
        },
        {
            label: 'Reason for change in business',
            value: 'previousBusinessChangeReason',
            fieldType: 'text',
        },
        {
            label: 'Total work experience (in years)',
            value: 'previousWorkExperience',
            fieldType: 'number',
        },
        {
            label: 'Business Email ID',
            value: 'businessEmail',
            fieldType: 'text',
        },
        {
            label: 'Business Landline Number',
            value: 'businessLandline',
            fieldType: 'number',
        },
    ]

    const existingLoanArr = [
        {
            label: 'Loan Type',
            value: props?.formik.values.loan_type,
            fieldType: 'text',
            helperText: 'e.g. Personal, Business',
            formCheckLabel: 'loan_type',
        },
        {
            label: 'Lending Insitution Name',
            value: props?.formik.values.existing_bank,
            fieldType: 'text',
            helperText: 'e.g. HDFC Bank, Axis Bank',
            formCheckLabel: 'existing_bank',
        },
        {
            label: 'Loan Amount (in Rs.)',
            value: props?.formik.values.loan_amt,
            fieldType: 'text',
            helperText: 'e.g. 500000',
            formCheckLabel: 'loan_amt',
        },
        {
            label: 'Tenure Remaining',
            value: props?.formik.values.remainingPastLoanTenure,
            fieldType: 'text',
            helperText: 'e.g. 4 months',
            formCheckLabel: 'remainingPastLoanTenure',
        },
        {
            label: 'EMI',
            value: props?.formik.values.emi,
            fieldType: 'text',
            helperText: 'e.g. every 6 months for 3 years',
            formCheckLabel: 'emi',
        },
    ]

    const reqLoanFieldsArr = [
        {
            label: 'Minimum Required Loan Amount',
            value: 'loan_amt_req',
            fieldType: 'number',
            placeholder: 'e.g. 1000000'
        },
        {
            label: 'Tenure Required',
            value: 'loan_tenure_req',
            fieldType: 'text',
            placeholder: 'e.g. 2 years'
        },
        {
            label: 'Monthly Household Expenses',
            value: 'monthlyHouseExpenses',
            fieldType: 'number',
            placeholder: 'e.g. 40000'
        },   
        {
            label: 'Comfortable EMI',
            value: 'desiredEMI',
            fieldType: 'number',
            placeholder: 'e.g. 16000'
        },
    ]

    const loanFundsInfo = [
        {
            label: 'Purchase Cost',
            value: 'purchase_cost',
            fieldType: 'number',
        },
        {
            label: 'Construction Estimate',
            value: 'construct_estimate',
            fieldType: 'number',
        },
        {
            label: 'Registration/Stamp Duty Charges',
            value: 'reg_charges',
            fieldType: 'number',
        },
        {
            label: 'Other expenses',
            value: 'other_loan_expenses',
            fieldType: 'number',
        },
        {
            label: 'Total Transaction Cost',
            value: 'total_loan_cost',
            fieldType: 'number',
        },
    ]

    const ownFundsSourceInfo = [
        {
            label: 'Savings',
            value: 'own_fund_saving',
            fieldType: 'number',
        },
        {
            label: 'Family/Friends',
            value: 'own_fund_family',
            fieldType: 'number',
        },
        {
            label: 'Other Loan Taken',
            value: 'own_fund_other_loan',
            fieldType: 'number',
        },
        {
            label: 'Total Amount Spent',
            value: 'own_fund_total_amount',
            fieldType: 'number',
        },
        // {
        //     label: 'Mode of Payment to Seller',
        //     value: 'own_fund_mode_payment',
        //     fieldType: 'number',
        // },
    ]

    const [assetsOwnedArr, setAssetsOwnedArr] = useState([]);
    const [investmentsArr, setInvestmentsArr] = useState([]);
    const [familyDetail, setFamilyDetail] = useState([
        //name: '', gender: '', age: 0, employmentType: '', education: '', contact: 0, stayingTogether: false
    ]);
    //const [uploadFile, setUploadFile] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    //console.log("Owned Assets Array-> ", props?.formik.values.ownedAssets);

    const handleMultipleSelectAssetsChange =(event)=> {
        const { target: { value } } = event;
        const formattedValue = (typeof value === 'string' ? value.split(',') : value);
        setAssetsOwnedArr(formattedValue);
    }
    const handleMultipleSelectInvestmentsChange =(event)=> {
        const { target: { value } } = event;
        const formattedValue = (typeof value === 'string' ? value.split(',') : value);
        setInvestmentsArr(formattedValue);
    }
    const handleFamilyDetailChange =(event)=> {
        //console.log("Target event-> ", event);
        const { target: { value, name } } = event;
        // const formattedValue = (typeof value === 'string' ? value.split(',') : value);
        console.log("Current values-> ", name, value);
        //setFamilyDetail({[name]: value});
        
    }
    //console.log("Marital touched-> ", props?.formik.touched.marital_status);

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
                            // value={''}
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.application_id && props?.formik.errors.application_id)}
                            fullWidth
                            helperText={props?.formik.touched.application_id && props?.formik.errors.application_id}
                            label="Application Number"
                            margin="normal"
                            name="application_id"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            placeholder="IL6823614"
                            //InputLabelProps={{shrink: false}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.pd_status && props?.formik.errors.pd_status)}
                            fullWidth
                            helperText={props?.formik.touched.pd_status && props?.formik.errors.pd_status}
                            label="Status of PD"
                            margin="normal"
                            name="pd_status"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            placeholder="e.g. positive or negative"
                            //InputLabelProps={{shrink: false}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.aadhar_card && props?.formik.errors.aadhar_card)}
                            fullWidth
                            helperText={props?.formik.touched.aadhar_card && "e.g. Aadhar Card or PAN Card"
                                //props?.formik.errors.aadhar_card
                            }
                            label="KYC Verification Method"
                            margin="normal"
                            name="aadhar_card"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            //InputLabelProps={{shrink: false}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.visitDate_business_setup && props?.formik.errors.visitDate_business_setup)}
                            fullWidth
                            helperText={props?.formik.touched.visitDate_business_setup && props?.formik.errors.visitDate_business_setup
                            }
                            label="Address of Venue"
                            margin="normal"
                            name="visitDate_business_setup"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            placeholder="Enter full business name with address"
                            //InputLabelProps={{shrink: false}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.name && props?.formik.errors.name)}
                            fullWidth
                            helperText={props?.formik.touched.name && props?.formik.errors.name
                            }
                            label="Applicant Name"
                            margin="normal"
                            name="name"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            placeholder="Enter applicant name"
                            //InputLabelProps={{shrink: false}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="marital-stat">Marital Status</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.marital_status && props?.formik.errors.marital_status)}
                                fullWidth
                                id="marital-stat-input"
                                labelId="marital-stat"
                                label="Marital Status"
                                margin="normal"
                                name="marital_status"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].maritalStatus?.map(stat=> (
                                        <MenuItem key={stat.id} value={stat.value}> {stat.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="education">Educational Qualification</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.education_quali && props?.formik.errors.education_quali)}
                                fullWidth
                                id="education-qualification-input"
                                labelId="education"
                                label="Educational Qualification"
                                margin="normal"
                                name="education_quali"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].educationQualification?.map((edu, idx)=> (
                                        <MenuItem key={idx} value={edu.value}> {edu.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="applicant-category">Applicant Category</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.category && props?.formik.errors.category)}
                                fullWidth
                                id="category-input"
                                labelId="applicant-category"
                                label="Applicant Category"
                                margin="normal"
                                name="category"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].category?.map((cat, idx)=> (
                                        <MenuItem key={idx} value={cat.value}> {cat.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            //error={Boolean(props?.formik.touched.noOfChildren && props?.formik.error.noOfChildren)}
                            fullWidth
                            //helperText={props?.formik.touched.noOfChildren && props?.formik.error.noOfChildren}
                            label="Dependant Children"
                            //margin="normal"
                            name="noOfChildren"
                            onBlur={()=> {
                                //props?.formik.handleBlur();
                                console.log('No. of children-> ', props?.formik.values.noOfChildren);
                            }}
                            onChange={props?.formik.handleChange}
                            type="number"
                            variant="outlined"
                            placeholder="e.g. 2"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            //error={Boolean(props?.formik.touched.noOfAdults && props?.formik.error.noOfAdults)}
                            fullWidth
                            //helperText={props?.formik.touched.noOfAdults && props?.formik.error.noOfAdults}
                            label="Dependant Adults"
                            //margin="normal"
                            name="noOfAdults"
                            onBlur={()=> {
                                //props?.formik.handleBlur();
                                console.log('No. of adults-> ', props?.formik.values.noOfAdults);
                            }}
                            onChange={props?.formik.handleChange}
                            type="number"
                            variant="outlined"
                            placeholder="e.g. 2"
                        />
                    </Grid>
                    {/* {
                        [
                            {label: 'Dependant Children', value: props?.formik.values.noOfChildren}, 
                            {label: 'Dependant Adults', value: props?.formik.values.noOfAdults}
                        ].map((dependant)=> (
                        <Grid key={dependant} item xs={12} md={3}>
                            <TextField
                                error={Boolean(props?.formik.touched[dependant.value] && props?.formik.errors[dependant.value])}
                                fullWidth
                                helperText={props?.formik.touched[dependant.value] && props?.formik.errors[dependant.value]}
                                label={dependant?.label}
                                //margin="normal"
                                name={dependant?.value}
                                onBlur={()=> {
                                    //props?.formik.handleBlur();
                                    console.log(`No. of ${dependant.label==="Dependant Children" ? "Children" : "Adults"}-> `, dependant?.value);
                                }}
                                onChange={props?.formik.handleChange}
                                type="number"
                                variant="outlined"
                                placeholder="e.g. 2"
                            />
                        </Grid>
                        ))
                    } */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="residence-time">Current Residence Time</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.currentResidenceTime && props?.formik.errors.currentResidenceTime)}
                                fullWidth
                                id="residence-time-input"
                                labelId="residence-time"
                                label="Current Residence Time"
                                margin="normal"
                                name="currentResidenceTime"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].currentResidenceTime?.map((timePeriod, idx)=> (
                                        <MenuItem key={idx} value={timePeriod.value}> {timePeriod.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="residence-size">Current Residence House Size</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.currentResidenceSize && props?.formik.errors.currentResidenceSize)}
                                fullWidth
                                id="residence-size-input"
                                labelId="residence-size"
                                label="Current Residence House Size"
                                margin="normal"
                                name="currentResidenceSize"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].currentResidenceSize?.map((size, idx)=> (
                                        <MenuItem key={idx} value={size.value}> {size.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        props?.formik.values.currentResidenceTime===applicationProfileArr[0].currentResidenceTime[0].value &&
                    (<>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.previousAddress && props?.formik.errors.previousAddress)}
                                fullWidth
                                helperText={props?.formik.touched.previousAddress && "Applicable if less than 1 year at present address"
                                    //props?.formik.errors.previousAddress
                                }
                                label="Previous Address"
                                //margin="normal"
                                name="previousAddress"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter here"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.previousAddressTime && props?.formik.errors.previousAddressTime)}
                                fullWidth
                                helperText={props?.formik.touched.previousAddressTime && "Applicable if less than 1 year at present address"
                                    //props?.formik.errors.previousAddressTime
                                }
                                label="Years stayed at previous address"
                                //margin="normal"
                                name="previousAddressTime"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter number of years"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                    </>)
                    }
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="current-city-time">Years in Current City</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.currentCityTime && props?.formik.errors.currentCityTime)}
                                fullWidth
                                id="current-city-time-input"
                                labelId="current-city-time"
                                label="Years in Current City"
                                margin="normal"
                                name="currentCityTime"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].currentCityYears?.map((timePeriod, idx)=> (
                                        <MenuItem key={idx} value={timePeriod.value}> {timePeriod.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        props?.formik.values.currentCityTime===applicationProfileArr[0].currentCityYears[0].value &&
                    (<>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.previousCityName && props?.formik.errors.previousCityName)}
                                fullWidth
                                helperText={props?.formik.touched.previousCityName && "Applicable if less than 3 years in current city"
                                    //props?.formik.errors.previousCityName
                                }
                                label="Previous City"
                                //margin="normal"
                                name="previousCityName"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter city name"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.previousCityTime && props?.formik.errors.previousCityTime)}
                                fullWidth
                                helperText={props?.formik.touched.previousCityTime && "Applicable if less than 3 years in current city"
                                    //props?.formik.errors.previousCityTime
                                }
                                label="Years stayed in previous city"
                                //margin="normal"
                                name="previousCityTime"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter number of years"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.cityChangeReason && props?.formik.errors.cityChangeReason)}
                                fullWidth
                                helperText={props?.formik.touched.cityChangeReason && "Applicable if less than 3 years in current city"
                                    //props?.formik.errors.cityChangeReason
                                }
                                label="Reason for change of city"
                                //margin="normal"
                                name="cityChangeReason"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter reason"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                    </>)
                    }
                    <Grid item xs={12} md={4}>
                        <FormControl sx={{pl: 1}}>
                            <FormLabel>Parents staying with ?</FormLabel>
                            <RadioGroup
                                row
                                name="livingWithParents"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Y", "N"]?.map((item, idx) => (
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
                        props?.formik.values.livingWithParents==="N" &&
                    (
                        <>
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.parentsResidingCity && props?.formik.errors.parentsResidingCity)}
                                fullWidth
                                helperText={props?.formik.touched.parentsResidingCity && "Applicable if parents living separately"
                                    //props?.formik.errors.parentsResidingCity
                                }
                                label="Residing city of parents"
                                margin="normal"
                                name="parentsResidingCity"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter city name"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>   
                        <Grid item xs={12} md={4}>
                            <TextField
                                error={Boolean(props?.formik.touched.parentsResidenceType && props?.formik.errors.parentsResidenceType)}
                                fullWidth
                                helperText={props?.formik.touched.parentsResidenceType && "Applicable if parents living separately"
                                    //props?.formik.errors.parentsResidenceType
                                }
                                label="Residence Property Ownership"
                                margin="normal"
                                name="parentsResidenceType"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="e.g owned, rented"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid> 
                        </>
                    )
                    }
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3}}>
                            Assets and Investments
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="applicant-assets">Assets Owned</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.ownedAssets && props?.formik.errors.ownedAssets)}
                                fullWidth
                                multiple
                                id="applicant-assets-input"
                                labelId="applicant-assets"
                                label="Assets Owned"
                                margin="normal"
                                name="ownedAssets"
                                onBlur={()=> {
                                    //props?.formik.handleBlur();
                                    if(assetsOwnedArr?.length < props?.formik.values.ownedAssets?.length){
                                        props?.formik.values.ownedAssets?.splice(0, props?.formik.values.ownedAssets?.length, ...assetsOwnedArr);
                                    }
                                    assetsOwnedArr.forEach(item=> {
                                        if(!props?.formik.values.ownedAssets?.includes(item)){
                                            props?.formik.values.ownedAssets?.push(item); 
                                        } 
                                    })
                                    console.log("Owned Assets-> ", props?.formik.values.ownedAssets);
                                }}
                                onChange={handleMultipleSelectAssetsChange}
                                defaultValue={""}
                                value={assetsOwnedArr}
                                renderValue={(selected)=> selected.join(', ')}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].assets?.map((asset, idx)=> (
                                        <MenuItem key={idx} value={asset.value}> 
                                            <Checkbox checked={assetsOwnedArr?.indexOf(asset.value) > -1}/>
                                            <ListItemText primary={asset.value}/>
                                        {/* {asset.value}  */}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="applicant-investments">Investments</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.investments && props?.formik.errors.investments)}
                                fullWidth
                                multiple
                                id="applicant-investments-input"
                                labelId="applicant-investments"
                                label="Investments"
                                margin="normal"
                                name="investments"
                                onBlur={()=> {
                                    //props?.formik.handleBlur();
                                    if(investmentsArr?.length < props?.formik.values.investments?.length){
                                        props?.formik.values.investments?.splice(0, props?.formik.values.investments?.length, ...investmentsArr);
                                    }
                                    investmentsArr.forEach(item=> {
                                        if(!props?.formik.values.investments?.includes(item)){
                                            props?.formik.values.investments?.push(item); 
                                        } 
                                    })
                                    console.log("Investments-> ", props?.formik.values.investments);
                                }}
                                onChange={handleMultipleSelectInvestmentsChange}
                                defaultValue={""}
                                value={investmentsArr}
                                renderValue={(selected)=> selected.join(', ')}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].investments?.map((investment, idx)=> (
                                        <MenuItem key={idx} value={investment.value}> 
                                            <Checkbox checked={investmentsArr?.indexOf(investment.value) > -1}/>
                                            <ListItemText primary={investment.value}/>
                                        {/* {asset.value}  */}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl margin= "normal">
                            <FormLabel>Consume nicotine products / alcohol ?</FormLabel>
                            <RadioGroup
                                row
                                name="nicotineProducts"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Y", "N"]?.map((item, idx) => (
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
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3}}>
                            Employment Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.business_type && props?.formik.errors.business_type)}
                            fullWidth
                            helperText={props?.formik.touched.business_type && "e.g. self-employed, business owner, employee, etc."
                                //props?.formik.errors.business_type
                            }
                            label="Type of Business Firm"
                            //margin="normal"
                            name="business_type"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            placeholder="Enter business type"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    {
                        props?.formik.values.isPartnership && 
                        (
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={Boolean(props?.formik.touched.shareholdingsPercentage && props?.formik.errors.shareholdingsPercentage)}
                                fullWidth
                                helperText={props?.formik.touched.shareholdingsPercentage && props?.formik.errors.shareholdingsPercentage
                                }
                                label="Partnership shareholdings ( % )"
                                //margin="normal"
                                name="shareholdingsPercentage"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type="text"
                                // value={''}
                                variant="outlined"
                                placeholder="Enter number here"
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        )
                    }
                    {/* <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.business_type && props?.formik.errors.business_type)}
                            fullWidth
                            helperText={props?.formik.touched.business_type && "e.g. self-employed, business owner, employee, etc."
                                //props?.formik.errors.business_type
                            }
                            label="Person Met Designation"
                            //margin="normal"
                            name="business_type"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            placeholder="Should be same as business type"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.businessStartDate && props?.formik.errors.businessStartDate)}
                            fullWidth
                            helperText={props?.formik.touched.businessStartDate && props?.formik.errors.businessStartDate}
                            label="Business Starting Date"
                            //margin="normal"
                            name="businessStartDate"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="date"
                            // value={''}
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.business_time && props?.formik.errors.business_time)}
                            fullWidth
                            helperText={props?.formik.touched.business_time && "Enter only the number"
                                //props?.formik.errors.business_time
                            }
                            label="Business Running Since (in years)"
                            margin="normal"
                            name="business_time"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="number"
                            // value={''}
                            variant="outlined"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    {
                    props?.formik.values.business_time >= 3 && (
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.previousBusinessAddress && props?.formik.errors.previousBusinessAddress)}
                            fullWidth
                            helperText={props?.formik.touched.previousBusinessAddress && "Applicable if < 3 years at present address"
                                //props?.formik.errors.business_time
                            }
                            label="Previous Business Address"
                            margin="normal"
                            name="previousBusinessAddress"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    )}
                    {
                        props?.formik.values.business_time >= 3 &&
                        (<> 
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"label"} sx={{ mt: 3}}>
                                If current business running less than 3 years, then fill below details-
                            </Typography>
                        </Grid>
                        {
                            previousBusinessArr.map((item, idx)=> (
                                <Grid item xs={12} md={6} key={idx}>
                                    <TextField
                                        error={Boolean(props?.formik.touched[item.value] && props?.formik.errors[item.value])}
                                        fullWidth
                                        helperText={props?.formik.touched[item.value] && props?.formik.errors[item.value]}
                                        label={item.label}
                                        margin="normal"
                                        name={item.value}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={props?.formik.handleChange}
                                        type={item.fieldType}
                                        // value={''}
                                        variant="outlined"
                                        //InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                            ))
                        }
                        </>)
                    }
                    
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3}}>
                            Business Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Type of industry</FormLabel>
                            <RadioGroup
                                row
                                name="industryType"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                            >
                                {["Trading", "Services"]?.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                    sx={item==="Services" ? {pl: 3} : {pl: 0.5}}
                                />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="business-profile">Select Business Profile</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.businessProfile && props?.formik.errors.businessProfile)}
                                fullWidth
                                id="business-profile-input"
                                labelId="business-profile"
                                label="Select Business Profile"
                                margin="normal"
                                name="businessProfile"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].businessProfile?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="business-premise-type">Business Premise Ownership</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.businessPremiseType && props?.formik.errors.businessPremiseType)}
                                fullWidth
                                id="business-premise--type-input"
                                labelId="business-premise-type"
                                label="Business Premise Ownership"
                                margin="normal"
                                name="businessPremiseType"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].businessPremiseType?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="office-area">Total Office Area</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.officeArea && props?.formik.errors.officeArea)}
                                fullWidth
                                id="office-area-input"
                                labelId="office-area"
                                label="Total Office Area"
                                margin="normal"
                                name="officeArea"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].officeArea?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="premises-locality">Business Premises Locality</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.premisesLocality && props?.formik.errors.premisesLocality)}
                                fullWidth
                                id="business-premises-locality-input"
                                labelId="premises-locality"
                                label="Business Premises Locality"
                                margin="normal"
                                name="premisesLocality"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].premisesLocality?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.sales_receipt && props?.formik.errors.sales_receipt)}
                            fullWidth
                            helperText={props?.formik.touched.sales_receipt && "Enter turnover amount"
                                //props?.formik.errors.sales_receipt
                            }
                            label="Annual Turnover (in lacs)"
                            //margin="normal"
                            name="sales_receipt"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="number"
                            // value={''}
                            variant="outlined"
                            placeholder="e.g. 500000"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.net_profit && props?.formik.errors.net_profit)}
                            fullWidth
                            helperText={props?.formik.touched.net_profit && "Enter net profit amount"
                                //props?.formik.errors.net_profit
                            }
                            label="Net Profit Margin (in lacs)"
                            //margin="normal"
                            name="net_profit"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="number"
                            // value={''}
                            variant="outlined"
                            placeholder="e.g. 300000"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.employeeCount && props?.formik.errors.employeeCount)}
                            fullWidth
                            helperText={props?.formik.touched.employeeCount && props?.formik.errors.employeeCount
                            }
                            label="Total no. of employees"
                            //margin="normal"
                            name="employeeCount"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="number"
                            // value={''}
                            variant="outlined"
                            placeholder="e.g. 10"
                            //InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3, mb: 3}}>
                            Profile Description of Employees/Staff
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.rolesInBusiness && props?.formik.errors.rolesInBusiness)}
                            fullWidth
                            helperText={props?.formik.touched.rolesInBusiness && "Enter total no. of designated roles"}
                            label="No. of designations in business"
                            name="rolesInBusiness"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="number"
                            variant="outlined"
                            placeholder="e.g. 4"
                        />
                    </Grid>
                    {
                        props?.formik.values.rolesInBusiness === 0 &&
                        (
                            <Grid item xs={12} md={12}>
                                <Typography color={"#f05"} variant={"label"} sx={{ mt: 5, justifyContent: 'center'}}>
                                    Please provide number of total designations
                                </Typography>
                            </Grid>
                        )
                    }
                    {
                        Array.from(Array(props?.formik.values.rolesInBusiness)).map((inputField, idx)=> (
                            <Grid container spacing={2} pl={2} key={idx}>
                                <Grid key={`${idx}_designationName`} item xs={12} md={3}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.businessEmployeeProfile && props?.formik.errors.businessEmployeeProfile)}
                                        fullWidth
                                        label="Name of the Designation"
                                        margin="normal"
                                        name={`businessEmployeeProfile.${idx}.designationName`}
                                        onBlur={()=> {
                                            console.log('Business Employee Profile-> ', props?.formik.values.businessEmployeeProfile);
                                        }}
                                        onChange={ props?.formik.handleChange}
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_totalEmployees`} item xs={12} md={3}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.businessEmployeeProfile && props?.formik.errors.businessEmployeeProfile)}
                                        fullWidth
                                        label="Total Employess in the Designation"
                                        margin="normal"
                                        name={`businessEmployeeProfile.${idx}.totalEmployees`}
                                        onBlur={props?.formik.handleBlur}
                                            //console.log('Business Employee Profile-> ', props?.formik.values.businessEmployeeProfile);   
                                        onChange={ props?.formik.handleChange}
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="business-popularity">Business Popularity</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.businessPopularity && props?.formik.errors.businessPopularity)}
                                fullWidth
                                id="business-popularity-input"
                                labelId="business-popularity"
                                label="Business Popularity"
                                margin="normal"
                                name="businessPopularity"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].businessPopularity?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="person-starting-business">Person starting the business</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.personStartingBusiness && props?.formik.errors.personStartingBusiness)}
                                fullWidth
                                id="person-starting-business-input"
                                labelId="person-starting-business"
                                label="Person starting the business"
                                margin="normal"
                                name="personStartingBusiness"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].businessStartedBy?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        props?.formik.values.personStartingBusiness==="Self" &&
                        (
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="initialFunds-source">Source of Initial Funds</InputLabel>
                                <Select
                                    error={Boolean(props?.formik.touched.businessInitialFunds && props?.formik.errors.businessInitialFunds)}
                                    fullWidth
                                    id="initialFunds-source-input"
                                    labelId="initialFunds-source"
                                    label="Source of Initial Funds"
                                    margin="normal"
                                    name="businessInitialFunds"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    defaultValue={""}
                                    //placeholder="Select from below"
                                    variant="outlined"
                                >
                                    {
                                        applicationProfileArr[0].initialFunds?.map((option, idx)=> (
                                            <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        )
                    }
                    {/* TBD 
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"label"} sx={{ mt: 3, mb: 3}}>
                            Past Employment/Business Details
                        </Typography>
                    </Grid> */}

                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3}}>
                                Business Income Computation (Monthly Basis)
                            </Typography>
                        </Grid>

                    </Grid> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    {" "}
                    <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5, mb: 2 }}>
                    Financial Assessments
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell
                            rowSpan={1}
                            colSpan={5}
                            width={"100%"}
                            sx={{
                                textAlign: "center",
                                backgroundColor: "#688eff",
                                color: "#FFF",
                                fontWeight: "bold",
                            }}
                            >
                            <h4>Business Income Computation (Monthly Basis)</h4>
                            </TableCell>
                        </TableRow>
                        <TableCell
                            colSpan={5}
                            width={"100%"}
                            sx={{
                            textAlign: "center",
                            backgroundColor: "#ffb349",
                            color: "#FFF",
                            fontWeight: "bold",
                            }}
                        >
                            <h3>{props?.formik.values?.name}</h3>
                        </TableCell>

                        <TableRow>
                            <TableCell>Revenue</TableCell>
                            <TableCell align="right">Amount {`(in Rs.)`}</TableCell>
                            <TableCell align="right">Expenditures</TableCell>
                            <TableCell align="right">Amount {`(in Rs.)`}</TableCell>
                        </TableRow>
                        </TableHead>
                      <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Sales Receipt
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.sales_receipt && props?.formik.errors.sales_receipt
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.sales_receipt && props?.formik.errors.sales_receipt
                                    }
                                    margin="normal"
                                    name="sales_receipt"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                            <TableCell align="right">Purchases</TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.purchases && props?.formik.errors.purchases
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.purchases && props?.formik.errors.purchases
                                    }
                                    margin="normal"
                                    name="purchases"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row" align="right">
                                Shop Rent
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.rent_expenses && props?.formik.errors.rent_expenses
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.rent_expenses && props?.formik.errors.rent_expenses
                                    }
                                    margin="normal"
                                    name="rent_expenses"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row" align="right">
                                Employees Salary
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.salaries && props?.formik.errors.salaries
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.salaries && props?.formik.errors.salaries
                                    }
                                    margin="normal"
                                    name="salaries"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                            {/* <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row" align="right">
                                Utility Expenses {`(Electricity/Gas)`}
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.electricity && props?.formik.errors.electricity
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.electricity && props?.formik.errors.electricity
                                    }
                                    margin="normal"
                                    name="electricity"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row" align="right">
                                Conveyance/Petrol
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.petrol_expenses && props?.formik.errors.petrol_expenses
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.petrol_expenses && props?.formik.errors.petrol_expenses
                                    }
                                    margin="normal"
                                    name="petrol_expenses"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row"/>
                            <TableCell component="th" scope="row" align="right">
                                Other Expenses
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    error={Boolean(
                                    props?.formik.touched.misc_exps && props?.formik.errors.misc_exps
                                    )}
                                    fullWidth
                                    helperText={
                                    props?.formik.touched.misc_exps && props?.formik.errors.misc_exps
                                    }
                                    margin="normal"
                                    name="misc_exps"
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type="number"
                                    sx={{marginTop: 0, marginBottom: 0}}
                                    // value={''}}
                                    variant="outlined"
                                    placeholder="Enter Here .."
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow sx={{
                                textAlign: "center",
                                backgroundColor: "#00CCFF",
                                color: "#FFF",
                                fontWeight: "bold",
                            }}>
                            <TableCell component="th" scope="row">
                            <h4>Total Annual Revenue</h4>
                            </TableCell>
                            <TableCell align="left">
                            <h4>
                                {" "}
                                {props?.formik.values.sales_receipt}
                            </h4>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                            <h4>Total Monthly Expenses</h4>
                            </TableCell>
                            <TableCell align="left">
                            <h4>
                                {" "}
                                {props?.formik.values.purchases + props?.formik.values.rent_expenses + props?.formik.values.salaries + props?.formik.values.electricity + props?.formik.values.petrol_expenses + props?.formik.values.misc_exps}
                            </h4>
                            </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5}}>
                            Existing or Past Loan Details
                        </Typography>
                    </Grid>
                    {
                        existingLoanArr.map((item, idx)=> (
                            <Grid item xs={12} md={6} key={idx}>
                                <TextField
                                    error={Boolean(props?.formik.touched[item.formCheckLabel] && props?.formik.errors[item.formCheckLabel])}
                                    fullWidth
                                    helperText={
                                        //props?.formik.touched[item.formCheckLabel] && 
                                        item?.helperText 
                                        //: props?.formik.errors[item.value]
                                    }
                                    label={item.label}
                                    margin="normal"
                                    name={item.value}
                                    onBlur={props?.formik.handleBlur}
                                    onChange={props?.formik.handleChange}
                                    type={item.fieldType}
                                    // value={''}
                                    variant="outlined"
                                    //InputLabelProps={{shrink: true}}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5}}>
                            Loan Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="loan-purpose">Purpose of Loan</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.funds_usage && props?.formik.errors.funds_usage)}
                                fullWidth
                                id="loan-purpose-input"
                                labelId="loan-purpose"
                                label="Purpose of Loan"
                                margin="normal"
                                name="funds_usage"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].loanPurpose?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        reqLoanFieldsArr.map((item, idx)=> (
                        <Grid item xs={12} md={6} key={idx}>
                            <TextField
                                error={Boolean(props?.formik.touched[item.value] && props?.formik.errors[item.value])}
                                fullWidth
                                helperText={props?.formik.touched[item.value] && props?.formik.errors[item.value]}
                                label={item.label}
                                margin={item.value!=="loan_amt_req" ? "normal" : 'none'}
                                name={item.value}
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type={item.fieldType}
                                // value={''}
                                variant="outlined"
                                placeholder={item.placeholder}
                                //InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        ))
                    }
                    <Grid item xs={12} md={6} sx={{mt: 2}}>
                        <FormControl fullWidth>
                            <InputLabel id="status-prop-to-purchase">Status of Property</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.statusOfPropToPurchase && props?.formik.errors.statusOfPropToPurchase)}
                                fullWidth
                                id="status-prop-purchase-input"
                                labelId="status-prop-to-purchase"
                                label="Status of Property"
                                margin="normal"
                                name="statusOfPropToPurchase"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0].propToPurchaseStatus?.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{mt: 2}}>
                        <FormControl fullWidth>
                            <InputLabel id="usage-of-prop">Usage of that Property</InputLabel>
                            <Select
                                error={Boolean(props?.formik.touched.propertyUsage && props?.formik.errors.propertyUsage)}
                                fullWidth
                                id="usage-of-prop-input"
                                labelId="usage-of-prop"
                                label="Usage of that Property"
                                margin="normal"
                                name="propertyUsage"
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                defaultValue={""}
                                //placeholder="Select from below"
                                variant="outlined"
                            >
                                {
                                    applicationProfileArr[0]?.usageOfPurchasedProp.map((option, idx)=> (
                                        <MenuItem key={idx} value={option.value}> {option.value} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5}}>
                            Cost and Funds Information (Loan Details)
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"label"} sx={{ mt: 2}}>
                            Funds Required
                        </Typography>
                    </Grid>
                    {
                        loanFundsInfo.map((item, idx)=> (
                        <Grid item xs={12} md={6} key={idx}>
                            <TextField
                                error={Boolean(props?.formik.touched[item.value] && props?.formik.errors[item.value])}
                                fullWidth
                                helperText={props?.formik.touched[item.value] && props?.formik.errors[item.value]}
                                label={item.label}
                                margin="normal"
                                name={item.value}
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type={item.fieldType}
                                variant="outlined"
                            />
                        </Grid>
                        ))
                    }
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"label"} sx={{ mt: 3}}>
                            Source of Own Funds
                        </Typography>
                    </Grid>
                    {
                        ownFundsSourceInfo.map((item, idx)=> (
                        <Grid item xs={12} md={6} key={idx}>
                            <TextField
                                error={Boolean(props?.formik.touched[item.value] && props?.formik.errors[item.value])}
                                fullWidth
                                helperText={props?.formik.touched[item.value] && props?.formik.errors[item.value]}
                                label={item.label}
                                margin="normal"
                                name={item.value}
                                onBlur={props?.formik.handleBlur}
                                onChange={props?.formik.handleChange}
                                type={item.fieldType}
                                variant="outlined"
                            />
                        </Grid>
                        ))
                    }
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5}}>
                            Other Family Member Details
                        </Typography>
                    </Grid>
                    {/* <p> Inputs to be appeared here.. </p> */}
                    {
                        (props?.formik.values.noOfChildren || props?.formik.values.noOfAdults) === 0
                        &&
                        (
                            <Grid item xs={12} md={12}>
                                <Typography color={"#f05"} variant={"label"} sx={{ mt: 5, justifyContent: 'center'}}>
                                    Please select number of dependants first
                                </Typography>
                            </Grid>
                        )
                    }
                    {
                        Array.from(Array(props?.formik.values.noOfChildren + props?.formik.values.noOfAdults)).map((inputField, idx)=> (
                            <Grid container spacing={2} pl={2} key={idx}>
                                <Grid key={`${idx}_name`} item xs={12} md={3} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.familyDetail && props?.formik.errors.familyDetail)}
                                        fullWidth
                                        label="Name"
                                        margin="normal"
                                        name={`familyDetail.${idx}.name`}
                                        onBlur={()=> {
                                                console.log('Name of dependant-> ', props?.formik.values.familyDetail);
                                        }}
                                        onChange={ props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_gender`} item xs={12} md={3} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Gender"
                                        margin="normal"
                                        name={`familyDetail.${idx}.gender`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_age`} item xs={12} md={3} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        margin="normal"
                                        name={`familyDetail.${idx}.age`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_workType`} item xs={12} md={3} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Employment Type"
                                        margin="normal"
                                        name={`familyDetail.${idx}.employmentType`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_education`} item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Educational Qualification"
                                        name={`familyDetail.${idx}.education`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_contact`} item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Contact No."
                                        name={`familyDetail.${idx}.contact`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                            
                                        }
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_stayCheck`} item xs={12} md={3}>
                                    <TextField 
                                        fullWidth
                                        label="Staying with Applicant"
                                        name={`familyDetail.${idx}.stayingTogether`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5}}>
                            Business References
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.noOfBusinessRefs && props?.formik.errors.noOfBusinessRefs)}
                            fullWidth
                            label="Total Business References"
                            //margin="normal"
                            name="noOfBusinessRefs"
                            // onBlur={()=> {
                            //         console.log('Business References-> ', props?.formik.values.businessRefs);
                            // }}
                            onChange={props?.formik.handleChange}
                            type="number"
                            variant="outlined"
                            placeholder="e.g. 2"
                        />
                    </Grid>
                    <Grid item md={6}/>
                    {/* <p> Inputs to be appeared here.. </p> */}
                    {
                        props?.formik.values.noOfBusinessRefs === 0
                        &&
                        (
                            <Grid item xs={12} md={12}>
                                <Typography color={"#f05"} variant={"label"} sx={{ mt: 5, justifyContent: 'center'}}>
                                    Please provide number of business references first
                                </Typography>
                            </Grid>
                        )
                    }
                    {
                        Array.from(Array(props?.formik.values.noOfBusinessRefs)).map((inputField, idx)=> (
                            <Grid container spacing={2} pl={2} key={idx}>
                                <Grid key={`${idx}_name`} item xs={12} md={4} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.businessRefs && props?.formik.errors.businessRefs)}
                                        fullWidth
                                        label="Name"
                                        margin="normal"
                                        name={`businessRefs.${idx}.name`}
                                        onBlur={()=> {
                                            console.log('Business References-> ', props?.formik.values.businessRefs);
                                        }}
                                        onChange={ props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_address`} item xs={12} md={4} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        margin="normal"
                                        name={`businessRefs.${idx}.address`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        multiline
                                        type="textarea"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_relation`} item xs={12} md={4} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Relationship"
                                        margin="normal"
                                        name={`businessRefs.${idx}.relationship`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_contact`} item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Contact Number"
                                        name={`businessRefs.${idx}.contact`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_email`} item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name={`businessRefs.${idx}.email`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_knowTime`} item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Time known the applicant (in Yrs.)"
                                        name={`businessRefs.${idx}.knowingTime`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                            
                                        }
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5}}>
                            Neighbour References
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            error={Boolean(props?.formik.touched.noOfNeighbourRefs && props?.formik.errors.noOfNeighbourRefs)}
                            fullWidth
                            label="Total Neighbour References"
                            //margin="normal"
                            name="noOfNeighbourRefs"
                            // onBlur={()=> {
                            //         console.log('Name of dependant-> ', props?.formik.values.noOfBusinessRefs);
                            // }}
                            onChange={props?.formik.handleChange}
                            type="number"
                            variant="outlined"
                            placeholder="e.g. 2"
                        />
                    </Grid>
                    <Grid item md={6}/>
                    {/* <p> Inputs to be appeared here.. </p> */}
                    {
                        props?.formik.values.noOfNeighbourRefs === 0
                        &&
                        (
                            <Grid item xs={12} md={12}>
                                <Typography color={"#f05"} variant={"label"} sx={{ mt: 5, justifyContent: 'center'}}>
                                    Please provide number of neighbour references first
                                </Typography>
                            </Grid>
                        )
                    }
                    {
                        Array.from(Array(props?.formik.values.noOfNeighbourRefs)).map((inputField, idx)=> (
                            <Grid container spacing={2} pl={2} key={idx}>
                                <Grid key={`${idx}_name`} item xs={12} md={4} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        error={Boolean(props?.formik.touched.neighbourRefs && props?.formik.errors.neighbourRefs)}
                                        fullWidth
                                        label="Name"
                                        margin="normal"
                                        name={`neighbourRefs.${idx}.name`}
                                        onBlur={()=> {
                                            console.log('Neighbour References-> ', props?.formik.values.neighbourRefs)
                                        }}
                                        onChange={ props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_address`} item xs={12} md={4} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        margin="normal"
                                        name={`neighbourRefs.${idx}.address`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        multiline
                                        type="textarea"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_businessName`} item xs={12} md={4} mt={idx!=='1' ? 3 : 0}>
                                    <TextField
                                        fullWidth
                                        label="Business Firm Name"
                                        margin="normal"
                                        name={`neighbourRefs.${idx}.businessFirmName`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_contact`} item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Contact Number"
                                        name={`neighbourRefs.${idx}.contact`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_knowTime`} item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Time known the applicant (in Yrs.)"
                                        name={`neighbourRefs.${idx}.knowingTime`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                            
                                        }
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid key={`${idx}_feedback`} item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name={`neighbourRefs.${idx}.feedbackAboutApplicant`}
                                        onBlur={props?.formik.handleBlur}
                                        onChange={ 
                                            props?.formik.handleChange
                                        }
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container spacing={2} sx={{mt: 5}}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={Boolean(props?.formik.touched.discussionDate && props?.formik.errors.discussionDate)}
                            fullWidth
                            helperText={props?.formik.touched.discussionDate && props?.formik.errors.discussionDate}
                            label="Date of Discussion"
                            margin="normal"
                            name="discussionDate"
                            onBlur={props?.formik.handleBlur}
                            onChange={props?.formik.handleChange}
                            type="date"
                            // value={''}
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
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

PDVerifyPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PDVerifyPage;