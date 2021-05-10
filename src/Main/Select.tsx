import { useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';

import { useDispatch } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropzone: {
      height: '60vh',
      maxHeight: '80vmin',
      display: 'flex',
      border: 'dashed',
      cursor: 'pointer',
    },
    dropzoneInner: {
      margin: 'auto',
      fontSize: '100px',
      cursor: 'pointer',
    },
  })
);

function Select() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);
  const accept = 'video/mp4';

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDisabled(false); 
    const files = acceptedFiles
      .slice(0, 5)
      .map(file => ({
        file: file,
        src: (URL || webkitURL).createObjectURL(file),
      }))
      .filter(file => file.src && file['file'].name.endsWith('.mp4') && file.file.size <= 20 * 1024 * 1024);
    if (files.length === 0) {
      dispatch({ type: 'SNACKBAR', payload: { text: 'エラーが発生しました。ファイルの形式やサイズを確認してもう一度お試しください。', type: 'error' } });
      dispatch({ type: 'RESET' });
    }
    dispatch({ type: 'SET_FILES', payload: files });
    if (files.length > 0) dispatch({ type: 'NEXT_STEP' });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    disabled,
  });

  return (
    <div>
      <Typography variant="body1">動画を選択してください。（5つまで）</Typography>
      <Typography variant="body1">解像度1280×720、長さ〜30秒程度を推奨。詳しくは<Link href="/about#video-format" target="_blank" rel="noopener noreferrer">こちら</Link></Typography>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        <p className={classes.dropzoneInner}>+</p>
      </div>
    </div>
  );
}

export default Select;
