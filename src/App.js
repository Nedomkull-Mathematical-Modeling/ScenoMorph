import './App.css';
import { connect } from 'react-redux';
import ControlForm from "./ControlForm";
import MultiDimensionalMatrix from "./MultiDimensionalMatrix";
import SolutionsAndExport from "./SolutionsAndExport";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#228b22"
    },
    secondary: {
      main: "#f44336"
    }
  }

});


function App() {
  return (
  <MuiThemeProvider theme={theme}>
      <Grid container spacing={1}>
        <Grid container item xs={12} sm={10}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              spacing={0}
            >
                <img src="/xm.png" height="80" alt="Scenomorph logo"/>
                <h1>ScenoMorph</h1>
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              spacing={0}
            >
                <h5>Scenario modelling with morphological analysis</h5>
                <p style={{fontSize: "x-small"}}>Example data taken from <a href="https://www.sciencedirect.com/science/article/pii/S004016251730656X?via%3Dihub">this article</a>.</p>
            </Grid>
        </Grid>
        <Grid container item xs={12} sm={2} spacing={1} direction="column" justify="space-evenly">
              <SolutionsAndExport></SolutionsAndExport>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid container item xs={12} sm={3} spacing={1} direction="column" justify="space-around">
            <ControlForm></ControlForm>
        </Grid>
        <Grid container item xs={12} sm={9} spacing={1} direction="row" justify="flex-start">
            <MultiDimensionalMatrix></MultiDimensionalMatrix>
        </Grid>
      </Grid>
  </MuiThemeProvider>
  );
}

export default connect(state => state.data)(App);
