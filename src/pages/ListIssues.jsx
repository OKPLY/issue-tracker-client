import { Box, Container } from "@mui/material";
import IssueCard from "../components/issue/IssueCard";
import Header from "../components/layout/Header";
import axios from "../config/axiosConfig";
import React from "react";
import { STATUS } from "../util/constants";
import FilterCard from "../components/issue/FilterCard";

export default function ListIssues() {
  const [issues, setIssues] = React.useState([]);
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    getIssues();
  }, [state]);

  const getIssues = () => {
    axios
      .get(
        `/issues/filter?status=${state?.status ?? ""}&tagId=${
          state?.tagId ?? ""
        }&typeId=${state?.typeId ?? ""}&text=${state?.text ?? ""}&creatorId=${
          state?.creatorId ?? ""
        }&reviewerId=${state?.reviewerId ?? ""}&resolverId=${
          state?.resolverId ?? ""
        }`
      )
      .then((res) => {
        setIssues(res.data);
      });
  };
  return (
    <>
      <Header title="Issue List" />
      <Box sx={{ mt: 4 }} />

      <FilterCard state={state} setState={setState} showUsers />

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
