import React, { FC, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

type PropsType = {
  IdValues: (id: number) => void;
  firstNameValue: (firtsName: string) => void;
  lastNameValue: (lastName: string) => void;
  emailValue: (email: string) => void;
  phoneValue: (phone: string) => void;
  handleFilterAll: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
        display: "flex",
      },
    },
  })
);

const Filter: FC<PropsType> = ({
  IdValues,
  firstNameValue,
  lastNameValue,
  emailValue,
  phoneValue,
  handleFilterAll,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(false);

  const handleIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    IdValues(Number(e.currentTarget.value));
    if (e.currentTarget.value !== "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  const handleFirstNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    firstNameValue(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  const handleLastNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    lastNameValue(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailValue(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  const handlePhoneValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    phoneValue(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleFilterAll}
          disabled={value ? false : true}
        >
          Find
        </Button>
      </TableCell>

      <TableCell align="center">
        <TextField
          id="standard-basic"
          label="Filter by ID..."
          onChange={handleIdValue}
          autoComplete="off"
          name="id"
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-basic"
          label="Filter by First Name..."
          onChange={handleFirstNameValue}
          inputProps={{ autoComplete: "off" }}
          autoComplete="off"
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-basic"
          label="Filter by Last Name..."
          onChange={handleLastNameValue}
          inputProps={{ autoComplete: "off" }}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-basic"
          label="Filter by Email..."
          onChange={handleEmailValue}
          inputProps={{ autoComplete: "&#ef6#+" }}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-basic"
          label="Filter by Phone..."
          onChange={handlePhoneValue}
          inputProps={{ autoComplete: "&#6w+" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default Filter;
