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
import { update } from "../../utils/FirebaseController";
import AlertToast from "../AlertToast";

const dataNeeded = [
  "S.No.",
  "AssignedTo",
  "PROPOSAL_NO",
  "CLIENTS_NO",
  "CLIENTS_NAME",
  "APPLICANT_TYPE",
  "PHONE1",
  "LANDMARK",
  "VILLAGE_DESC",
  "Agency remarks",
  "executive",
];

export const VisitListToolbar = (props) => {
  const [sheetHeaders, setSheetHeaders] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [msg, setMsg] = useState("");

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
      setOpen(true);
    }
  }, [sheetHeaders[0]]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const arr = [];
    const newArr = [];

    if (props?.tasks?.length > 1) {
      props?.tasks?.map((task) => {
        newArr.push(task?.data[0]);
      });
    }

    sheetHeaders?.map((item, index) => {
      const newObj = {};

      sheetHeaders[0].forEach((element, idx) => {
        if (sheetHeaders[index + 1] !== undefined)
          newObj[element] = String(sheetHeaders[index + 1][idx]);
      });

      if (Object.values(newObj).length > 0) {
        arr.push(newObj);
      }
    });

    const filteredData = arr.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t?.["CLIENTS_NO"].toString() === value?.["CLIENTS_NO"].toString() 
            // &&
            // t?.["VILLAGE_DESC"].toString() === value?.["VILLAGE_DESC"].toString()
        )
    );

    const results = filteredData.filter(
      ({ ["CLIENTS_NO"]: id1, ['VILLAGE_DESC']: id11 }) =>
        !newArr?.some(
          ({ ["CLIENTS_NO"]: id2, ['VILLAGE_DESC']: id22 }) =>
            String(id2) === String(id1) 
            // && String(id11) === String(id22)
        )
    );
    if (results.length > 0) {
      results?.map((item) => {
        if (item?.["CLIENTS_NO"]) {
          update([item], "Visits")
            .then((res) => {
              setOpen(false);
              setMsg("Data Uploaded Successfully!");
              setAlertOpen(true);
            })
            .catch((err) => {
              setMsg("Error Uploading Data!");
              setAlertOpen(true);
              setOpen(false);
            });
        } else {
          setOpen(false);
          alert("Data Already Exists");
        }
        // if (!item?.["VILLAGE_DESC"]) {
        //   setMsg("Village Desc is required!");
        //   setAlertOpen(true);
        // } else {
        //   if (item?.["CLIENT_NO"]) {
        //     update([item], "Visits")
        //       .then((res) => {
        //         setOpen(false);
        //         setMsg("Data Uploaded Successfully!");
        //         setAlertOpen(true);
        //       })
        //       .catch((err) => {
        //         setMsg("Error Uploading Data!");
        //         setAlertOpen(true);
        //         setOpen(false);
        //       });
        //   } else {
        //     setOpen(false);
        //     alert("Data Already Exists");
        //   }
        // }
      });
    }
  };

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
          {`Land Visits (${props?.tasks?.length})`}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }} component="label">
            Import Data From Excel
            <input type="file" hidden onChange={(e) => setUploadFile(e.target.files)} />
          </Button>
          {/* <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained">
            Add Tasks
          </Button> */}
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
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search By Id or Customer Name"
                variant="outlined"
                onChange={(e) => props.handleSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* {sheetHeaders[0]?.length > 0 && (
        <Box>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography>Manage Excel Headers</Typography>
              <Box sm={{ maxWidth: 500 }}>
                {sheetHeaders[0]?.map((item, idx) => (
                  <Typography key={idx}>{item}</Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )} */}

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
    </Box>
  );
};
