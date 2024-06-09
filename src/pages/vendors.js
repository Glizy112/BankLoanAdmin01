/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable react/jsx-max-props-per-line */
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
import PDVerifyPage from "./pd-cum-verify";
import PDVerifyPDF from "../components/vendor/pdverify-pdf";
import DDAForm from "./ddaForm";
import DdaPDF from "../components/vendor/dda-pdf";

const ReactRTE = dynamic(() => import("../components/editor/editor"), {
  ssr: false,
});

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadFinancials, setUploadFinancials] = useState(null);
  const [uploadFile, setUploadFile] = useState([]);
  const [uploadStamp, setUploadStamp] = useState([]);
  const [businessProfile, setBusinessProfile] = useState("");
  const [assetBase, setAssetBase] = useState("");
  const [financialNotes, setFinancialNotes] = useState("");
  const [finalDecision, setFinalDecision] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [pdfData, setPdfData] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [financeNotes, setFinanceNotes] =
    useState(`• As per our discussion held with the applicant and ${
      formik?.values.business_type
    } business setup seen, we estimate there are avg. 
  monthly sale of Rs. ${formik?.values.monthlySales}. So, total sales come to Rs. ${
      formik?.values.yearlySales
    } for the effective 320 days in a year.
  • Purchase Material used for work are estimated to ${formik?.values.purchases} Lacs (Being ${(
      formik?.values.misc_exps /
      formik?.values.yearlySales /
      100
    ).toFixed(2)} to sale) as discussed with the applicant 
  and by taking care of profit margin of the business.
  • There ${formik?.values.employeeCount > 1 ? "are" : "is"} ${
      formik?.values.employeeCount
    } employees working in this concern and their average monthly salary is Rs. ${
      formik?.values.avgMonthlySalary
    }/-.
  • There is shop rent is Rs. ${formik?.values.shopRent}/- per month. Other misc Exp is Rs. ${
      formik?.values.misc_exps
    }/- per annum.
  • Net Margin is ${formik?.values.netMargin}.
  • It is pertinent to note that the business is not seasonal and sale is equally spread throughout the year.`);

  useEffect(() => {
    const importModule = async () => {
      //import module on the client-side to get `createEmptyValue` instead of a component
      const module = await import("react-rte");
      setBusinessProfile(module.createEmptyValue());
      setAssetBase(module.createEmptyValue());
      setFinancialNotes(module.createEmptyValue());
      setFinalDecision(module.createEmptyValue());
    };
    importModule();
  }, []);

  const handleFinancialUpload = (e) => {
    setImageLoading(true);
    const arr = uploadFile;

    if (e.target.files) {
      Object.values(e.target.files).map((item) => {
        new Compressor(item, {
          quality: 0.3,
          convertTypes: ["image/png", "image/webp"],
          convertSize: 1000000,
          success(result) {
            const reader = new FileReader();
            reader.onload = (evt) => {
              setUploadFinancials(evt.target.result);
            };
            reader.readAsDataURL(result);
          },
        });
      });
    }
    setTimeout(() => setImageLoading(false), 1000);
  };

  const handleUpload = (e) => {
    setImageLoading(true);
    const arr = [...uploadFile];

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
    setUploadFile(arr);
    //setUploadStamp(arr);
    setTimeout(() => setImageLoading(false), 1000);
  };

  const handleStampUpload = (e) => {
    setImageLoading(true);
    const arr = [...uploadStamp];

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
    setUploadStamp(arr);
    setTimeout(() => setImageLoading(false), 1000);
  };

  const formik = useFormik({
    initialValues: {
      bank: "",
      name: "",
      contact_details: "",
      visitDate: "",
      visitDate_business_setup: "",
      transaction_particulars: "",
      transaction_particulars_business_setup: "",
      application_id: "",
      loan_amt_req: "",
      business_entity: "",
      pd_done_by: "",
      final_recommedation: "",
      margin_assessed: "",
      funds_usage: "",
      existing_bank: "",
      bank_fi: "",
      loan_type: "",
      loan_amt: "",
      emi: "",
      prime_client: "",
      prime_creditor: "",
      pan: "",
      gst: "",
      electricity_bill: "",
      business_registration: "",
      others_records: "",
      aadhar_card: "",
      property_type: "",
      property_usage: "",
      ltv: "",
      property_ownership: "",
      property_bayana: "",
      strength: "",
      weaknesses: "",
      signed_date: "",
      business_profile: "",
      asset_base: "",
      financial_notes: "",
      financial_decision: "",
      opening_stock: 0,
      sales_receipt: 0,
      purchases: 0,
      closing_stock: 0,
      gross_profit: 0,
      salaries: 0,
      misc_exps: 0,
      telephone_mobile: 0,
      electricity: 0,
      rent_expenses: 0,
      net_profit: 0,
      // biz_loc: "",
      // biz_time: 0,
      // biz_signBoard: false,
      // biz_category: "",
      // biz_premisesType: "",
      business_type: "",
      business_time: 0,
      business_location: "",
      business_area: 0,
      employeeCount: 0,
      additionalInfo: "",
      client_occupation: "",
      extra_land_property: "",
      applicantSpouse: "",
      applicant_fullResidentialAddress: "",
      meeting_person: "",
      applicant_family_info: "",
      applicant_residence_time: 0,
      residence_area: "", //(kanal or acre)
      residence_locality: "", //radio(rural or urban)
      property_against_loan: "",
      applicant_neighbourInfo: "", //(neighbour names with phone(optional))
      applicant_referenceInfo: "", //(neighbourName with mobile number)
      workNature: "",
      monthlySales: 0,
      yearlySales: 0,
      avgMonthlySalary: 0,
      shopRent: 0,
      netMargin: 0,

      form_type: "",
      //PD-Cum-Verification Data Variables Start
      marital_status: "",
      pd_status: "",
      education_quali: "",
      currentResidenceTime: "",
      currentResidenceSize: "",
      currentCityTime: "",
      previousAddress: "",
      previousAddressTime: "",
      previousCityName: "",
      previousCityTime: "",
      previousCityChangeReason: "",
      livingWithParents: "",
      parentsResidingCity: "",
      parentsResidenceType: "",
      ownedAssets: [],
      investments: [],
      nicotineProducts: "",
      isPartnership: false,
      shareholdingsPercentage: 0,
      businessStartDate: "",
      previousBusinessName: "",
      previousBusinessAddress: "",
      previousBusinessTime: 0,
      previousBusinessChangeReason: "",
      previousWorkExperience: "",
      businessEmail: "",
      businessLandline: 0,
      industryType: "",
      businessProfile: "", //choosen from select input
      stocksAssetsAtPremises: "",
      businessPremiseType: "",
      officeArea: "",
      premisesLocality: "",
      //isBusinessSeasonal: "", //TBD
      //staffProfile: [{designation: "", noOfEmployees: 0}], //TBD
      //businessAtSameLocationTime: 0, //TBD
      //previousBusinessAddressDetails: "" //TBD
      businessPopularity: "",
      rolesInBusiness: 0,
      businessEmployeeProfile: [
        {
          designationName: '',
          totalEmployees: 0,
        },
      ],
      personStartingBusiness: "",
      businessInitialFunds: "",
      // pastEmploymentOrBusinessDetails: [{
      //   empOrFirmName: '',
      //   designation: '',
      //   from: '',                      //TBD
      //   to: '',
      //   reasonForChange: '',
      //   contactPerson: [{personName: '', personNUmber: ''}]
      // }],
      petrol_expenses: 0,
      remainingPastLoanTenure: "",
      //otherMonthlyIncome: 0 //TBD
      loan_tenure_req: 0,
      monthlyHouseExpenses: 0,
      desiredEMI: 0,
      statusOfPropToPurchase: "",
      propertyUsage: "",
      /*Loan Funds Info Variables Start*/
      purchase_cost: 0,
      construct_estimate: 0,
      reg_charges: 0,
      other_loan_expenses: 0,
      total_loan_cost_cost: 0,
      /*Loan Funds Info Variables End*/
      /*Own Funds Source(OCR) Info Variables Start*/
      own_fund_saving: 0,
      own_fund_family: 0,
      own_fund_other_loan: 0,
      own_fund_total_amount: 0,
      own_fund_mode_payment: "",
      noOfChildren: 0,
      noOfAdults: 0,
      familyDetail: [
        {
          name: "",
          gender: "",
          age: 0,
          employmentType: "",
          education: "",
          contact: 0,
          stayingTogether: "",
        },
      ],
      noOfBusinessRefs: 0,
      businessRefs: [
        {
          name: "",
          address: "",
          relationship: "",
          contact: "",
          email: "",
          knowingTime: 0,
        }
      ],
      noOfNeighbourRefs: 0,
      neighbourRefs: [
        {
          name: "",
          businessFirmName: "",
          address: "",
          contact: "",
          feebackAboutApplicant: "",
          knowingTime: 0,
        }
      ],
      discussionDate: "",
      /*Own Funds Source(OCR) Info Variables End*/
      //familyMemberDetails: '',  //fields from land visits

      /* DDA Form Variables Start */
      trade_license: "",
      existing_bank_time: 0,
      existing_account_type: "",
      existing_account_no: "",
      confidential_opinion: "",
      confidential_opinion_status: "",
      auto_dealer_name: "",
      auto_dealer_established: "",
      auto_dealer_authorized: "",
      authorization_year: "",
      local_dealer_check: "",
      vehicle_manufacturer: "",
      visit_mode: "",
      noOfEarningMembers: 0,
      twVehicle: 0,
      fwVehicle: 0,
      residence_locality_scene: "",
      motorable_entrance: "",
      address_confirmed: "",
      pincode: "",
      landmark: "",
      accommodation_type: "",
      living_standard: "",
      house_colour: "",
      interiors: "",
      assets_seen: "",
      noOfStoreys: 0,
      watchman: "",
      lift: "",
      society_board: "",
      residence_name_plate: "",
      external_appearance: "",
      parking_slot: "",
      residence_remarks: "",
      house_visit_check: "",
      identification_mode: "",
      address_verify_mode: "",
      applicant_aadhaar: "",
      applicant_pan: "",
      applicant_cibil: 0,
      coApplicant_name: "",
      coApplicant_relation: "",
      coApplicant_aadhaar: "",
      coApplicant_pan: "",
      coApplicant_cibil: 0,
      builder_established: "",
      builder_totalProjects: 0,
      builder_soldFlats: 0,
      builder_builtFlats: 0,
      builder_marketEnquiry: "",
      builder_buildQuality: "",
      propertyNature: "",
      projectApproved: "",
      takeover_reason: "",
      original_advance_amount: 0,
      outstanding_amount: 0,
      takeover_regular_check: "",
      loan_residual_period: "",
      takeover_doc_verify_date: "",
      confidential_opinion_banks: "",
      applicant_itr_time_periods: 0, //Number of financial years for which ITR has been reviewed.
      coApplicant_itr_time_periods: 0,
      applicant_itr_periods: [
        {
          session: "", //e.g. 2020-21
          acknowledgementNo: "",
          PAN: "",
          itr_filed_correctly: "",
          gross_total_income: 0,
          total_taxable_income: 0,
          total_itr_tax: 0,
          TDS: 0,
          self_assess_paidTax: 0,
          filing_date: "",
          remarks: ""
        }
      ],
      coApplicant_itr_periods: [
        {
          session: "", //e.g. 2020-21
          acknowledgementNo: "",
          PAN: "",
          itr_filed_correctly: "",
          gross_total_income: 0,
          total_taxable_income: 0,
          total_itr_tax: 0,
          TDS: 0,
          self_assess_paidTax: 0,
          filing_date: "",
          remarks: ""
        }
      ],
      business_bank_account: "", //account number
      business_bank_name: "",
      banking_remarks: "",
      full_business_address: "",
      business_landmark: "",
      business_locality: "",
      business_office_type: "",
      business_hours: 0,
      business_website: "",
      business_branches: 0,
      employment_terms: "",
      business_name_plate: "",
      business_reception: "",
      business_security: "",
      business_cabin: "",
      business_typist: "",
      business_ac: "",
      business_xerox: "",
      business_fax: "",
      business_computer: "",
      /* DDA Form Variables End */
    },
    //   validationSchema: Yup.object({
    //     LANDMARK: Yup.string().required("Field is Required"),

    //   }),
    onSubmit: (values, actions) => {
      let formValues = values;
      formValues.images = uploadFile;
      formValues.stamp = uploadStamp;
      formValues.financialImages = uploadFinancials;

      setPdfData(formValues);
      console.log("Form Values-> ", formValues);

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
      setSelectedForm(formik?.values.form_type);
      setShowPDF(true);
      // setOpen(false);
    },
  });

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
          {uploadFile?.map((item, idx) => (
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
                    onClick={() => setUploadFile(uploadFile?.filter((nItem) => nItem !== item))}
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
        {uploadStamp?.map((item, idx) => (
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
                  onClick={() => setUploadStamp(uploadStamp?.filter((nItem) => nItem !== item))}
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

  const showFinancialImages = () => {
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
          <ImageListItem>
            <img
              src={uploadFinancials}
              alt={`${uploadFinancials}`}
              loading="lazy"
              style={{ width: 100, height: 100 }}
            />
            <ImageListItemBar
              sx={{
                background: "transparent",
              }}
              position="top"
              actionIcon={
                <IconButton sx={{ color: "white" }} onClick={() => setUploadFinancials(null)}>
                  <Trash />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        </ImageList>
      );
    }
  };

  const bullet = "\u2022";
  const bulletWithSpace = `${bullet} `;
  const enter = 13;

  const handleInput = (event, name) => {
    const { keyCode, target } = event;
    const { selectionStart, value } = target;

    if (keyCode === enter) {
      console.log("a");
      target.value = [...value]
        .map((c, i) => (i === selectionStart - 1 ? `\n${bulletWithSpace}` : c))
        .join("");
      console.log(target.value);

      target.selectionStart = selectionStart + bulletWithSpace.length;
      target.selectionEnd = selectionStart + bulletWithSpace.length;
    }

    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }

    formik.setFieldValue(name, target.value);
  };

  function createData(first_particulars, first_actuals, second_particulars, second_actuals) {
    return { first_particulars, first_actuals, second_particulars, second_actuals };
  }

  return (
    <>
      <Head>
        <title>Vendor | Vast Credit Services</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              pt: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <EmptyState width={350} />
            <Button variant="contained" onClick={() => setIsOpen(!isOpen)}>
              Create New Vendor Report
            </Button>
          </Box>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="responsive-dialog-title"
            fullWidth
            maxWidth={"md"}
          >
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ m: 3, alignSelf: "center" }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-form-type">Select Form Type</InputLabel>
                    <Select
                      error={Boolean(formik.touched.form_type && formik.errors.form_type)}
                      fullWidth
                      id="select-form-type-input"
                      labelId="select-form"
                      label="Select Form Type"
                      margin="normal"
                      name="form_type"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      defaultValue={""}
                      placeholder="Select from below"
                      variant="outlined"
                    >
                      {["PD-Vendor Format", "PD-cum-Verification Format", "DDA Form Format"]?.map(
                        (option, idx) => (
                          <MenuItem key={idx} value={option}>
                            {" "}
                            {option}{" "}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {formik.values.form_type !== "" && (
                <DialogTitle id="responsive-dialog-title">
                  {"Kindly Fill the below details"}
                </DialogTitle>
              )}
              <DialogContent sx={{ my: 2 }}>
                <DialogContentText>
                  {formik.values.form_type !== "" && (
                    <Typography color={"textSecondary"} variant={"h6"} sx={{ mb: 3 }}>
                      Information to be filled For {(formik.values?.form_type==="PD-Vendor Format" && 'IIFL') || (formik.values?.form_type==="PD-cum-Verification Format") && 'AIP' || (formik.values?.form_type==="DDA Form Format") && 'DDA'}
                    </Typography>
                  )}
                  {formik.values.form_type === "PD-Vendor Format" && (
                    <form onSubmit={formik.handleSubmit}>
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.bank && formik.errors.bank)}
                              fullWidth
                              helperText={formik.touched.bank && formik.errors.bank}
                              label="Bank / NBFC"
                              margin="normal"
                              name="bank"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}
                              variant="outlined"
                              placeholder="Enter Bank Name"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.name && formik.errors.name)}
                              fullWidth
                              helperText={formik.touched.name && formik.errors.name}
                              label="Person Name"
                              margin="normal"
                              name="name"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}
                              variant="outlined"
                              placeholder="Mr. Singh"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.contact_details && formik.errors.contact_details
                              )}
                              fullWidth
                              helperText={
                                formik.touched.contact_details && formik.errors.contact_details
                              }
                              label="Contact Details"
                              margin="normal"
                              name="contact_details"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}
                              variant="outlined"
                              placeholder="(9322455565 / 5553332221)"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.visitDate && formik.errors.visitDate)}
                              fullWidth
                              helperText={formik.touched.visitDate && formik.errors.visitDate}
                              label="Date of Visit"
                              margin="normal"
                              name="visitDate"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="date"
                              // value={''}
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                            {/* <TextField
                            error={Boolean(
                              formik.touched.visitDate_business_setup &&
                                formik.errors.visitDate_business_setup
                            )}
                            fullWidth
                            helperText={
                              formik.touched.visitDate_business_setup &&
                              formik.errors.visitDate_business_setup
                            }
                            label="Business Setup"
                            margin="normal"
                            name="visitDate_business_setup"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            // value={''}
                            variant="outlined"
                          /> */}
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.transaction_particulars &&
                                  formik.errors.transaction_particulars
                              )}
                              fullWidth
                              helperText={
                                formik.touched.transaction_particulars &&
                                formik.errors.transaction_particulars
                              }
                              label="Transaction Particulars"
                              margin="normal"
                              name="transaction_particulars"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="date"
                              // value={''}
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                              error={Boolean(
                                formik.touched.transaction_particulars_business_setup &&
                                  formik.errors.transaction_particulars_business_setup
                              )}
                              fullWidth
                              helperText={
                                formik.touched.transaction_particulars_business_setup &&
                                formik.errors.transaction_particulars_business_setup
                              }
                              label="Business Setup Visited"
                              margin="normal"
                              name="transaction_particulars_business_setup"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.visitDate_business_setup &&
                                  formik.errors.visitDate_business_setup
                              )}
                              fullWidth
                              helperText={
                                formik.touched.visitDate_business_setup &&
                                formik.errors.visitDate_business_setup
                              }
                              label="Business Setup"
                              margin="normal"
                              name="visitDate_business_setup"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}
                              variant="outlined"
                            />
                            <TextField
                              error={Boolean(
                                formik.touched.application_id && formik.errors.application_id
                              )}
                              fullWidth
                              helperText={
                                formik.touched.application_id && formik.errors.application_id
                              }
                              label="Application ID"
                              margin="normal"
                              name="application_id"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}? task?.LANDMARK}
                              variant="outlined"
                              placeholder="Enter Application ID"
                            />
                          </Grid>
                          <Grid item xs={12} md={12} />
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.loan_amt_req && formik.errors.loan_amt_req
                              )}
                              fullWidth
                              helperText={formik.touched.loan_amt_req && formik.errors.loan_amt_req}
                              label="Loan Amount Requested"
                              margin="normal"
                              name="loan_amt_req"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}SC ?? task?.["VILLAGE_DESC"]}
                              variant="outlined"
                              placeholder="Enter Loan Amount Requested"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.business_entity && formik.errors.business_entity
                              )}
                              fullWidth
                              helperText={
                                formik.touched.business_entity && formik.errors.business_entity
                              }
                              label="Business Entity"
                              margin="normal"
                              name="business_entity"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="M/s. General Store - Self Employed - Mr. Singh"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.pd_done_by && formik.errors.pd_done_by)}
                              fullWidth
                              helperText={formik.touched.pd_done_by && formik.errors.pd_done_by}
                              label="PD Done By"
                              margin="normal"
                              name="pd_done_by"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.final_recommedation &&
                                  formik.errors.final_recommedation
                              )}
                              fullWidth
                              helperText={
                                formik.touched.final_recommedation &&
                                formik.errors.final_recommedation
                              }
                              label="Final Recommendation"
                              margin="normal"
                              name="final_recommedation"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.margin_assessed && formik.errors.margin_assessed
                              )}
                              fullWidth
                              helperText={
                                formik.touched.margin_assessed && formik.errors.margin_assessed
                              }
                              label="Margin Assessed"
                              margin="normal"
                              name="margin_assessed"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.funds_usage && formik.errors.funds_usage
                              )}
                              fullWidth
                              helperText={formik.touched.funds_usage && formik.errors.funds_usage}
                              label="End Usage Of Funds"
                              margin="normal"
                              name="funds_usage"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 3 }}>
                              Detailed business Profile & Background
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.business_type && formik.errors.business_type
                              )}
                              fullWidth
                              helperText={
                                formik.touched.business_type &&
                                "E.g. grocery store, farming, dairy, etc."
                                //formik.errors.business_type
                              }
                              label="Business Type"
                              margin="normal"
                              name="business_type"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter business type"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.business_time && formik.errors.business_time
                              )}
                              fullWidth
                              helperText={
                                formik.touched.business_time && formik.errors.business_time
                              }
                              label="Time since business(in years)"
                              margin="normal"
                              name="business_time"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="number"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="e.g. 5 or 10"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.business_area && formik.errors.business_area
                              )}
                              fullWidth
                              helperText={
                                formik.touched.business_area && "E.g. 2 kanal or 2 acres"
                                //formik.errors.business_area
                              }
                              label="Business Area"
                              margin="normal"
                              name="business_area"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter total area"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.employeeCount && formik.errors.employeeCount
                              )}
                              fullWidth
                              helperText={
                                formik.touched.employeeCount && formik.errors.employeeCount
                              }
                              label="Total employees"
                              margin="normal"
                              name="employeeCount"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="number"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="e.g. 10"
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextField
                              error={Boolean(
                                formik.touched.additionalInfo && formik.errors.additionalInfo
                              )}
                              fullWidth
                              helperText={
                                formik.touched.additionalInfo &&
                                "More detailed information about the business"
                                //formik.errors.additionalInfo
                              }
                              label="Additional Info"
                              margin="normal"
                              name="additionalInfo"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="textarea"
                              multiline
                              rows={10}
                              // value={``}
                              variant="outlined"
                              placeholder="Enter text"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.client_occupation && formik.errors.client_occupation
                              )}
                              fullWidth
                              helperText={
                                formik.touched.client_occupation &&
                                "e.g. farmer, retailer, engineer, etc."
                                //formik.errors.client_occupation
                              }
                              label="Applicant Occupation"
                              margin="normal"
                              name="client_occupation"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter occupation"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.extra_land_property &&
                                  formik.errors.extra_land_property
                              )}
                              fullWidth
                              helperText={
                                formik.touched.extra_land_property &&
                                "e.g. agriculture land, residential plot, etc."
                                //formik.errors.extra_land_property
                              }
                              label="Owned property(s)"
                              margin="normal"
                              name="extra_land_property"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter other property."
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.applicantSpouse && formik.errors.applicantSpouse
                              )}
                              fullWidth
                              helperText={
                                formik.touched.applicantSpouse && formik.errors.applicantSpouse
                              }
                              label="Applicant Spouse Name"
                              margin="normal"
                              name="applicantSpouse"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter applicant spouse name"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.applicant_fullResidentialAddress &&
                                  formik.errors.applicant_fullResidentialAddress
                              )}
                              fullWidth
                              helperText={
                                formik.touched.applicant_fullResidentialAddress &&
                                formik.errors.applicant_fullResidentialAddress
                              }
                              label="Full residential address"
                              margin="normal"
                              name="applicant_fullResidentialAddress"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              multiline
                              // value={``}
                              variant="outlined"
                              placeholder="H.No.123, ABC Colony, XYZ City.."
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.meeting_person && formik.errors.meeting_person
                              )}
                              fullWidth
                              helperText={
                                formik.touched.meeting_person && formik.errors.meeting_person
                              }
                              label="Meeting Person"
                              margin="normal"
                              name="meeting_person"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter the meeting person."
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.applicant_family_info &&
                                  formik.errors.applicant_family_info
                              )}
                              fullWidth
                              helperText={
                                formik.touched.applicant_family_info &&
                                "e.g. wife, 2 children, father and mother."
                                //formik.errors.applicant_family_info
                              }
                              label="Applicant Family Info."
                              margin="normal"
                              name="applicant_family_info"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter family information"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.applicant_residence_time &&
                                  formik.errors.applicant_residence_time
                              )}
                              fullWidth
                              helperText={
                                formik.touched.applicant_residence_time &&
                                formik.errors.applicant_residence_time
                              }
                              label="Time since residence(in years)"
                              margin="normal"
                              name="applicant_residence_time"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="number"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="e.g. 10"
                            />
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.residence_area && formik.errors.residence_area
                              )}
                              fullWidth
                              helperText={
                                formik.touched.residence_area && "e.g. 2 kanal or 2 acres."
                                //formik.errors.residence_area
                              }
                              label="Total Residence Area"
                              margin="normal"
                              name="residence_area"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter total area"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormControl sx={{ pl: 2, pt: 2 }}>
                              <FormLabel>Residence Locality</FormLabel>
                              <RadioGroup
                                row
                                name="residence_locality"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                {["Rural", "Urban"]?.map((item, idx) => (
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
                              error={Boolean(
                                formik.touched.property_against_loan &&
                                  formik.errors.property_against_loan
                              )}
                              fullWidth
                              helperText={
                                formik.touched.property_against_loan &&
                                "e.g. residential, commercial, etc."
                                //formik.errors.property_against_loan
                              }
                              label="Loan against property"
                              margin="normal"
                              name="property_against_loan"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter property type."
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.applicant_neighbourInfo &&
                                  formik.errors.applicant_neighbourInfo
                              )}
                              fullWidth
                              helperText={
                                formik.touched.applicant_neighbourInfo &&
                                "e.g. darshan garg-8937843983, rani garg-9397249343"
                                //formik.errors.applicant_neighbourInfo
                              }
                              label="Applicant Neighbour Info"
                              margin="normal"
                              name="applicant_neighbourInfo"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter neighbour info."
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              error={Boolean(
                                formik.touched.applicant_referenceInfo &&
                                  formik.errors.applicant_referenceInfo
                              )}
                              fullWidth
                              helperText={
                                formik.touched.applicant_referenceInfo &&
                                "e.g. Rohan Goyal-9435242243."
                                //formik.errors.applicant_referenceInfo
                              }
                              label="Applicant Reference"
                              margin="normal"
                              name="applicant_referenceInfo"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "biz_category")}
                              //rows={6}
                              type="text"
                              //multiline
                              // value={``}
                              variant="outlined"
                              placeholder="Enter reference info."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextField
                              error={Boolean(
                                formik.touched.business_profile && formik.errors.business_profile
                              )}
                              fullWidth
                              helperText={
                                formik.touched.business_profile && formik.errors.business_profile
                              }
                              label="Additional Remarks on Detailed business & Background"
                              margin="normal"
                              name="business_profile"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              rows={10}
                              type="textarea"
                              multiline
                              variant="outlined"
                              placeholder="Fill the fields given below to see the full text here..."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextField
                              error={Boolean(
                                formik.touched.existing_bank && formik.errors.existing_bank
                              )}
                              fullWidth
                              helperText={
                                formik.touched.existing_bank && formik.errors.existing_bank
                              }
                              label="Existing Bank / Loan Facilities"
                              margin="normal"
                              name="existing_bank"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.bank_fi && formik.errors.bank_fi)}
                              fullWidth
                              helperText={formik.touched.bank_fi && formik.errors.bank_fi}
                              label="Bank / FI"
                              margin="normal"
                              name="bank_fi"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.loan_type && formik.errors.loan_type)}
                              fullWidth
                              helperText={formik.touched.loan_type && formik.errors.loan_type}
                              label="Loan Type"
                              margin="normal"
                              name="loan_type"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.loan_amt && formik.errors.loan_amt)}
                              fullWidth
                              helperText={formik.touched.loan_amt && formik.errors.loan_amt}
                              label="Loan Amount"
                              margin="normal"
                              name="loan_amt"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.emi && formik.errors.emi)}
                              fullWidth
                              helperText={formik.touched.emi && formik.errors.emi}
                              label="EMI"
                              margin="normal"
                              name="emi"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5 }}>
                              Major Debitors & Creditors
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.prime_client && formik.errors.prime_client
                              )}
                              fullWidth
                              helperText={formik.touched.prime_client && formik.errors.prime_client}
                              label="Prime Client"
                              margin="normal"
                              name="prime_client"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.prime_creditor && formik.errors.prime_creditor
                              )}
                              fullWidth
                              helperText={
                                formik.touched.prime_creditor && formik.errors.prime_creditor
                              }
                              label="Prime Creditors"
                              margin="normal"
                              name="prime_creditor"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextField
                              error={Boolean(formik.touched.asset_base && formik.errors.asset_base)}
                              fullWidth
                              helperText={formik.touched.asset_base && formik.errors.asset_base}
                              label="Asset Base & Vehicle Details"
                              margin="normal"
                              name="asset_base"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "asset_base")}
                              rows={6}
                              type="textarea"
                              multiline
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {" "}
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5 }}>
                              Documents Verified During PD
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControl>
                              <FormLabel>PAN</FormLabel>
                              <RadioGroup
                                row
                                name="pan"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
                          <Grid item xs={12} md={6}>
                            <FormControl>
                              <FormLabel>GST</FormLabel>
                              <RadioGroup
                                row
                                name="gst"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
                          <Grid item xs={12} md={6}>
                            <FormControl>
                              <FormLabel>Business Registration Proof</FormLabel>
                              <RadioGroup
                                row
                                name="business_registration"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
                          <Grid item xs={12} md={6}>
                            <FormControl>
                              <FormLabel>Electricity Bill (for latest 2-3 months) </FormLabel>
                              <RadioGroup
                                row
                                name="electricity_bill"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
                          <Grid item xs={12} md={6}>
                            <FormControl>
                              <FormLabel>Employee Register</FormLabel>
                              <RadioGroup
                                row
                                name="emp_register"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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

                          <Grid item xs={12} md={6}>
                            <FormControl>
                              <FormLabel>Others (kacha records)</FormLabel>
                              <RadioGroup
                                row
                                name="others_records"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                {["Y (Purchase bills were shown to us)", "N"]?.map((item, idx) => (
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
                              <FormLabel>Aadhar Card</FormLabel>
                              <RadioGroup
                                row
                                name="aadhar_card"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
                          <Grid item xs={12} md={12}>
                            {" "}
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5 }}>
                              Property Description
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.property_type && formik.errors.property_type
                              )}
                              fullWidth
                              helperText={
                                formik.touched.property_type && formik.errors.property_type
                              }
                              label="Property Type"
                              margin="normal"
                              name="property_type"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.property_usage && formik.errors.property_usage
                              )}
                              fullWidth
                              helperText={
                                formik.touched.property_usage && formik.errors.property_usage
                              }
                              label="Property Usage"
                              margin="normal"
                              name="property_usage"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.ltv && formik.errors.ltv)}
                              fullWidth
                              helperText={formik.touched.ltv && formik.errors.ltv}
                              label="Tentative LTV"
                              margin="normal"
                              name="ltv"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.property_ownership &&
                                  formik.errors.property_ownership
                              )}
                              fullWidth
                              helperText={
                                formik.touched.property_ownership &&
                                formik.errors.property_ownership
                              }
                              label="Ownership"
                              margin="normal"
                              name="property_ownership"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.property_bayana && formik.errors.property_bayana
                              )}
                              fullWidth
                              helperText={
                                formik.touched.property_bayana && formik.errors.property_bayana
                              }
                              label="Bayana / Token Money"
                              margin="normal"
                              name="property_bayana"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>

                          <Grid item xs={12} md={12}>
                            <TextField
                              error={Boolean(formik.touched.strength && formik.errors.strength)}
                              fullWidth
                              helperText={formik.touched.strength && formik.errors.strength}
                              label="Strengths"
                              margin="normal"
                              name="strength"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="textarea"
                              rows={6}
                              multiline
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextField
                              error={Boolean(formik.touched.weaknesses && formik.errors.weaknesses)}
                              fullWidth
                              helperText={formik.touched.weaknesses && formik.errors.weaknesses}
                              label="Weaknesses"
                              margin="normal"
                              name="weaknesses"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="textarea"
                              multiline
                              rows={6}
                              // value={''}Name}
                              variant="outlined"
                              placeholder="Enter Here .."
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {" "}
                            <Typography color={"textSecondary"} variant={"h6"} sx={{ mt: 5 }}>
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
                                      <h4>Income statement /TRADING, PROFIT AND LOSS ACCOUNT</h4>
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
                                    <h3>{formik.formik?.values.name}</h3>
                                  </TableCell>

                                  <TableRow>
                                    <TableCell>Particulars</TableCell>
                                    <TableCell align="right">Actual for year</TableCell>
                                    <TableCell align="right">Particulars</TableCell>
                                    <TableCell align="right">Actual for year</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Opening Stock
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.opening_stock &&
                                            formik.errors.opening_stock
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.opening_stock &&
                                          formik.errors.opening_stock
                                        }
                                        margin="normal"
                                        name="opening_stock"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell align="right">
                                      Sales / Receipt & Commission
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.sales_receipt &&
                                            formik.errors.sales_receipt
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.sales_receipt &&
                                          formik.errors.sales_receipt
                                        }
                                        margin="normal"
                                        name="sales_receipt"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Purchases & Direct Expenses
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.purchases && formik.errors.purchases
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.purchases && formik.errors.purchases
                                        }
                                        margin="normal"
                                        name="purchases"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell align="right">Closing Stock</TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.closing_stock &&
                                            formik.errors.closing_stock
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.closing_stock &&
                                          formik.errors.closing_stock
                                        }
                                        margin="normal"
                                        name="closing_stock"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row" align="left">
                                      Gross Profit
                                    </TableCell>
                                    <TableCell align="left">
                                      {formik.values.sales_receipt +
                                        formik.values.closing_stock -
                                        (formik.values.opening_stock + formik.values.purchases)}
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                  </TableRow>

                                  <TableRow
                                    sx={{
                                      textAlign: "center",
                                      backgroundColor: "#00CCFF",
                                      color: "#FFF",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      <h4>Total</h4>
                                    </TableCell>
                                    <TableCell align="left">
                                      <h4>
                                        {" "}
                                        {formik.values.opening_stock +
                                          formik.values.purchases +
                                          (formik.values.sales_receipt +
                                            formik.values.closing_stock) -
                                          (formik.values.opening_stock + formik.values.purchases)}
                                      </h4>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                      <h4>Total</h4>
                                    </TableCell>
                                    <TableCell align="left">
                                      <h4>
                                        {" "}
                                        {formik.values.sales_receipt + formik.values.closing_stock}
                                      </h4>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell component="th" scope="row" align="left">
                                      Salaries / Wages Paid (In Lakhs)
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.salaries && formik.errors.salaries
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.salaries && formik.errors.salaries
                                        }
                                        margin="normal"
                                        name="salaries"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                      Gross Profit
                                    </TableCell>
                                    <TableCell align="left">
                                      {formik.values.sales_receipt +
                                        formik.values.closing_stock -
                                        (formik.values.opening_stock + formik.values.purchases)}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Misc Exps
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.misc_exps && formik.errors.misc_exps
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.misc_exps && formik.errors.misc_exps
                                        }
                                        margin="normal"
                                        name="misc_exps"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Telephone & Mobile
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.telephone_mobile &&
                                            formik.errors.telephone_mobile
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.telephone_mobile &&
                                          formik.errors.telephone_mobile
                                        }
                                        margin="normal"
                                        name="telephone_mobile"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Electricity Expenses
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.electricity && formik.errors.electricity
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.electricity && formik.errors.electricity
                                        }
                                        margin="normal"
                                        name="electricity"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Rent Expenses
                                    </TableCell>
                                    <TableCell align="right">
                                      <TextField
                                        error={Boolean(
                                          formik.touched.rent_expenses &&
                                            formik.errors.rent_expenses
                                        )}
                                        fullWidth
                                        helperText={
                                          formik.touched.rent_expenses &&
                                          formik.errors.rent_expenses
                                        }
                                        margin="normal"
                                        name="rent_expenses"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="number"
                                        sx={{ marginTop: 0, marginBottom: 0 }}
                                        // value={''}}
                                        variant="outlined"
                                        placeholder="Enter Here .."
                                      />
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Net Profit
                                    </TableCell>
                                    <TableCell align="left">
                                      <h4>
                                        {" "}
                                        {formik.values.sales_receipt +
                                          formik.values.closing_stock -
                                          (formik.values.opening_stock + formik.values.purchases) -
                                          (formik.values.salaries +
                                            formik.values.misc_exps +
                                            formik.values.telephone_mobile +
                                            formik.values.electricity +
                                            formik.values.rent_expenses)}
                                      </h4>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                  </TableRow>
                                  <TableRow
                                    sx={{
                                      textAlign: "center",
                                      backgroundColor: "#00CCFF",
                                      color: "#FFF",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      <h4>Total</h4>
                                    </TableCell>
                                    <TableCell align="left">
                                      <h4>
                                        {formik.values.salaries +
                                          formik.values.misc_exps +
                                          formik.values.telephone_mobile +
                                          formik.values.electricity +
                                          formik.values.rent_expenses +
                                          (formik.values.sales_receipt +
                                            formik.values.closing_stock -
                                            (formik.values.opening_stock +
                                              formik.values.purchases) -
                                            (formik.values.salaries +
                                              formik.values.misc_exps +
                                              formik.values.telephone_mobile +
                                              formik.values.electricity +
                                              formik.values.rent_expenses))}
                                      </h4>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                      <h4>Total</h4>
                                    </TableCell>
                                    <TableCell align="left">
                                      <h4>
                                        {formik.values.sales_receipt +
                                          formik.values.closing_stock -
                                          (formik.values.opening_stock + formik.values.purchases)}
                                      </h4>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.workNature && formik.errors.workNature)}
                              fullWidth
                              helperText={formik.touched.workNature && formik.errors.workNature}
                              label="Nature of Work"
                              margin="normal"
                              name="workNature"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="text"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here.."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.monthlySales && formik.errors.monthlySales
                              )}
                              fullWidth
                              helperText={formik.touched.monthlySales && formik.errors.monthlySales}
                              label="Monthly Sales (in Rs.)"
                              margin="normal"
                              name="monthlySales"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="e.g. 120000"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.yearlySales && formik.errors.yearlySales
                              )}
                              fullWidth
                              helperText={formik.touched.yearlySales && formik.errors.yearlySales}
                              label="Yearly Sales (in Rs.)"
                              margin="normal"
                              name="yearlySales"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="e.g. 1000000"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.employeeCount && formik.errors.employeeCount
                              )}
                              fullWidth
                              helperText={
                                formik.touched.employeeCount && formik.errors.employeeCount
                              }
                              label="No. of Employees"
                              margin="normal"
                              name="employeeCount"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="Enter Here.."
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.avgMonthlySalary && formik.errors.avgMonthlySalary
                              )}
                              fullWidth
                              helperText={
                                formik.touched.avgMonthlySalary && formik.errors.avgMonthlySalary
                              }
                              label="Average Monthly Salary (in Rs.)"
                              margin="normal"
                              name="avgMonthlySalary"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="e.g. 100000"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.shopRent && formik.errors.shopRent)}
                              fullWidth
                              helperText={formik.touched.shopRent && formik.errors.shopRent}
                              label="Shop Rent (in Rs.)"
                              margin="normal"
                              name="shopRent"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="e.g. 30000"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(formik.touched.netMargin && formik.errors.netMargin)}
                              fullWidth
                              helperText={formik.touched.netMargin && formik.errors.netMargin}
                              label="Net Margin (in %)"
                              margin="normal"
                              name="netMargin"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              //onKeyDown={(e) => handleInput(e, "financial_notes")}
                              rows={6}
                              type="number"
                              // value={''}}
                              variant="outlined"
                              placeholder="e.g. 50%"
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {/* <TextField
                            error={Boolean(
                              formik.touched.financial_decision && formik.errors.financial_decision
                            )}
                            fullWidth
                            helperText={
                              formik.touched.financial_decision && formik.errors.financial_decision
                            }
                            label="Financial Decision"
                            margin="normal"
                            name="financial_decision"
                            onBlur={formik.handleBlur}
                            //onKeyDown={(e) => handleInput(e, "financial_decision")}
                            type="text"
                            // value={''}}
                            variant="outlined"
                            placeholder="Enter Here .."
                          /> */}
                            <FormControl sx={{ pl: 2, pt: 2 }}>
                              <FormLabel>Assumptions/ Explanations for variance PD IS</FormLabel>
                              <RadioGroup
                                row
                                name="financial_decision"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                {["Satisfactory", "Negative", "Unsatisfactory"]?.map(
                                  (item, idx) => (
                                    <FormControlLabel
                                      key={idx}
                                      value={item}
                                      control={<Radio />}
                                      label={item}
                                    />
                                  )
                                )}
                              </RadioGroup>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.signed_date && formik.errors.signed_date
                              )}
                              fullWidth
                              helperText={formik.touched.signed_date && formik.errors.signed_date}
                              label="Signing Date"
                              margin="normal"
                              name="signed_date"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="date"
                              // value={''}Name}
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            {uploadFile?.length > 0 && showImages()}
                            <Button
                              startIcon={<UploadIcon fontSize="small" />}
                              sx={{ mr: 1, mt: 3 }}
                              component="label"
                            >
                              Upload Land Images
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
                            {uploadStamp?.length > 0 && showStamp()}
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
                          disabled={!formik.isValid}
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Confirm
                        </Button>
                      </Box>
                      <Dialog
                        open={showPDF}
                        onClose={() => setShowPDF(false)}
                        fullWidth
                        maxWidth={"lg"}
                      >
                        <DialogContent>
                          <VendorPDF values={formik.values} />
                        </DialogContent>
                      </Dialog>
                    </form>
                  )}
                  {formik.values.form_type === "PD-cum-Verification Format" && (
                    <>
                      <PDVerifyPage formik={formik} 
                        showImages={showImages} 
                        handleUpload={handleUpload}
                        uploadedFile={uploadFile}
                        uploadedStamp={uploadStamp}
                        setUploadedFile={setUploadFile}
                        setUploadedStamp={setUploadStamp}
                      />
                      <Dialog
                        open={showPDF}
                        onClose={() => setShowPDF(false)}
                        fullWidth
                        maxWidth={"lg"}
                      >
                        <DialogContent>
                          <PDVerifyPDF 
                            values={formik.values} 
                          />
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                  {formik.values.form_type === "DDA Form Format" && (
                  <>
                    <DDAForm formik={formik} 
                      showImages={showImages} 
                      handleUpload={handleUpload}
                      uploadedFile={uploadFile}
                      uploadedStamp={uploadStamp}
                      setUploadedFile={setUploadFile}
                      setUploadedStamp={setUploadStamp}
                    />
                    <Dialog
                      open={showPDF}
                      onClose={() => setShowPDF(false)}
                      fullWidth
                      maxWidth={"lg"}
                    >
                      <DialogContent>
                        <DdaPDF 
                          values={formik.values} 
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                  )}
                </DialogContentText>
              </DialogContent>
            </Box>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
