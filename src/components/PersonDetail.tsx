import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Data1 } from "./Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #80808045",
      margin: "10px auto",
      marginBottom: "10px",
      width: "70%",
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      padding: "1rem 1rem",
      borderRadius:'5px',
      boxShadow: '0px 0px 3px 0px #8080808c',
      "& > p": {
        margin: 0,
        padding: " .5rem 0",
      },
    },
    pBold: {
      fontWeight: "bold",
    },
  })
);

type PropsType = {
  item?: Data1;
};

const PersonDetail: FC<PropsType> = ({ item }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p className={classes.pBold}>Selected User {`${item?.firstName} ${item?.lastName}`}</p>
      <p>Description:</p>
      <p>{item?.description}</p>
      <p className={classes.pBold}>Address: {item?.address?.streetAddress}</p>
      <p className={classes.pBold}>City: {item?.address?.city}</p>
      <p className={classes.pBold}>State: {item?.address?.state}</p>
      <p className={classes.pBold}>zip: {item?.address?.zip}</p>
    </div>
  );
};

export default PersonDetail;
