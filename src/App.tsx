import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useStore, useDispatch } from './store';

import Support from './support';

import Header from './Header';
import Main from './Main';
import About from './About';
import Catalog from './Catalog';
import Pages from './Pages';
import Footer from './Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
    },
    root: {
      margin: 'auto',
      marginTop: '10px',
      marginBottom: '10px',
      width: '96%',
      maxWidth: '1000px',
    },
  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const classes = useStyles();

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  const dispatch = useDispatch();
  const snackbar = useStore('snackbar');

  const handleClose = () => dispatch({ type: 'SNACKBAR', payload: null });

  return (
    Support ?
      <div className={classes.body}>
        <Card elevation={5} className={classes.root}>
          <CardContent>
            <ThemeProvider theme={theme}>
              <Router>
                <Route path={Pages.main} component={Header} />
                <Switch>
                  <Route exact path={Pages.main}   component={Main} />
                  <Route exact path={Pages.about}  component={About} />
                  <Route exact path={Pages.detect} component={Catalog} />
                  <Route render={() => <Redirect to={Pages.main} />} />
                </Switch>
                <Route path={Pages.main} component={Footer} />
              </Router>
            </ThemeProvider>
            <Snackbar
              open={snackbar !== null}
              autoHideDuration={3000}
              message={snackbar?.type === 'default'? snackbar.text : undefined}
              onClose={handleClose}
            >
              { snackbar && snackbar?.type !== 'default'?  <Alert severity={snackbar?.type}>{snackbar?.text}</Alert> : undefined }
            </Snackbar>
          </CardContent>
        </Card>
      </div>
    :
      <div>
        <p>申し訳ありません。お使いのブラウザはサポートされていません。</p>
        <p>異なるブラウザを使用してもう一度お試し下さい。</p>
      </div>
  );
}

export default App;
