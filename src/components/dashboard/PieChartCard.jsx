import React from "react";
import ReactECharts from "echarts-for-react";
import { Box, Paper, Typography } from "@mui/material";

function PieChartCard({ title, data, categories }) {
  const [dataState, setDataState] = React.useState(data || []);
  const [categoriesState, setCategoriesState] = React.useState(
    categories || []
  );

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

    series: {
      type: "pie",
      data: dataState.map((data, idx) => ({
        value: data,
        name: categoriesState?.at(idx),
      })),
    },

    roseType: "area",
    tooltip: {
      trigger: "item",
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

export default PieChartCard;
