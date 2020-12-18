import React, {Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as dataActionCreators } from './store/data';
import {Button} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {ClearSharp, CloudDownloadSharp, CloudUploadSharp} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class SolutionsAndExport extends React.Component {
    constructor(props) {
        super(props);

        this.showSolutionsClick = this.showSolutionsClick.bind(this);
        this.closeSolutionsClick = this.closeSolutionsClick.bind(this);
        this.importClick = this.importClick.bind(this);
        this.exportClick = this.exportClick.bind(this);
        this.clearClick = this.clearClick.bind(this);

        this.state = {
            open: false
        }
    }

    showSolutionsClick(event) {
        this.setState({open: true})
    }

    closeSolutionsClick(event) {
        this.setState({open: false})
    }

    importClick(event) {
        alert("Importing is not implemented yet!")
    }
    exportClick(event) {
        alert("Exporting is not implemented yet!")
    }
    clearClick(event) {
        this.props.clearAllData({});
    }


    render() {
        let fieldNames = this.props.fields.flat()
        return (
            <Fragment>
                <Button onClick={this.clearClick} variant="contained" color="secondary"><ClearSharp />&nbsp;Clear</Button>
                <ButtonGroup color="primary" variant="contained" aria-label="contained primary button group" fullWidth>
                    <Button onClick={this.importClick}><CloudUploadSharp />&nbsp;Import</Button>
                    <Button onClick={this.exportClick}><CloudDownloadSharp />&nbsp;Export</Button>
                </ButtonGroup>
                <Badge
                    badgeContent={this.props.solutions.length}
                    color="secondary"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Button onClick={this.showSolutionsClick} variant="contained" color="primary" fullWidth>Show Solutions</Button>
                </Badge>

                <Dialog onClose={this.closeSolutionsClick} aria-labelledby="customized-dialog-title" open={this.state.open} fullWidth={true} maxWidth = {'lg'}>
                    <DialogTitle id="customized-dialog-title" onClose={this.closeSolutionsClick}>
                      Solution space
                    </DialogTitle>
                    <DialogContent dividers >
                        <TableContainer component={Paper} style={{overflowX: "hidden"}}>
                          <Table aria-label="simple table">
                            <TableHead style={{backgroundColor: "#ededed"}}>
                              <TableRow>
                                  {
                                      this.props.parameters.map(parameter => {
                                          return <TableCell key={parameter} style={{fontWeight: "bold"}}>{parameter}</TableCell>
                                      })
                                  }
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                      this.props.solutions.map(solution => {
                                          return <TableRow key={solution.toString()}>
                                              <Fragment>
                                                  {
                                                      solution.map(field => {
                                                          return <TableCell align="left">{fieldNames[field]}</TableCell>
                                                      })
                                                  }
                                              </Fragment>
                                          </TableRow>
                                      })
                                }
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={this.closeSolutionsClick} color="primary" variant="outlined">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
            </Fragment>
        );
    }
}

export default connect(
	state => state.data,
    dispatch => bindActionCreators({ ...dataActionCreators, }, dispatch)
)(SolutionsAndExport);