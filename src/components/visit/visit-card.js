import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { updateVisits } from "../../utils/FirebaseController";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductPdf from "./visit-pdf";
import { Selector } from "../../icons/selector";
import { Upload as UploadIcon } from "../../icons/upload";
import Trash from "../../icons/trash";
import Compressor from "compressorjs";

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
const status = ["Negative not responding", "Positive", "NA"];

export const VisitCard = ({ tasks, id, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const task = tasks;

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      executive: task?.isSubmitted ? task?.submitted?.executive : "",
      visitDate: task?.isSubmitted ? task?.submitted?.visitDate : "",
      distanceFromBranch: task?.isSubmitted ? task?.submitted?.distanceFromBranch : "",
      neighboursName: task?.isSubmitted ? task?.submitted?.neighboursName : "",
      landOwned: task?.isSubmitted ? task?.submitted?.landOwned : "",
      otherInformation: task?.isSubmitted ? task?.submitted?.otherInformation : "",
      relationTo: task?.isSubmitted ? task?.submitted?.relationTo : "",
      cropsGrown: task?.isSubmitted ? task?.submitted?.cropsGrown : "",
      personName: task?.isSubmitted ? task?.submitted?.personName : "",
      tehsil: task?.isSubmitted ? task?.submitted?.tehsil : "",
      district: task?.isSubmitted ? task?.submitted?.district : "",
      totalArea: task?.isSubmitted ? task?.submitted?.totalArea : "",
      harvestDate: task?.isSubmitted ? task?.submitted?.harvestDate : "",
      irrigationDetails: task?.isSubmitted ? task?.submitted?.irrigationDetails : "",
      cpv: task?.isSubmitted ? task?.submitted?.cpv : "",
      lat: task?.isSubmitted ? task?.submitted?.lat : "",
      lng: task?.isSubmitted ? task?.submitted?.lng : "",
      VILLAGE_DESC: task?.isSubmitted
        ? task?.submitted?.VILLAGE_DESC
        : task?.["VILLAGE_DESC"] ?? "",
      LANDMARK: task?.isSubmitted ? task?.submitted?.LANDMARK : task?.["LANDMARK"] ?? "",
    },
    validationSchema: Yup.object({
      LANDMARK: Yup.string().required("Field is Required"),
      VILLAGE_DESC: Yup.string().required("Field is Required"),
      distanceFromBranch: Yup.number().required("Field is Required"),
      landOwned: Yup.number().required("Field is Required"),
      otherInformation: Yup.string().required("Field is Required"),
      neighboursName: Yup.string().required("Field is Required"),
      relationTo: Yup.string().required("Field is Required"),
      cropsGrown: Yup.string().required("Field is Required"),
      personName: Yup.string().required("Field is Required"),
      executive: Yup.string().required("Field is Required"),
      tehsil: Yup.string().required("Field is Required"),
      district: Yup.string().required("Field is Required"),
      totalArea: Yup.string().required("Field is Required"),
      harvestDate: Yup.string().required("Field is Required"),
      visitDate: Yup.string().required("Field is Required"),
      irrigationDetails: Yup.string().required("Field is Required"),
      cpv: Yup.string().required("Field is Required"),
      lat: Yup.string().required("Field is Required"),
      lng: Yup.string().required("Field is Required"),
    }),
    onSubmit: (values, actions) => {
      let formValues = values;
      formValues.images = uploadFile;

      updateVisits(id, [{ ...task, submitted: values, isSubmitted: true }]);

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);

      setShowPdf(true);
      // setOpen(false);
    },
  });

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
            {`${task?.["CLIENTS_NAME"]} - ${task?.["CLIENTS_NO"]}`}
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 2,
              pt: 1,
            }}
          >
            <Chip
              label={task?.["APPLICANT_TYPE"]}
              color={"info"}
              sx={{ px: 1, fontWeight: "500" }}
            />
          </Box> */}
          <Typography align="center" color="textPrimary" variant="body2">
            {task?.["LANDMARK"]} {`\n\n`} {task?.["VILLAGE_DESC"]}
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
              <Selector color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                {`${task?.["Agency remarks"]}`}
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
            {/* <Grid
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
            </Grid> */}
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
                Information to be filled For LAND VISIT
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.executive && formik.errors.executive)}
                        fullWidth
                        helperText={formik.touched.executive && formik.errors.executive}
                        label="Executive"
                        margin="normal"
                        name="executive"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.executive}
                        variant="outlined"
                        placeholder="Enter Executive Name"
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
                        value={formik.values.visitDate}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.LANDMARK && formik.errors.LANDMARK)}
                        fullWidth
                        helperText={formik.touched.LANDMARK && formik.errors.LANDMARK}
                        label="Address"
                        margin="normal"
                        name="LANDMARK"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.LANDMARK ?? task?.LANDMARK}
                        variant="outlined"
                        placeholder="Enter Address"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.VILLAGE_DESC && formik.errors.VILLAGE_DESC)}
                        fullWidth
                        helperText={formik.touched.VILLAGE_DESC && formik.errors.VILLAGE_DESC}
                        label="Village Name"
                        margin="normal"
                        name="VILLAGE_DESC"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.VILLAGE_DESC ?? task?.["VILLAGE_DESC"]}
                        variant="outlined"
                        placeholder="Enter Village Name"
                      />
                    </Grid>
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
                        error={Boolean(formik.touched.tehsil && formik.errors.tehsil)}
                        fullWidth
                        helperText={formik.touched.tehsil && formik.errors.tehsil}
                        label="Tehsil"
                        margin="normal"
                        name="tehsil"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.tehsil}
                        variant="outlined"
                        placeholder="Enter Tehsil"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.district && formik.errors.district)}
                        fullWidth
                        helperText={formik.touched.district && formik.errors.district}
                        label="District"
                        margin="normal"
                        name="district"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.district}
                        variant="outlined"
                        placeholder="Enter District"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.cropsGrown && formik.errors.cropsGrown)}
                        fullWidth
                        helperText={formik.touched.cropsGrown && formik.errors.cropsGrown}
                        label="Crops Cultivated / Standing Crops"
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.harvestDate && formik.errors.harvestDate)}
                        fullWidth
                        helperText={formik.touched.harvestDate && formik.errors.harvestDate}
                        label="Date of Harvest"
                        margin="normal"
                        name="harvestDate"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="date"
                        value={formik.values.harvestDate}
                        variant="outlined"
                        placeholder="Enter Crops Grown"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={Boolean(formik.touched.totalArea && formik.errors.totalArea)}
                        fullWidth
                        helperText={formik.touched.totalArea && formik.errors.totalArea}
                        label="Total Area"
                        margin="normal"
                        name="totalArea"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.totalArea}
                        variant="outlined"
                        placeholder="Enter Total Area"
                        multiline
                        maxRows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={Boolean(
                          formik.touched.irrigationDetails && formik.errors.irrigationDetails
                        )}
                        fullWidth
                        helperText={
                          formik.touched.irrigationDetails && formik.errors.irrigationDetails
                        }
                        label="Irrigation Details"
                        margin="normal"
                        name="irrigationDetails"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.irrigationDetails}
                        variant="outlined"
                        placeholder="Enter Irrigation Details"
                        multiline
                        maxRows={4}
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
                        <FormLabel>CPV Status</FormLabel>
                        <RadioGroup
                          row
                          name="cpv"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.cpv}
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
                      {uploadFile?.length > 0 && showImages()}
                      <Button
                        startIcon={<UploadIcon fontSize="small" />}
                        sx={{ mr: 1 }}
                        component="label"
                      >
                        Upload Land Images
                        <input type="file" hidden multiple onChange={(e) => handleUpload(e)} />
                      </Button>
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
                <Dialog open={showPdf} onClose={() => setShowPdf(false)} fullWidth maxWidth={"lg"}>
                  <DialogContent>
                    <ProductPdf values={formik?.values} task={task} uploadedFiles={uploadFile} />
                  </DialogContent>
                </Dialog>
              </form>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};
