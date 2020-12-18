import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as dataActionCreators } from './store/data';
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {AddCircleSharp, DeleteSharp} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";


class ControlForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddParameter = this.handleAddParameter.bind(this);
        this.handleDeleteParameter = this.handleDeleteParameter.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);

        this.inputFieldChanged = this.inputFieldChanged.bind(this);
    }

    handleAddParameter(event) {
        this.props.addParameter({});
    }

    handleDeleteParameter(parameterIndex) {
        this.props.deleteParameter({parameterIndex: parameterIndex});
    }

    handleDeleteField(parameterIndex, fieldIndex) {
        this.props.deleteField({parameterIndex: parameterIndex, fieldIndex: fieldIndex});
    }

    handleAddField(parameterIndex) {
        //let s = event.target.parent.id.split('-')
        this.props.addField({parameterIndex: parameterIndex});
    }

    inputFieldChanged(event) {
        let s = event.target.id.split('-')
        let payload = {value: event.target.value, parameterIndex: parseInt(s[1]), fieldIndex: parseInt(s[2]), type:s[0]};
        this.props.changeName(payload);
    }

    render() {
        return (
            <Paper variant="outlined" style={{backgroundColor: "#fafafa"}}>
                <form className={"control-form"}>
                    {
                        this.props.parameters.map((parameter, parameterIndex) => {
                            let parameterName = parameter.length > 0 ? parameter: "Parameter " + (parameterIndex + 1);
                            return (
                                <Card variant="outlined" key={"parameter-" + parameterIndex} style={{marginTop: "1em", backgroundColor: "#fbfbfb"}}>
                                    <CardContent style={{display: "flex", flexDirection: "column"}}>
                                        <TextField
                                            label="Parameter Name"
                                            variant="outlined"
                                            fullWidth
                                            id={"parameter-" + parameterIndex + '-0'}
                                            value={parameter}
                                            onChange={this.inputFieldChanged}
                                            placeholder={"Enter name of Parameter "  + (parameterIndex+1) + "..."}
                                            inputProps={{style: {fontWeight: "bold"}}}

                                        />

                                        {
                                            this.props.fields[parameterIndex].map((field, fieldIndex) => {
                                                let fieldName = field.length > 0 ? field: "Field " + (fieldIndex + 1);
                                                return <div key={fieldIndex} style={{ marginLeft: "1em", marginTop: "0.5em", marginBottom: "0.5em", display: "flex", flexDirection: "row", alignItems: "center"}} >
                                                    <TextField
                                                        fullWidth
                                                        onChange={this.inputFieldChanged}
                                                        id={"field-" + parameterIndex + "-" + fieldIndex}
                                                        value={field}
                                                        placeholder={"Enter name of " + parameterName + " field " + (fieldIndex+1) + "..."}
                                                        InputProps={{
                                                          startAdornment: (
                                                            <Avatar position="start" style={{width: "16px", height: "16px", fontSize: "8px", marginRight: "1em", marginBottom: "3px"}}>
                                                                {(fieldIndex + 1).toString()}
                                                            </Avatar>
                                                          ),
                                                        }}
                                                    />
                                                    <Tooltip title={"Delete " + fieldName}>
                                                        <IconButton
                                                            id={"delete-field-" + parameterIndex + "-" + fieldIndex}
                                                            onClick={() => {this.handleDeleteField(parameterIndex, fieldIndex);}}
                                                            aria-label="delete field"
                                                            color="secondary"
                                                        >
                                                          <DeleteSharp />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            })
                                        }
                                    </CardContent>
                                    <CardActions>
                                        <Tooltip title={"Add a field to " + parameterName}>
                                            <IconButton
                                                id={"add-field-" + parameterIndex}
                                                onClick={() => {this.handleAddField(parameterIndex);}}
                                                aria-label="add new field"
                                                color="primary"
                                            >
                                              <AddCircleSharp/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={"Delete " + parameterName}>
                                            <IconButton
                                                id={"delete-parameter-" + parameterIndex}
                                                onClick={() => {this.handleDeleteParameter(parameterIndex);}}
                                                aria-label="delete parameter"
                                                color="secondary"
                                            >
                                              <DeleteSharp/>
                                            </IconButton>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }

                    <Button
                        fullWidth
                        onClick={this.handleAddParameter}
                        color="primary"
                        style={{marginTop: "1em", marginBottom: "1em"}}
                    >
                        <AddCircleSharp />&nbsp;Add new Parameter
                    </Button>
                </form>
            </Paper>
        );
    }
}

export default connect(
	state => state.data,
    dispatch => bindActionCreators({ ...dataActionCreators, }, dispatch)
)(ControlForm);