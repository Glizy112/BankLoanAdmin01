import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Select,
  MenuItem,
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { updateExecutives } from "../../utils/FirebaseController";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment/moment";
import AlertToast from "../AlertToast";

const dataNeeded = [
  "Sr No.",
  "ID",
  "Name",
  "DOJ",
  "Branch",
  "StaffType",
  "Email",
  "contactNumber",
  "Agency",
  "AlternateNumber",
];

const staffType = ["Field", "Backend"];

export const CustomerListToolbar = (props) => {
  const [sheetHeaders, setSheetHeaders] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openExecutiveModal, setExecutiveModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (uploadFile !== null) {
      const [file] = uploadFile;
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          setSheetHeaders(data);
        };
        reader?.readAsBinaryString(file);
      }
    }
  }, [uploadFile]);

  useEffect(() => {
    if (sheetHeaders[0]?.length > 0) {
      console.log("SHEET ====", sheetHeaders[0]);
      setOpen(true);
    }
  }, [sheetHeaders[0]]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEx = () => {
    setExecutiveModal(false);
  };

  const handleSubmit = () => {
    const arr = [];

    sheetHeaders?.map((item, index) => {
      const newObj = {};

      sheetHeaders[0].forEach((element, idx) => {
        if (sheetHeaders[index + 1] !== undefined)
          newObj[element] = String(sheetHeaders[index + 1][idx]);
      });

      arr.push(newObj);
    });

    const filteredData = arr.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t?.["ID"]?.toString() === value?.["ID"]?.toString() &&
            t?.["Email"]?.toString() === value?.["Email"]?.toString()
        )
    );

    const results = filteredData.filter(
      ({ ID: id1 }) => !props?.executives?.some(({ ID: id2 }) => String(id2) === String(id1))
    );

    if (results.length > 0) {
      results?.map((item) => {
        if (item?.ID) {
          updateExecutives(item, "Executives")
            .then((res) => {
              setOpen(false);
              setMsg("Executive Added Successfully!");
              setAlertOpen(true);
            })
            .catch((err) => {
              setMsg("Error Adding Executive Data!");
              setAlertOpen(true);
              setOpen(false);
            });
        } else {
          setOpen(false);
          setMsg("Executive Already Exists!");
          setAlertOpen(true);
        }
      });
    }

    // console.log(results?.length)
    // results?.map(item => {
    //   console.log(item)
    //   // updateExecutives(item, "Executives").then(res => setOpen(false)).catch(err => {alert("Error Uploading Data.."); setOpen(false)})
    // })
  };

  const formik = useFormik({
    initialValues: {
      ID: 0,
      Name: "",
      Branch: "",
      StaffType: "",
      Email: "",
      contactNumber: "",
      Agency: "",
      AlternateNumber: "",
    },
    validationSchema: Yup.object({
      ID: Yup.number().required("Field is Required"),
      Name: Yup.string().required("Field is Required"),
      Branch: Yup.string().required("Field is Required"),
      StaffType: Yup.string().required("Field is Required"),
      Email: Yup.string().email().required("Field is Required"),
      contactNumber: Yup.string()
        .matches(/^[0-9\- ]{8,14}$/, "Contact Number is not valid")
        .required("Field is Required"),
      Agency: Yup.string().required("Field is Required"),
      AlternateNumber: Yup.string()
        .matches(/^[0-9\- ]{8,14}$/, "Contact Number is not valid")
        .required("Field is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      parseInt(values.ID);
      updateExecutives(values, "Executives");
      resetForm();
      setOpen(false);
      setMsg("Executive Added Successfully!");
      setAlertOpen(true);
    },
  });

  return (
    <Box {...props}>
      {alertOpen && (
        <div style={{ position: "absolute", top: 24, right: 24, zIndex: 99999 }}>
          {" "}
          <AlertToast
            type={"error"}
            msg={msg}
            onClick={() => {
              setAlertOpen(false);
              setMsg("");
            }}
          />{" "}
        </div>
      )}
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          {`Executives (${props?.executives?.length})`}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }} component="label">
            Import Data From Excel
            <input type="file" hidden onChange={(e) => setUploadFile(e.target.files)} />
          </Button>
          {/* <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button> */}
          <Button color="primary" variant="contained" onClick={() => setExecutiveModal(true)}>
            Add Executive
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search By ID or Branch"
                variant="outlined"
                onChange={(e) => props.handleSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth={"lg"}
      >
        <Box sx={{ p: 2 }}>
          <DialogTitle id="responsive-dialog-title">{"Manage Excel Headers"}</DialogTitle>
          <DialogContent sx={{ my: 2 }}>
            <DialogContentText>
              <Typography color={"textSecondary"} variant={"h6"} sx={{ mb: 3 }}>
                DATA NEEDED
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mb: 3,
                }}
              >
                {dataNeeded?.map((data, idx) => (
                  <Chip
                    key={idx}
                    label={data}
                    variant="outlined"
                    color={"default"}
                    sx={{ px: 1, mx: 1, my: 1, fontWeight: "500" }}
                  />
                ))}
              </Box>
            </DialogContentText>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {sheetHeaders[0]?.map((item, idx) => (
                      <TableCell key={idx}>
                        <Select
                          value={item}
                          label={item}
                          sx={{ fontSize: 12 }}
                          onChange={(e) => {
                            sheetHeaders[0]?.splice(idx, 1, e.target.value);
                            const newData = [...sheetHeaders, sheetHeaders[0]];
                            setSheetHeaders([...sheetHeaders]);
                          }}
                          defaultValue={""}
                        >
                          {dataNeeded?.map((data, idx1) => (
                            <MenuItem key={idx1} value={data} sx={{ fontSize: 12, py: 1, px: 1 }}>
                              {data}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sheetHeaders?.map((item, idx) => (
                    <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      {sheetHeaders[idx + 1]?.map((newI, idx1) => (
                        <TableCell key={idx1} component="th" scope="row" sx={{ fontSize: 12 }}>
                          {newI}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <DialogContentText>
              <Typography color={"textSecondary"} variant={"h6"} sx={{ mb: 3 }}>
                DATA FROM EXCEL
              </Typography>
              {sheetHeaders[0]?.map((data, idx) => (
                <Typography key={idx} sx={{ py: 1 }}>
                  {data}
                </Typography>
              ))}
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color={"error"}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} autoFocus variant="contained" color={"success"}>
              Done
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog
        open={openExecutiveModal}
        onClose={handleCloseEx}
        aria-labelledby="responsive-dialog-title"
        maxWidth={"lg"}
      >
        <Box sx={{ p: 2 }}>
          <DialogTitle id="responsive-dialog-title">{"Add Executive Details"}</DialogTitle>
          <DialogContent sx={{ my: 2 }}>
            <DialogContentText>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.ID && formik.errors.ID)}
                        fullWidth
                        helperText={formik.touched.ID && formik.errors.ID}
                        label="Employee ID"
                        margin="normal"
                        name="ID"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.ID}
                        variant="outlined"
                        placeholder="Enter Employee ID"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.Name && formik.errors.Name)}
                        fullWidth
                        helperText={formik.touched.Name && formik.errors.Name}
                        label="Employee Name"
                        margin="normal"
                        name="Name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.Name}
                        variant="outlined"
                        placeholder="Enter Employee Name"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.Branch && formik.errors.Branch)}
                        fullWidth
                        helperText={formik.touched.Branch && formik.errors.Branch}
                        label="Coverage Area"
                        margin="normal"
                        name="Branch"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.Branch}
                        variant="outlined"
                        placeholder="Enter Coverage Area"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel>Staff Type</InputLabel>
                        <Select
                          value={formik.values.StaffType}
                          label={"Select Staff Type"}
                          defaultValue="Select Staff Type"
                          onChange={(e) => formik.setFieldValue("StaffType", e.target.value)}
                        >
                          {staffType?.map((data, idx1) => (
                            <MenuItem key={idx1} value={data} sx={{ fontSize: 12, py: 1, px: 1 }}>
                              {data}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.Email && formik.errors.Email)}
                        fullWidth
                        helperText={formik.touched.Email && formik.errors.Email}
                        label="Email"
                        margin="normal"
                        name="Email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.Email}
                        variant="outlined"
                        placeholder="Enter Email"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.contactNumber && formik.errors.contactNumber)}
                        fullWidth
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        label="Contact Number"
                        margin="normal"
                        name="contactNumber"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.contactNumber}
                        variant="outlined"
                        placeholder="Enter Contact Number"
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(formik.touched.Agency && formik.errors.Agency)}
                        fullWidth
                        helperText={formik.touched.Agency && formik.errors.Agency}
                        label="Agency"
                        margin="normal"
                        name="Agency"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.Agency}
                        variant="outlined"
                        placeholder="Enter Agency"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formik.touched.AlternateNumber && formik.errors.AlternateNumber
                        )}
                        fullWidth
                        helperText={formik.touched.AlternateNumber && formik.errors.AlternateNumber}
                        label="Alternate Number"
                        margin="normal"
                        name="AlternateNumber"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.AlternateNumber}
                        variant="outlined"
                        placeholder="Enter Alternate Number"
                        inputProps={{ maxLength: 10 }}
                      />
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
                    Add Executive
                  </Button>
                </Box>
              </form>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};
