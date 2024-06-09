import Head from "next/head";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { useEffect, useState } from "react";
import { getAllExecutives } from "../utils/FirebaseController";
import { TotalCustomers } from "../components/dashboard/total-customers";

const Page = () => {
  const [search, setSearch] = useState("");
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(loading);

  const handleSearch = (value) => {
    // Debounce Search Result
    const waitForSearch = setTimeout(() => setSearch(value), 2000);
    return () => clearTimeout(waitForSearch);
  };

  useEffect(() => {
    const newArr = [];
    // getAllExecutives().then((res) => {
    //   res.forEach((doc) => {
    //     newArr.push(doc.data());
    //   });
    // });

    console.log(newArr)
    setExecutives(newArr);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <Box
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <CircularProgress disableShrink />
      </Box>
    );
  } else {
    return (
      <>
        <Head>
          <title>Customers | Vast Credit Services</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar handleSearch={handleSearch} executives={executives} />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={customers} search={search} executives={executives} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
