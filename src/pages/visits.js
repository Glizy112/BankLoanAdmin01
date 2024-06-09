import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { Box, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { VisitListToolbar } from "../components/visit/visit-list-toolbar";
import { VisitCard } from "../components/visit/visit-card";
import { DashboardLayout } from "../components/dashboard-layout";
import {
  deleteTask,
  getAllExecutives,
  getAllTasks,
  getAllVisits,
} from "../utils/FirebaseController";
import { TotalCustomers } from "../components/dashboard/total-customers";
import FlatList from "flatlist-react";

const Page = () => {
  const [visits, setVisits] = useState([]);

  const [search, setSearch] = useState("");
  const [exec, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (value) => {
    // Debounce Search Result
    const waitForSearch = setTimeout(() => setSearch(value), 2000);
    return () => clearTimeout(waitForSearch);
  };

  useEffect(() => {
    const newArr = [];
    getAllExecutives().then((res) => {
      res.forEach((doc) => {
        newArr.push(doc.data());
      });
    });
    setExecutives(newArr);
  }, []);

  useEffect(() => {
    const arr = [];
    getAllVisits().then((res) =>
      res.forEach((doc) => {
        // if(doc.data().data[0].LAND_HOLD_NAME){
        //   deleteTask(doc.id, 'Visits')
        // }
        console.log(doc.data());
        let newDoc = doc?.data();
        newDoc.id = doc?.id;

        arr.push(newDoc);
      })
    );

    console.log('data', arr)
    setVisits(arr);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const completed = useMemo(() => {
    const value = visits?.filter((item) => item?.data[0]?.isSubmitted === true);
    return value?.length;
  }, [visits?.length]);

  const pending = useMemo(() => {
    return visits?.length - completed;
  }, [completed]);

  const renderVistCard = (item, key) => {
    return (
      <Grid item key={key} lg={4} md={6} xs={12}>
        <VisitCard tasks={item?.data[0]} id={item?.id} allExecutives={exec} search={search} />
      </Grid>
    );
  };

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
          <title>Land Visits | Vast Credit Services</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalCustomers name={"Completed"} value={completed} />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalCustomers name={"Pending"} value={pending} />
                </Grid>
              </Grid>
            </Box>
            <VisitListToolbar handleSearch={handleSearch} tasks={visits} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                <FlatList
                  list={visits?.filter(
                    (item) =>
                      item?.data[0]?.["PROPOSAL_NO"]
                        ?.toString()
                        .toLowerCase()
                        .match(search.toLowerCase()) ||
                      item?.data[0]?.["CLIENTS_NO"]
                        ?.toString()
                        .toLowerCase()
                        .match(search.toLowerCase())
                  )}
                  renderItem={(item, k) => renderVistCard(item, k)}
                  renderOnScroll
                />
                {/* {visits
                  ?.filter(
                    (item) =>
                      item?.data[0]?.["PROPOSAL_NO"]
                        ?.toString()
                        .toLowerCase()
                        .match(search.toLowerCase()) ||
                      item?.data[0]?.["CLIENTS_NO"]
                        ?.toString()
                        .toLowerCase()
                        .match(search.toLowerCase())
                  )
                  .map((task, idx) => (
                    <Grid item key={idx} lg={4} md={6} xs={12}>
                      <VisitCard
                        tasks={task?.data[0]}
                        id={task?.id}
                        executive={exec?.find((item) => item?.ID === task?.data[0]?.AssignedTo)}
                        allExecutives={exec}
                        search={search}
                      />
                    </Grid>
                  ))} */}
              </Grid>
            </Box>
          </Container>
        </Box>
      </>
    );
  }
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
