import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { Clock } from "../../icons/clock";

export const TotalCustomers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {props?.name ?? `TOTAL Executives`}
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {props?.value ?? "--"}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: props?.name === "Pending" ? "#ED920A" : "success.main",
              height: 56,
              width: 56,
            }}
          >
            {props?.name === "Pending" ? <Clock /> : <PeopleIcon />}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
