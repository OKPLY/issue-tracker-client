import React, { useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import { Grid } from "@mui/material";
import LineChartCard from "../components/dashboard/LineChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import PieChartCard from "../components/dashboard/PieChartCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <Grid container padding={3} spacing={3}>
      <Grid item xs={12} md={6} lg={2}>
        <StatCard title="Created Issues" value={14} />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <StatCard title="Created Issues" value={14} />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <StatCard title="Created Issues" value={14} />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <StatCard title="Created Issues" value={14} />
      </Grid>

      <Grid item></Grid>

      <Grid item xs={12} lg={4}>
        <BarChartCard
          title="Issue Status Distribution"
          labels={["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"]}
          data={[[120, 200, 150, 80, 70, 110, 130]]}
          categories={["Tags"]}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <PieChartCard
          title="Issue Status Distribution"
          data={[120, 200, 150, 80, 70]}
          categories={["Open", "Closed", "Resolved", "In Progress", "Pending"]}
        />
      </Grid>

      <Grid item xs={12} lg={8}>
        <LineChartCard
          title="Issue Status In The Previous Month"
          labels={["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"]}
          data={[
            [120, 200, 150, 80, 70, 110, 130],
            [90, 100, 50, 40, 70, 110, 130],
            [70, 80, 250, 90, 100, 110, 110],
          ]}
          categories={["Created Issues", "Resolved Issues", "Closed Issues"]}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
