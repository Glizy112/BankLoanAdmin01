import React from "react";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { XCircle } from "../icons/x-circle";

function AlertToast({ type, msg, onClick }) {
  return (
    <Alert
      icon={false}
      severity={type}
      sx={{justifyContent: 'center', alignItems: 'center'}}
      action={
        <Button color="inherit" size="small" onClick={onClick}>
          <XCircle />
        </Button>
      }
    >
      {msg}
    </Alert>
  );
}

export default AlertToast;
