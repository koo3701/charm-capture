import React from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Link from '../Link';

import { useStore, useDispatch } from '../store';
import { VideoType } from '../Types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      maxWidth: 1280 / 2,
      width: "100%",
      margin: 5,
    },
  })
);

function Confirm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const files = useStore('files');
  const type = useStore('type');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_TYPE', payload: (event.target as HTMLInputElement).value as VideoType});

  const handleUpload = () => {
    dispatch({ type: 'NEXT_STEP' });
  }
  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">動画の種類を選択してください。</FormLabel>
        <RadioGroup aria-label="video-type" name="video-type" value={type} onChange={handleChange}>
          <FormControlLabel value="renkin" control={<Radio />} label={<Typography variant="body1">錬金リザルト（<Link href="/about#renkin" target="_blank" rel="noopener noreferrer">参考</Link>）</Typography>} />
          <FormControlLabel value="box"    control={<Radio />} label={<Typography variant="body1">アイテムBOX（<Link href="/about#box" target="_blank" rel="noopener noreferrer">参考</Link>）</Typography>} />
        </RadioGroup>
      </FormControl>
      <div>
        <Button variant="contained" color="primary" onClick={handleUpload}>アップロード</Button>
        <Button onClick={handleBack}>戻る</Button>
      </div>
      <p>プレビュー</p>
      {files.map(file => (
        <React.Fragment key={file.file.name}>
          <div>
            {file.src && (
              <video controls className={classes.video}>
                <source src={file.src}></source>
              </video>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

export default Confirm;
