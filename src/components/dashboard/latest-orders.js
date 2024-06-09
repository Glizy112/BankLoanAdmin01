import { useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { getAllExecutives } from "../../utils/FirebaseController";

export const LatestOrders = (props) => {
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    const newArr = []
    getAllExecutives().then(res => {
      res.forEach(doc => {
        newArr.push(doc.data())
      })
    })
    setExecutives(newArr)
  },[])

  return (
    <Card {...props}>
      <CardHeader title="All Executives" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {executives?.map((executive) => (
                <TableRow hover 
                key={executive.id}>
                  <TableCell>{executive.id}</TableCell>
                  <TableCell>{executive.firstName}</TableCell>
                  <TableCell>{executive.Branch}</TableCell>

                  <TableCell>{executive.email}</TableCell>
                  <TableCell>{executive.contactNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
