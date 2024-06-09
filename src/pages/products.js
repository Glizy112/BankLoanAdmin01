import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { Box, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { getAllExecutives, getAllTasks } from "../utils/FirebaseController";
import { TotalCustomers } from "../components/dashboard/total-customers";

const Page = () => {
  const [tasks, setTasks] = useState([]);

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
        console.log('E', doc.data())
        newArr.push(doc.data());
      });
    });
    setExecutives(newArr);
  }, []);

  useEffect(() => {
    const arr = [];

    getAllTasks().then((res) => {
      res.forEach((doc) => {
        console.log('T', doc.data())
        let newDoc = doc?.data();
        newDoc.id = doc?.id
        arr.push(newDoc);
        // console.log(doc.data().data[0]?.isSubmitted ? true : false)
      });
    });

    setTasks(arr);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const completed = useMemo(() => {
    const value = tasks?.filter((item) => item?.data[0]?.isSubmitted === true);
    return value?.length;
  }, [tasks?.length]);

  const pending = useMemo(() => {
    return tasks?.length - completed;
  }, [completed]);

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
          <title>Products | Vast Credit Services</title>
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
            <ProductListToolbar handleSearch={handleSearch} tasks={tasks} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {tasks
                  ?.filter(
                    (item) =>
                      item?.data[0]?.["Application Id"]
                        ?.toString()
                        .toLowerCase()
                        .match(search.toLowerCase()) ||
                      item?.data[0]?.["Customer Name"]
                        ?.toString()
                        .toLowerCase()
                        .match(search.toLowerCase())
                  )
                  .map((task, idx) => (
                    <Grid item key={idx} lg={4} md={6} xs={12}>
                      <ProductCard
                        task={task?.data[0]}
                        id={task?.id}
                        executive={exec?.find((item) => item?.ID === task?.data[0]?.AssignedTo)}
                        allExecutives={exec}
                        search={search}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
            {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={1}
              size="small"
            />
          </Box> */}
          </Container>
        </Box>
      </>
    );
  }
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
