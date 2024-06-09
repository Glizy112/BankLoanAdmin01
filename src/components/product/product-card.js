import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { User as UserIcon } from "../../icons/user";
import { useEffect, useState } from "react";
import { updateTask } from "../../utils/FirebaseController";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment/moment";
import ProductPdf from "./product-pdf";
import { TotalCustomers } from "../dashboard/total-customers";

const relation = [
  "Self",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Spouse",
  "Other",
];
const workingFamilyMembers = [
  "Self",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Spouse",
];
const residence = ["Owned", "On Rent"];
const status = ["Negative not responding", "Positive", "NA"];

export const ProductCard = ({ task, id, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  // const markAsComplete = () => {
  //   const arr = [];
  //   arr.push({
  //     ...task,
  //     FIFlag: "Complete",
  //   });
  //   updateTask(id, arr);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      additionalInformation: task?.isSubmitted ? task?.submitted?.additionalInformation : "",
      agriIncome: task?.isSubmitted ? task?.submitted?.agriIncome : "",
      carOwned: task?.isSubmitted ? task?.submitted?.carOwned : "",
      cattleOwned: task?.isSubmitted ? task?.submitted?.cattleOwned : "",
      cropsGrown: task?.isSubmitted ? task?.submitted?.cropsGrown : "",
      distanceFromBranch: task?.isSubmitted ? task?.submitted?.distanceFromBranch : "",
      familyMembers: task?.isSubmitted ? task?.submitted?.familyMembers : "",
      landOwned: task?.isSubmitted ? task?.submitted?.landOwned : "",
      motorOwned: task?.isSubmitted ? task?.submitted?.motorOwned : "",
      neighboursName: task?.isSubmitted ? task?.submitted?.neighboursName : "",
      neighboursReference: task?.isSubmitted ? task?.submitted?.neighboursReference : "",
      otherAgriImplements: task?.isSubmitted ? task?.submitted?.otherAgriImplements : "",
      otherInformation: task?.isSubmitted ? task?.submitted?.otherInformation : "",
      personName: task?.isSubmitted ? task?.submitted?.personName : "",
      fatherName: task?.isSubmitted ? task?.submitted?.fatherName : "",
      mobileNumber: task?.isSubmitted ? task?.submitted?.mobileNumber : "",
      politicalLinks: task?.isSubmitted ? task?.submitted?.politicalLinks : "",
      relationTo: task?.isSubmitted ? task?.submitted?.relationTo : "",
      workingMembers: task?.isSubmitted ? task?.submitted?.workingMembers : [],
      residenceStatus: task?.isSubmitted ? task?.submitted?.residenceStatus : "",
      yrsOfStay: task?.isSubmitted ? task?.submitted?.yrsOfStay : "",
      rv: task?.isSubmitted ? task?.submitted?.rv : "",
      tvr: task?.isSubmitted ? task?.submitted?.tvr : "",
      dedupe: task?.isSubmitted ? task?.submitted?.dedupe : "",
      lat: task?.isSubmitted ? task?.submitted?.lat : "",
      lng: task?.isSubmitted ? task?.submitted?.lng : "",
    },
    validationSchema: Yup.object({
      additionalInformation: Yup.string().required("Field is Required"),
      agriIncome: Yup.number().required("Field is Required"),
      carOwned: Yup.number().required("Field is Required"),
      cattleOwned: Yup.number().required("Field is Required"),
      cropsGrown: Yup.string().required("Field is Required"),
      distanceFromBranch: Yup.number().required("Field is Required"),
      familyMembers: Yup.number().required("Field is Required"),
      landOwned: Yup.number().required("Field is Required"),
      motorOwned: Yup.number().required("Field is Required"),
      neighboursName: Yup.string().required("Field is Required"),
      neighboursReference: Yup.string().required("Field is Required"),
      otherAgriImplements: Yup.string().required("Field is Required"),
      otherInformation: Yup.string().required("Field is Required"),
      personName: Yup.string().required("Field is Required"),
      fatherName: Yup.string().required("Field is Required"),
      mobileNumber: Yup.string().required("Field is Required"),
      politicalLinks: Yup.string().required("Field is Required"),
      relationTo: Yup.string().required("Field is Required"),
      workingMembers: Yup.array().min(1, "at least 1").required("required"),
      residenceStatus: Yup.string().required("Field is Required"),
      yrsOfStay: Yup.number().required("Field is Required"),
      rv: Yup.string().required("Field is Required"),
      tvr: Yup.string().required("Field is Required"),
      dedupe: Yup.string().required("Field is Required"),
      lat: Yup.string().required("Field is Required"),
      lng: Yup.string().required("Field is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let body_line = `Lat: ${values.lat ?? 0}, Long: ${values.lng ?? 0}, Person Met: ${
        values?.personName
      }, Relation: ${values?.relationTo}, Distance: ${
        values?.distanceFromBranch
      }, Residence status: ${values?.dedupe}, Yrs. of Stay: ${values?.yrsOfStay}, Family Members: ${
        values?.familyMembers
      }, Working Family Members: ${values?.workingMembers?.length} ${values?.workingMembers?.map(
        (item) => item
      )}, Land: As claimed by customer ${task?.["Customer Name"]}, he along with his family owns ${
        values?.landOwned
      } acres agri land and as per neighbors ${
        values?.neighboursName
      }, client along with his family owned ${
        values?.landOwned
      } acres agri land. Actual land holding cannot be verified, it is as per customer and neighbors information. Agri income ${
        values?.agriIncome
      } lacs P/A, Land Location: Same village, Cattle Owned: ${values?.cattleOwned}, Car Owned: ${
        values?.carOwned
      }, Motor Owned: ${values?.motorOwned}, Political Links: ${values?.politicalLinks}, Crops: ${
        values?.cropsGrown
      }, Address verified from: Neighbors, Other: ${values?.otherInformation}. ${
        values?.additionalInformation
      }. Neighbors: ${values?.neighboursName}.`;

      body_line = body_line.replace(/[^.:,a-zA-Z0-9 ]/g, "");

      let body = `
      REFNO: ${task?.["Application Id"]}%0D%0A
      Verification Date: ${moment().format("DD-MM-YYYY")}%0D%0A
      Bank: ${task?.["BANK NAME"] ?? "HDFC"}%0D%0A
      Verifier: ${rest?.executive?.Name ?? ""}%0D%0A
      ${task?.["Customer Name"]}%0D%0A
      s/o ${values?.fatherName}%0D%0A
      Residence  address: ${task?.["Residence Address"]}%0D%0A
      Landmark: near road%0D%0A
      Product: ${task?.["Product Name"]}%0D%0A
      Mobile: ${values?.mobileNumber}%0D%0A
      Status [TVR]: ${values?.tvr} Status: [RV]: ${values?.rv}, DEDUPE: ${values?.dedupe}%0D%0A
      Details: - ${body_line}`;

      window.open(
        `mailto:Vrjbathindaoffice@gmail.com,anshnag@gmail.com?subject=AGRI CPV FOR ${task?.["Application Id"]}&body=${body}`
      );

      updateTask(id, [{ ...task, submitted: values, isSubmitted: true }]);

      resetForm();
      setOpen(false);
    },
  });

  const assignTask = async (value) => {
    console.log("VALUE =====>", value)
    if (task?.["Application Id"] !== undefined) {
      updateTask(id, [{ ...task, AssignedTo: value }]);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        {...rest}
      >
        <CardContent>
          <Typography align="center" color="textPrimary" gutterBottom variant="h6">
            {`${task?.["Customer Name"]} - ${task?.["Product Name"]}`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 2,
              pt: 1,
            }}
          >
            <Chip
              label={task?.["Type Of Applicant"]}
              color={"info"}
              sx={{ px: 1, fontWeight: "500" }}
            />
            <Chip
              label={task?.["FI To Be Conducted"]}
              color={"default"}
              sx={{ ml: 1, px: 1, fontWeight: "500" }}
            />
          </Box>
          <Typography align="center" color="textPrimary" variant="body2">
            {task?.["Residence Address"]}
          </Typography>

          <Typography
            align="center"
            color="textSecondary"
            fontWeight={"600"}
            variant="body2"
            sx={{ pt: 2 }}
          >
            LS Number - {task?.["Application Id"]}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ px: 2, pb: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <ClockIcon color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                {`${task?.["FI Date"]} ${task?.["FI Time"]}`}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 60,
                  background: task?.isSubmitted === true ? "#25BE99" : "#ED920A",
                }}
              />
              <Typography
                color={task?.isSubmitted === true ? "#25BE99" : "#ED920A"}
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {task?.isSubmitted === true ? "Completed" : "Pending"}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
              xs={12}
            >
              <UserIcon color="action" />
              <Typography sx={{ pl: 1, width: "53%" }} variant={"body2"} color={"textSecondary"}>
                {rest?.executive?.Name ? (
                  `Assigned To ${rest?.executive?.Name}`
                ) : (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Assign Task</InputLabel>
                    <Select
                      label={"Assign Task To"}
                      sx={{ fontSize: 12 }}
                      onChange={(e) => assignTask(e.target.value)}
                    >
                      <MenuItem disabled value={"default"}>
                        Assign Task To
                      </MenuItem>
                      {rest?.allExecutives?.map((data, idx1) => (
                        <MenuItem key={idx1} value={data?.ID} sx={{ fontSize: 12, py: 1, px: 1 }}>
                          {data?.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Button color="error" variant="outlined" onClick={() => setOpen(true)}>
                Edit Manually
              </Button>
            </Grid>
            {/* {task?.FIFlag !== "Complete" && (
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Button color="success" variant="contained" onClick={markAsComplete}>
                  Mark As Complete
                </Button>
              </Grid>
            )} */}
            {/* <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Button color="success" variant="contained" onClick={() => setShowPdf(true)}>
                  Show PDF
                </Button>
                
              </Grid> */}
          </Grid>
        </Box>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth={"md"}
      >
        <Box sx={{ p: 2 }}>
          <DialogTitle id="responsive-dialog-title">{"Kindly Fill the below details"}</DialogTitle>
          <DialogContent sx={{ my: 2 }}>
            <DialogContentText>
              <Typography color={"textSecondary"} variant={"h6"} sx={{ mb: 3 }}>
                Information to be filled For AGRI CPV
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.personName && formik.errors.personName)}
                        fullWidth
                        helperText={formik.touched.personName && formik.errors.personName}
                        label="Person Met"
                        margin="normal"
                        name="personName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.personName}
                        variant="outlined"
                        placeholder="Enter Name"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formik.touched.distanceFromBranch && formik.errors.distanceFromBranch
                        )}
                        fullWidth
                        helperText={
                          formik.touched.distanceFromBranch && formik.errors.distanceFromBranch
                        }
                        label="Distance From Bank Branch (25 Km)"
                        margin="normal"
                        name="distanceFromBranch"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.distanceFromBranch}
                        variant="outlined"
                        placeholder="25"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel>Relation To The Customer</FormLabel>
                        <RadioGroup
                          row
                          name="relationTo"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.relationTo}
                        >
                          {relation?.map((item, idx) => (
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
                        error={Boolean(formik.touched.fatherName && formik.errors.fatherName)}
                        fullWidth
                        helperText={formik.touched.fatherName && formik.errors.fatherName}
                        label="Father's Name"
                        margin="normal"
                        name="fatherName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.fatherName}
                        variant="outlined"
                        placeholder="Enter Father's Name"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.mobileNumber && formik.errors.mobileNumber)}
                        fullWidth
                        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                        label="Mobile Number"
                        margin="normal"
                        name="mobileNumber"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.mobileNumber}
                        variant="outlined"
                        placeholder="Enter Mobile Number"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel>Residence Status</FormLabel>
                        <RadioGroup
                          row
                          name="residenceStatus"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.residenceStatus}
                        >
                          {residence?.map((item, idx) => (
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
                        error={Boolean(formik.touched.yrsOfStay && formik.errors.yrsOfStay)}
                        fullWidth
                        helperText={formik.touched.yrsOfStay && formik.errors.yrsOfStay}
                        label="Years Of Stay"
                        margin="normal"
                        name="yrsOfStay"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.yrsOfStay}
                        variant="outlined"
                        placeholder="25"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.familyMembers && formik.errors.familyMembers)}
                        fullWidth
                        helperText={formik.touched.familyMembers && formik.errors.familyMembers}
                        label="No. Of Family Members"
                        margin="normal"
                        name="familyMembers"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.familyMembers}
                        variant="outlined"
                        placeholder="5"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel>Working Family Members</FormLabel>
                        <RadioGroup row name="workingMembers">
                          {workingFamilyMembers?.map((item, idx) => (
                            <FormControlLabel
                              key={idx}
                              value={item}
                              control={
                                <Checkbox
                                  name="workingMembers"
                                  checked={formik.values.workingMembers.includes(item)}
                                  onChange={(e) => {
                                    !formik?.values?.workingMembers?.includes(item)
                                      ? formik.setFieldValue("workingMembers", [
                                          ...formik.values.workingMembers,
                                          e.target.value,
                                        ])
                                      : formik.setFieldValue(
                                          "workingMembers",
                                          formik.values.workingMembers.filter(
                                            (label) => label !== item
                                          )
                                        );
                                  }}
                                />
                              }
                              label={item}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formik.touched.neighboursName && formik.errors.neighboursName
                        )}
                        fullWidth
                        helperText={formik.touched.neighboursName && formik.errors.neighboursName}
                        label="Neighbour Name"
                        margin="normal"
                        name="neighboursName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.neighboursName}
                        variant="outlined"
                        placeholder="Enter Neighbours"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formik.touched.neighboursReference && formik.errors.neighboursReference
                        )}
                        fullWidth
                        helperText={
                          formik.touched.neighboursReference && formik.errors.neighboursReference
                        }
                        label="Neighbour Reference"
                        margin="normal"
                        name="neighboursReference"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.neighboursReference}
                        variant="outlined"
                        placeholder="Enter Neighbour Reference"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.landOwned && formik.errors.landOwned)}
                        fullWidth
                        helperText={formik.touched.landOwned && formik.errors.landOwned}
                        label="Land Owned (In Acres)"
                        margin="normal"
                        name="landOwned"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.landOwned}
                        variant="outlined"
                        placeholder="5"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.agriIncome && formik.errors.agriIncome)}
                        fullWidth
                        helperText={formik.touched.agriIncome && formik.errors.agriIncome}
                        label="Agri Income"
                        margin="normal"
                        name="agriIncome"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.agriIncome}
                        variant="outlined"
                        placeholder="Enter Agri Income"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(formik.touched.cattleOwned && formik.errors.cattleOwned)}
                        fullWidth
                        helperText={formik.touched.cattleOwned && formik.errors.cattleOwned}
                        label="Cattle Owned"
                        margin="normal"
                        name="cattleOwned"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.cattleOwned}
                        variant="outlined"
                        placeholder="Enter Cattle Owned"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(formik.touched.carOwned && formik.errors.carOwned)}
                        fullWidth
                        helperText={formik.touched.carOwned && formik.errors.carOwned}
                        label="Car Owned"
                        margin="normal"
                        name="carOwned"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.carOwned}
                        variant="outlined"
                        placeholder="Enter Car Owned"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(formik.touched.motorOwned && formik.errors.motorOwned)}
                        fullWidth
                        helperText={formik.touched.motorOwned && formik.errors.motorOwned}
                        label="Motor Owned"
                        margin="normal"
                        name="motorOwned"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.motorOwned}
                        variant="outlined"
                        placeholder="Enter Motor Owned"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formik.touched.politicalLinks && formik.errors.politicalLinks
                        )}
                        fullWidth
                        helperText={formik.touched.politicalLinks && formik.errors.politicalLinks}
                        label="Political Links"
                        margin="normal"
                        name="politicalLinks"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.politicalLinks}
                        variant="outlined"
                        placeholder="Enter Political Links"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.cropsGrown && formik.errors.cropsGrown)}
                        fullWidth
                        helperText={formik.touched.cropsGrown && formik.errors.cropsGrown}
                        label="Crops Grown"
                        margin="normal"
                        name="cropsGrown"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.cropsGrown}
                        variant="outlined"
                        placeholder="Enter Crops Grown"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={Boolean(
                          formik.touched.otherAgriImplements && formik.errors.otherAgriImplements
                        )}
                        fullWidth
                        helperText={
                          formik.touched.otherAgriImplements && formik.errors.otherAgriImplements
                        }
                        label="Other Agri Implments"
                        margin="normal"
                        name="otherAgriImplements"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.otherAgriImplements}
                        variant="outlined"
                        placeholder="Enter Other Agri Implments"
                        multiline
                        maxRows={4}
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={Boolean(
                          formik.touched.otherInformation && formik.errors.otherInformation
                        )}
                        fullWidth
                        helperText={
                          formik.touched.otherInformation && formik.errors.otherInformation
                        }
                        label="Other Information"
                        margin="normal"
                        name="otherInformation"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.otherInformation}
                        variant="outlined"
                        placeholder="Enter Other Information"
                        multiline
                        maxRows={4}
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={Boolean(
                          formik.touched.additionalInformation &&
                            formik.errors.additionalInformation
                        )}
                        fullWidth
                        helperText={
                          formik.touched.additionalInformation &&
                          formik.errors.additionalInformation
                        }
                        label="Additional Information"
                        margin="normal"
                        name="additionalInformation"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.additionalInformation}
                        variant="outlined"
                        placeholder="Enter Additional Information"
                        multiline
                        maxRows={4}
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.lat && formik.errors.lat)}
                        fullWidth
                        helperText={formik.touched.lat && formik.errors.lat}
                        label="Latitude"
                        margin="normal"
                        name="lat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.lat}
                        variant="outlined"
                        placeholder="Enter Latitude"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.lng && formik.errors.lng)}
                        fullWidth
                        helperText={formik.touched.lng && formik.errors.lng}
                        label="Longitude"
                        margin="normal"
                        name="lng"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.lng}
                        variant="outlined"
                        placeholder="Enter Longitude"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl>
                        <FormLabel>TVR Status</FormLabel>
                        <RadioGroup
                          row
                          name="tvr"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.tvr}
                        >
                          {status?.map((item, idx) => (
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
                        <FormLabel>RV Status</FormLabel>
                        <RadioGroup
                          row
                          name="rv"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.rv}
                        >
                          {status?.map((item, idx) => (
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
                        <FormLabel>Dedupe Status</FormLabel>
                        <RadioGroup
                          row
                          name="dedupe"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.dedupe}
                        >
                          {status?.map((item, idx) => (
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
                  <Typography color={"error"} variant="body1">
                    NOTE - Kindly add attachment from the mail client itself.
                  </Typography>
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
              </form>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
      {/* <Dialog
        open={showPdf}
        onClose={() => setShowPdf(false)}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogContent>
          <ProductPdf />
        </DialogContent>
      </Dialog> */}
    </>
  );
};
