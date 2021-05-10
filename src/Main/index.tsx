import { useEffect } from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import { useStore, useDispatch } from '../store'
import Select from './Select';
import Confirm from './Confirm';
import Upload from './Upload';
import Detect from './Detect';
import Result from './Result';
import Policy from './Policy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

function Index() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const step = useStore('step');
  const steps = [
    ['利用規約への同意', <Policy />],
    ['動画の選択', <Select />],
    ['動画の種類の選択', <Confirm />],
    ['アップロード', <Upload />],
    ['検出', <Detect />],
    ['結果', <Result />],
  ];

  useEffect(() => {
    dispatch({ type: 'RESET' });
    return () => dispatch({ type: 'RESET' });
  }, []);

  return (
    <div className={classes.root}>
      <Stepper activeStep={step} orientation="vertical">
        {steps.map((step, i) => (
          <Step key={i}>
            <StepLabel>{step[0]}</StepLabel>
            <StepContent>
              {step[1]}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default Index;
