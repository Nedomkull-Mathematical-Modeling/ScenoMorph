import React, {Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as dataActionCreators } from './store/data';
import {TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

class MultiDimensionalMatrix extends React.Component {
    constructor(props) {
        super(props);

        this.cellClick = this.cellClick.bind(this);
    }

    cellClick(event) {
        let parts = event.target.id.split('-');
        this.props.changeConsistencyState({row_idx: parseInt(parts[1]), column_idx: parseInt(parts[2])});
        //console.log("cellclick: " + event)
    }

    arraySum = arr => arr.reduce((a,b) => a + b, 0);

    render() {
        let parameterLengths = this.props.fields.map(p => (p.length));
        return (
            <TableContainer component={Paper} variant="outlined" style={{backgroundColor: "#fafafa"}}>
                <Table className={"MuiTable"} style={{marginLeft: "1em", marginRight: "1em", width: "95%"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{border: "0 solid black"}}></TableCell>
                            {
                                this.props.parameters.map((parameter, parameterIndex) => {
                                    let parameterName = parameter.length > 0 ? parameter: "Parameter " + (parameterIndex + 1);
                                    return(
                                        <Fragment key={parameterIndex}>
                                            {
                                                this.props.fields[parameterIndex].map((field, fieldIndex) => {
                                                    let fieldName = field.length > 0 ? field : parameterName + (fieldIndex + 1)
                                                    return (
                                                        <TableCell
                                                            key={parameterIndex + "-" + fieldIndex}
                                                            className="header-label-cell"
                                                        >
                                                            <span>{fieldName}</span>
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.parameters.map((parameter, parameterIndex) => {
                                let parameterName = parameter.length > 0 ? parameter: "Parameter " + (parameterIndex + 1);
                                return <Fragment key={parameterIndex}>
                                    {
                                        this.props.fields[parameterIndex].map((field, fieldIndex) => {
                                            let fieldName = field.length > 0 ? field : parameterName + (fieldIndex+1)
                                            let rowNumber = this.arraySum(parameterLengths.slice(0,parameterIndex)) + fieldIndex;
                                            return <TableRow key={'field-row-'+parameterIndex + '-' + fieldIndex}>
                                                <TableCell className="label-cell" style={{border: "0 solid black"}}>{fieldName}</TableCell>
                                                {
                                                    this.props.matrix[rowNumber].map((cell, cell_index) => {
                                                        if (cell_index < (rowNumber - fieldIndex))
                                                        {
                                                            return <TableCell key={cell_index} id={"cell-" + (rowNumber) + "-" + cell_index } onClick={this.cellClick} className={cell === true ? "consistent" : "inconsistent"}></TableCell>
                                                        }
                                                        else
                                                        {
                                                            return <TableCell key={cell_index} className="black-cell"></TableCell>
                                                        }
                                                    })
                                                }
                                            </TableRow>

                                        })
                                    }
                                </Fragment>

                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    renderX() {
        let parameterLengths = this.props.fields.map(p => (p.length));

        return (
            <div className="table-container">
                <table style={{borderCollapse: "collapse", }}>
                    <thead>
                        <tr>
                            <th style={{border: "0 solid black"}}></th>
                            {
                                this.props.parameters.map((parameter, parameterIndex) => {
                                    let parameterName = parameter.length > 0 ? parameter: "Parameter " + (parameterIndex + 1);
                                    return(
                                        <Fragment key={parameterIndex}>
                                            {
                                                this.props.fields[parameterIndex].map((field, fieldIndex) => {
                                                    let fieldName = field.length > 0 ? field : parameterName + (fieldIndex + 1)
                                                    return <th key={parameterIndex + "-" + fieldIndex}
                                                               className="rotate" style={{border: "0 solid black"}}>
                                                        <span>{fieldName}</span></th>
                                                })
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.parameters.map((parameter, parameterIndex) => {
                                let parameterName = parameter.length > 0 ? parameter: "Parameter " + (parameterIndex + 1);
                                return <Fragment key={parameterIndex}>
                                    {
                                        this.props.fields[parameterIndex].map((field, fieldIndex) => {
                                            let fieldName = field.length > 0 ? field : parameterName + (fieldIndex+1)
                                            let rowNumber = this.arraySum(parameterLengths.slice(0,parameterIndex)) + fieldIndex;
                                            return <tr key={'field-row-'+parameterIndex + '-' + fieldIndex}>
                                                <td className="label-cell" style={{border: "0 solid black"}}>{fieldName}</td>
                                                {
                                                    this.props.matrix[rowNumber].map((cell, cell_index) => {
                                                        if (cell_index < (rowNumber - fieldIndex))
                                                        {
                                                            return <td key={cell_index}  id={"cell-" + (rowNumber) + "-" + cell_index } onClick={this.cellClick} className={cell === true ? "consistent" : "inconsistent"}></td>
                                                        }
                                                        else
                                                        {
                                                            return <td key={cell_index} className="black-cell"></td>
                                                        }
                                                    })
                                                }
                                            </tr>

                                        })
                                    }
                                </Fragment>

                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
	state => state.data,
    dispatch => bindActionCreators({ ...dataActionCreators, }, dispatch)
)(MultiDimensionalMatrix);