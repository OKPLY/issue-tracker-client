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
import axios from "../config/axiosConfig";

function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [state, setState] = React.useState({});

  const showDashboard = auth?.permissions?.includes(PERMISSION.ReadDashboard);

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }

    getData();
  }, []);

  const getData = () => {
    axios
      .get("/users/aggregate")
      .then((res) => setState((prev) => ({ ...prev, user: res?.data })));

    axios
      .get("/users/recentUsers?limit=10")
      .then((res) => setState((prev) => ({ ...prev, newUsers: res?.data })));

    axios
      .get("/issues/recentIssues?limit=10")
      .then((res) => setState((prev) => ({ ...prev, newIssues: res?.data })));

    axios
      .get("/issues/aggregate/tag?limit=10")
      .then((res) => setState((prev) => ({ ...prev, tags: res?.data })));

    axios
      .get("/types/aggregate")
      .then((res) => setState((prev) => ({ ...prev, types: res?.data })));

    axios
      .get("/issues/aggregate/all-date")
      .then((res) => setState((prev) => ({ ...prev, issues: res?.data })));
  };

  return (
    <>
      <Header title="Dashboard" />
      <Grid container padding={3} spacing={3}>
        <Grid item xs={12} lg={showDashboard ? 9 : 12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Created Issues" value={state?.user?.created} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Reviewed Issues" value={state?.user?.reviewed} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Resolved Issues" value={state?.user?.resolved} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Closed Issues" value={state?.user?.closed} />
            </Grid>
            {showDashboard && (
              <>
                <Grid item xs={12} lg={7}>
                  <BarChartCard
                    title="Top Issue Tags"
                    labels={state?.tags?.map((tag) => tag?.tagName) ?? []}
                    data={[state?.tags?.map((tag) => tag?.count) ?? []]}
                    categories={["Tags"]}
                  />
                </Grid>

                <Grid item xs={12} lg={5}>
                  <PieChartCard
                    title="Issue Type Distribution"
                    data={state?.types?.map((type) => type?.count) ?? []}
                    categories={state?.types?.map((type) => type?.type) ?? []}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <LineChartCard
                title="Issue Status In The Previous Month"
                labels={Object.keys(state?.issues ?? {}).map((x) =>
                  new Date(x).toLocaleDateString()
                )}
                data={[
                  Object.values(state?.issues ?? {}).map(
                    (x) => x?.created ?? 0
                  ),
                  Object.values(state?.issues ?? {}).map(
                    (x) => x?.reviewed ?? 0
                  ),
                  Object.values(state?.issues ?? {}).map(
                    (x) => x?.resolved ?? 0
                  ),
                ]}
                categories={[
                  "Created Issues",
                  "Reviewed Issues",
                  "Resolved Issues",
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        {showDashboard && (
          <Grid item xs={12} lg={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <NewUsersCard data={state?.newUsers ?? []} />
              </Grid>
              <Grid item xs={12}>
                <NewIssuesCard data={state?.newIssues ?? []} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Dashboard;
