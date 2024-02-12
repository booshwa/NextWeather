import React from "react";

// MUI
import { Paper } from "@mui/material";

const Block = ({ children, style = {} }) => {
  return (
    <Paper style={style} className="paper_block">
      {children}
    </Paper>
  );
};

export default Block;
