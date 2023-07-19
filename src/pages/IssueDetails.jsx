import React from "react";
import Header from "../components/layout/Header";
import { useParams } from "react-router";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";

function IssueDetails() {
  const [issue, setIssue] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    getIssue();
  }, []);

  const getIssue = () => {
    axios
      .get(`/issues/${id}`)
      .then((res) => {
        setIssue(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message ?? "Something went wrong");
      });
  };
  return (
    <>
      <Header title="Issue Details" />
    </>
  );
}

export default IssueDetails;
