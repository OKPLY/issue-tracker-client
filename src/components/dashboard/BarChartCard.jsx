import React from "react";
import ReactECharts from "echarts-for-react";
import { Box, Paper, Typography } from "@mui/material";

function BarChartCard({ title, labels, data, categories }) {
  const [labelsState, setLabelsState] = React.useState(labels || []);
  const [dataState, setDataState] = React.useState(data || []);
  const [categoriesState, setCategoriesState] = React.useState(
    categories || []
  );

  React.useEffect(() => {
    if (!labels) return;
    setLabelsState(labels);
  }, [labels]);
  React.useEffect(() => {
    if (!data) return;
    setDataState(data);
  }, [data]);
  React.useEffect(() => {
    if (!categories) return;
    setCategoriesState(categories);
  }, [categories]);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    colorBy: "data",
    xAxis: {
      type: "category",
      data: labelsState,
    },
    yAxis: {
      type: "value",
    },
    series: dataState.map((data, idx) => ({
      data: data,
      type: "bar",
      smooth: true,
      name: categoriesState?.at(idx),
    })),
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h6" align="center" mb={1}>
          {title}
        </Typography>
        <ReactECharts option={options} />
      </Box>
    </Paper>
  );
}

export default BarChartCard;
