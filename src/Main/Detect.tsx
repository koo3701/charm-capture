import { useEffect } from 'react';

import { functions } from '../firebase';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useStore, useDispatch } from '../store';

import AdsCard from '../AdsCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    progress: {
      margin: 10,
    },
  })
);

function Detect() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const files = useStore('files');

  useEffect(() => {
    const filenames = files.map(file => file.src);
    const start = new Date().getTime();
    const timeout = 180;

    Promise
      .all(filenames.map(filename => functions .httpsCallable('charm_capture', { timeout: (timeout + 10) * 1000 })([filename])))
      .then(res => {
        dispatch({ type: 'SET_CHARM_INFO', payload: res.reduce((p, c) => p.concat(c['data']), []) });
        dispatch({ type: 'NEXT_STEP' });
      })
      .catch(error => {
        console.log(error)
        const diff = (new Date().getTime() - start) / 1000;
        dispatch({ type: 'SNACKBAR', payload: {
          text: diff <= timeout ? 'エラーが発生しました。もう一度お試しください。' : '処理がタイムアウトしました。動画を短く編集して再度お試し下さい。',
          type: 'error',
        } });
        dispatch({ type: 'RESET' });
      })
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="body1">解析中です。この処理には数十秒〜数分程度かかります。</Typography>
      <LinearProgress className={classes.progress}/>
      <AdsCard data-ad-slot={process.env.REACT_APP_GOOGLE_AD_SLOT_SQUARE_DETECT ?? ''} />
    </div>
  );
}

export default Detect;
