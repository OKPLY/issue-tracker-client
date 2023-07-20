import { Box, Container } from "@mui/material";
import IssueCard from "../components/issue/IssueCard";
import Header from "../components/layout/Header";
import axios from "../config/axiosConfig";
import React from "react";
import { STATUS } from "../util/constants";

export default function ReviewIssues() {
  const [issues, setIssues] = React.useState([]);

  React.useEffect(() => {
    getIssues();
  }, []);

  const getIssues = () => {
    axios.get(`/issues/filter?status=${STATUS.CREATED}`).then((res) => {
      setIssues(res.data);
    });
  };
  return (
    <>
      <Header title="Review Issues" />
      <Box sx={{ mt: 5 }} />
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
