import React, { FC } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

type PropsType = {
  IdValue: (id: number) => void;
  firstNameValue: (firtsName: string) => void;
  lastNameValue: (lastName: string) => void;
  emailValue: (email: string) => void;
  phoneValue: (phone: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
  })
);

const Filter: FC<PropsType> = ({
  IdValue,
  firstNameValue,
  lastNameValue,
  emailValue,
  phoneValue,
}) => {
  const classes = useStyles();




  const handleIdValue= (e: React.ChangeEvent<HTMLInputElement>) => {
      IdValue(Number(e.currentTarget.value));
  };
  const handleFirstNameValue= (e: React.ChangeEvent<HTMLInputElement>) => {
    firstNameValue(e.currentTarget.value);
  };
  const handleLastNameValue= (e: React.ChangeEvent<HTMLInputElement>) => {
    lastNameValue(e.target.value);
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleIdValue(e);
    handleFirstNameValue(e);
    handleLastNameValue(e);
    emailValue(e.currentTarget.value);
    phoneValue(e.currentTarget.value);
  };

  const handlaeSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handlaeSubmit}
    >
      <TextField
        id="standard-basic"
        label="Filter by ID..."
        onChange={handleChange}
      />
    </form>
  );
};

export default Filter;
