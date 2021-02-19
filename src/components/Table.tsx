import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { getData } from "../api/api";
import Filter from "./Filter";
import AddItem from "./AddItem";

interface Data {
  firstName: string;
  email: string;
  lastName: string;
  id: number;
  phone: string;
}

// type Person = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: Address;
//   description: string;
// };

// type Address = {
//   streetAddress: string;
//   city: string;
//   state: string;
//   zip: string;
// };

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  { id: "lastName", numeric: true, disablePadding: false, label: "Last Name" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "phone", numeric: true, disablePadding: false, label: "Phone" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& .MuiTableCell-root": {},
    },
    paper: {
      width: "95%",
      marginBottom: theme.spacing(2),
      margin: "auto",
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    button: {
      display: "block",
      margin: "35px",
    },
    addcomp:{
      width:'95%',
      display:'flex',
      justifyContent:'flex-end',
      margin:'auto'
    }
  })
);

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("firstName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Array<Data>>([]);
  const [idValue, setIdValue] = React.useState<number>(0);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [filterAll, setFilterAll] = React.useState<Array<Data>>([]);
  const [showAddItem,setShowAddItem] = React.useState(false)

  const filteredRows: Array<any> = [];

  useEffect(() => {
    const fetchSmallData = async () => {
      const res = await getData.getSmallData();
      setRows(res);
    };
    const fetchBigData = async () => {
      const res = await getData.getBigData();
      setRows(res);
    };
    //fetchBigData();
    fetchSmallData();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const findById = (id: number) => {
    const find = rows.filter((el) => {
      if (Object.values(el).includes(idValue)) {
        return el.id === id;
      }
    });

    filteredRows.push(find);
  };

  const findByFirstName = (firstName: string) => {
    const firstNames = rows.filter((el) => {
      const lowerCase = el.firstName.toLowerCase();
      return lowerCase === firstName;
    });
    filteredRows.push(firstNames);
  };
  const findByLastName = (lastName: string) => {
    const lastNames = rows.filter((el) => {
      const lowerCase = el.lastName.toLowerCase();
      return lowerCase === lastName;
    });
    filteredRows.push(lastNames);
  };
  const findByEmail = (email: string) => {
    const emails = rows.filter((el) => {
      const lowerCase = el.email.toLowerCase();
      return lowerCase === email;
    });
    filteredRows.push(emails);
  };
  const findByPhone = (phone: string) => {
    const phones = rows.filter((el) => {
      return el.phone === phone;
    });
    filteredRows.push(phones);
  };
  // const handleFilterAll = () => {
  //   const result = rows.filter((el) => {
  //     return (
  //       el.id === idValue ||
  //       el.firstName.toLowerCase() === firstName ||
  //       el.lastName.toLowerCase() === lastName
  //     );
  //   });
  //   setFilterAll(result);
  // };
  // console.log(filterAll);

  const handaleShowAdd=()=>{
    setShowAddItem(!showAddItem);
  }

  const IdValue = (id: number) => {
    setIdValue(id);
  };
  const firstNameValue = (firstName: string) => {
    setFirstName(firstName);
  };
  const lastNameValue = (lastName: string) => {
    setLastName(lastName);
  };
  const emailValue = (email: string) => {
    setEmail(email);
  };
  const phoneValue = (phone: string) => {
    setPhone(phone);
  };

  findById(idValue);
  findByFirstName(firstName);
  findByLastName(lastName);
  findByEmail(email);
  findByPhone(phone);

  return (
    <div className={classes.root}>
      <div className={classes.addcomp}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handaleShowAdd}
        // disabled={true}
        className={classes.button}
        >
        Add
      </Button>
        </div>
     {showAddItem? <AddItem/>:''}
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              <TableRow>
                <TableCell padding="checkbox">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    // onClick={handleFilterAll}
                    disabled={true}
                  >
                    Find
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Filter
                    IdValue={IdValue}
                    firstNameValue={firstNameValue}
                    lastNameValue={lastNameValue}
                    emailValue={emailValue}
                    phoneValue={phoneValue}
                  />
                </TableCell>
                <TableCell align="center">
                  <Filter
                    IdValue={IdValue}
                    firstNameValue={firstNameValue}
                    lastNameValue={lastNameValue}
                    emailValue={emailValue}
                    phoneValue={phoneValue}
                  />
                </TableCell>
                <TableCell align="center">
                  <Filter
                    IdValue={IdValue}
                    firstNameValue={firstNameValue}
                    lastNameValue={lastNameValue}
                    emailValue={emailValue}
                    phoneValue={phoneValue}
                  />
                </TableCell>
                <TableCell align="center">
                  <Filter
                    IdValue={IdValue}
                    firstNameValue={firstNameValue}
                    lastNameValue={lastNameValue}
                    emailValue={emailValue}
                    phoneValue={phoneValue}
                  />
                </TableCell>
                <TableCell align="center">
                  <Filter
                    IdValue={IdValue}
                    firstNameValue={firstNameValue}
                    lastNameValue={lastNameValue}
                    emailValue={emailValue}
                    phoneValue={phoneValue}
                  />
                </TableCell>
              </TableRow>
              {filteredRows.flat().length === 0
                ? stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="center">{row.firstName}</TableCell>
                          <TableCell align="center">{row.lastName}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                        </TableRow>
                      );
                    })
                : filteredRows.flat().map((el, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow hover tabIndex={-1} key={el.id}>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {el.id}
                        </TableCell>
                        <TableCell align="center">{el.firstName}</TableCell>
                        <TableCell align="center">{el.lastName}</TableCell>
                        <TableCell align="center">{el.email}</TableCell>
                        <TableCell align="center">{el.phone}</TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
