import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
            Table,
            TableBody,
            TableCell,
            TableContainer,
            TableHead,
            TableRow,
            Paper,
            Typography,
            TablePagination,
            TableFooter
        } from '@material-ui/core';
import UserTableRecords from '../users/userTableRecords';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  tableContainer: {
      borderRadius:15,
  },
  tableHeaderCell: {
      fontWeight:'bold',
      backgroundColor:theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  }
}));


function MTable(props) {
    const classes = useStyles();

    const { tableData, contentFlag, editFunc } = props;

    

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rows, setRows] = useState(tableData);


    //onload event not showing records, so used useEffect with condition
    useEffect(() => {
        setRows(tableData);
      
    }, [JSON.stringify(tableData)]);



    const[searched, setSearched] = useState("");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const requestSearch = (searchedVal)=>{ 
        const filteredRows = tableData.filter((row)=> {
            return row.fullName.toLowerCase().includes(searchedVal.toLowerCase());
        })
        setRows(filteredRows);
    }

    const cancelSearch = ()=>{
        setSearched("");
        requestSearch(searched);
    }



    function TableRecords(props) {

        switch(props.flag) {
    
          case 'USERS':
    
            return <UserTableRecords editFunc={props.editFunc} rows={props.rows} page={props.page} rowsPerPage={props.rowsPerPage}  />;
    
        //   case 'QRCODES':
    
        //     return 'Show qrcodes here.';
    
          default:
    
            return null;
    
        }
    
      }



  return (
      <>
        <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
        />
        <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
            <TableRecords editFunc={editFunc} flag={contentFlag} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            <TableFooter>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableFooter>
        </Table>
        </TableContainer>
    </>
  );
}

export default MTable;