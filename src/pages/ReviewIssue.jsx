import { Box, Container } from "@mui/material";
import IssueCard from "../components/issue/IssueCard";
import Header from "../components/layout/Header";

export function ReviewIssues() {
  const tags = ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"];

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
  ];
  const issue = {
    title: "Title",
    attachments: itemData,
    tags: tags,
    description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
      " Lorem Ipsum has been the industry's standard dummy text" +
      " ever since the 1500s, when an unknown printer took a galley of" +
      "type and scrambled it to make a type specimen book. It has",
    //   "survived not only five centuries, but also the leap into" +
    //   " electronic typesetting, remaining essentially unchanged. It was" +
    //   "popularised in the 1960s with the release of" +
    //   " ever since the 1500s, when an unknown printer took a galley of" +
    //   "type and scrambled it to make a type specimen book. It has" +
    //   "survived not only five centuries, but also the leap into" +
    //   " electronic typesetting, remaining essentially unchanged. It was" +
    //   "popularised in the 1960s with the release of",
    type: "Type",
    status: "Resolved",
    user: {
      name: "Maggie ",
      profilePic: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    },
    comments: ["jdxnx", "njcdx"],
  };
  const issue2 = { ...issue };
  const items = [issue, issue2];
  return (
    <>
      <Header title="Review Issues" />
      <Box sx={{ mt: 10 }} />
      {items.map((itemData) => {
        return (
          <>
            <IssueCard issue={itemData} />
          </>
        );
      })}
    </>
  );
}
