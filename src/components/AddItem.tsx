import React, { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@material-ui/core";
import InputMask from "react-input-mask";
import { Data } from "./Table";


interface IFormInput {
  firstName: string;
  email: string;
  lastName: string;
  id: number;
  phone: string;
}

type PropsType={
  addItemToTable:(data:Data)=>void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "95%",
      margin: "auto",
      display: "flex",
      justifyContent: "space-evenly",
    },
    input: {
      height: "30px",
      borderRadius: 5,
      padding: "0 15px",
      outline: "none",
      border: "2px solid #d4d4d4f5",
      transition: "all .5s ease",
      "&:focus": {
        border: "2px solid #2424dec4",
      },
    },
  })
);

const AddItem:FC<PropsType> = ({addItemToTable}) => {
  const classes = useStyles();
  const { register, handleSubmit, control, reset } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    addItemToTable(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete='off'>
      <input
        name="id"
        ref={register({ required: true })}
        placeholder="Id"
        type="number"
        className={classes.input}
        required
      />
      <input
        name="firstName"
        ref={register({ required: true, pattern: /^[A-Za-z]+$/i  })}
        placeholder="FirstName"
        className={classes.input}
        required
      />
      <input
        name="lastName"
        ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
        placeholder="LastName"
        required
        className={classes.input}
      />
      <input
        name="email"
        type="email"
        ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
        placeholder="Email"
        required
        className={classes.input}
      />
      <Controller
        as={InputMask}
        control={control}
        mask="(999)999-9999"
        defaultValue="Phone (999)999-9999"
        name="phone"
        required
        className={classes.input}
      />

      <Button variant="contained" color="primary" type="submit">
        Add Item
      </Button>
    </form>
  );
};

export default AddItem;
