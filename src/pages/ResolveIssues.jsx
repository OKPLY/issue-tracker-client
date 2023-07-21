import { Box, Container } from "@mui/material";
import IssueCard from "../components/issue/IssueCard";
import Header from "../components/layout/Header";
import axios from "../config/axiosConfig";
import React from "react";
import { STATUS } from "../util/constants";
import FilterCard from "../components/issue/FilterCard";
import { useAuth } from "../contexts/AuthContext";

export default function ResolveIssues() {
  const auth = useAuth();
  const [issues, setIssues] = React.useState([]);
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    getIssues();
  }, [state]);

  const getIssues = () => {
    axios
      .get(
        `/issues/filter?status=${STATUS.ASSIGNED}&resolverId=${
          auth?.user?.id ?? ""
        }&tagId=${state?.tagId ?? ""}&typeId=${state?.typeId ?? ""}&text=${
          state?.text ?? ""
        }`
      )
      .then((res) => {
        setIssues(res.data);
      });
  };
  return (
    <>
      <Header title="Resolve Issues" />
      <Box sx={{ mt: 4 }} />

      <FilterCard state={state} setState={setState} hideStatus />

      {issues.map((itemData) => {
        return (
          <>
            <IssueCard issue={itemData} />
          </>
        );
      })}
    </>
  );
}
