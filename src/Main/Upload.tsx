import { useState, useEffect } from 'react';

import firebase, { storage } from '../firebase';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useStore, useDispatch } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

function Upload() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const files = useStore('files');
  const type = useStore('type');

  const [progress, setProgress] = useState<number[][]>([]);

  useEffect(() => {
    setProgress([
      new Array(files.length).fill(0),
      new Array(files.length).fill(0),
      new Array(files.length).fill(0),
    ]);
    dispatch({ type: 'SET_FILES', payload: files.map((file, i) => {
      const filename = type + '-'  + i + (new Date().getTime()) + '.mp4';
      const path = 'work/' +  filename;
      storage
        .ref()
        .child(path)
        .put(file.file)
        .on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
          setProgress(p => {
            p = JSON.parse(JSON.stringify(p));
            p[0][i] = snapshot.bytesTransferred;
            p[1][i] = snapshot.totalBytes;
            return p;
          });
        },
        error => {
          dispatch({ type: 'SNACKBAR', payload: { text: 'エラーが発生しました。もう一度お試しください。', type: 'error' } });
          dispatch({ type: 'RESET' });
        },
        () => setProgress(p => {
            p = JSON.parse(JSON.stringify(p));
            p[2][i] = 1;
            return p;
          }));
      file.src = filename;
      return file;
    }) });
  }, []);

  const p = progress.length?
              progress[0].reduce((p, c) => p + c, 0) /
              Math.max(progress[1].reduce((p, c) => p + c, 0), 0.01) * 100 : 0;
  
  useEffect(() => {
    if (progress.length && progress[2].reduce((p, c) => p && c !== 0, true)) dispatch({ type: 'NEXT_STEP' });
  }, [progress])

  return (
    <div className={classes.root}>
      <span>
        <LinearProgress
          variant="determinate"
          value={p} />
          <p>{Math.floor(p)}%</p>
      </span>
    </div>
  );
}

export default Upload;
