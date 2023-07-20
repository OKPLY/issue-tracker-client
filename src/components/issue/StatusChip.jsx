import { Chip } from "@mui/material";
import React, { useMemo } from "react";
import { STATUS } from "../../util/constants";

function StatusChip({ label, small }) {
  const color = useMemo(
    () => ({
      [STATUS.CREATED]: "primary",
      [STATUS.ASSIGNED]: "secondary",
      [STATUS.RESOLVED]: "success",
      [STATUS.CLOSED]: "error",
    }),
    []
  );

  return (
    <Chip
      size={small ? "small" : "medium"}
      label={label}
      color={color[label] ?? "secondary"}
      sx={{ width: small ? 100 : 120 }}
    />
  );
}

export default StatusChip;
