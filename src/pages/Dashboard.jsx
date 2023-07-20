import React, { useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import { Container, Grid } from "@mui/material";
import LineChartCard from "../components/dashboard/LineChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import PieChartCard from "../components/dashboard/PieChartCard";
import { useNavigate } from "react-router-dom";
import NewUsersCard from "../components/dashboard/NewUsersCard";
import Header from "../components/layout/Header";
import NewIssuesCard from "../components/dashboard/NewIssuesCard";
import { useAuth } from "../contexts/AuthContext";
import { PERMISSION } from "../util/constants";

function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const showDashboard = auth?.permissions?.includes(PERMISSION.ReadDashboard);

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <Grid container padding={3} spacing={3}>
        <Grid item xs={12} lg={showDashboard ? 9 : 12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Created Issues" value={14} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Created Issues" value={14} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Created Issues" value={14} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Created Issues" value={14} />
            </Grid>
            {showDashboard && (
              <>
                <Grid item xs={12} lg={7}>
                  <BarChartCard
                    title="Issue Status Distribution"
                    labels={[
                      "Mon",
                      "Tues",
                      "Wed",
                      "Thrus",
                      "Fri",
                      "Sat",
                      "Sun",
                    ]}
                    data={[[120, 200, 150, 80, 70, 110, 130]]}
                    categories={["Tags"]}
                  />
                </Grid>

                <Grid item xs={12} lg={5}>
                  <PieChartCard
                    title="Issue Status Distribution"
                    data={[120, 200, 150, 80, 70]}
                    categories={[
                      "Open",
                      "Closed",
                      "Resolved",
                      "In Progress",
                      "Pending",
                    ]}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <LineChartCard
                title="Issue Status In The Previous Month"
                labels={["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"]}
                data={[
                  [120, 200, 150, 80, 70, 110, 130],
                  [90, 100, 50, 40, 70, 110, 130],
                  [70, 80, 250, 90, 100, 110, 110],
                ]}
                categories={[
                  "Created Issues",
                  "Resolved Issues",
                  "Closed Issues",
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        {showDashboard && (
          <Grid item xs={12} lg={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <NewUsersCard
                  data={Array(10).fill({
                    firstName: "Maggie",
                    lastName: "Geremew",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <NewIssuesCard
                  data={Array(10).fill({
                    title: "Issue Title",
                  })}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Dashboard;
