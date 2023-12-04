import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

const InputWithIcon = ({startIcon=<PasswordIcon />,placeholder}) => {
  return (
    <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <startIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
  );
};

export default InputWithIcon;
