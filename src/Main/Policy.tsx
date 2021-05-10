import React, { useState } from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import Link from '../Link';

import { useDispatch } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    bold: {
      display: 'inline',
      fontWeight: 'bold',
    },
  })
);

function Policy() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch({ type: 'NEXT_STEP'});
  }

  return (
    <>
      <Typography variant="body2">
        本ツールはモンスターハンターライズ（MHRise）のゲーム内映像から所持している護石のスキル構成を解析するツールです。
      </Typography>
      <Typography variant="body2">
        解析のため、動画を一時的にサーバに保存します。動画は誰からもアクセスできず、解析後は直ちに削除されますが、
        <Typography variant="body2" className={classes.bold}>護石の解析と無関係の動画</Typography>、
        <Typography variant="body2" className={classes.bold}>個人情報が含まれる動画</Typography>などはアップロードしないようお願いします。

      </Typography>
      <Typography variant="body2">
        画像処理を行っている都合上、<Typography variant="body2" className={classes.bold}>精度は100%ではない</Typography>ことをご了承下さい。
      </Typography>
      <Typography variant="body2">
        また、検出できるスキル名にも制限があります。詳しくは<Link href="/catalog" target="_blank" rel="noopener noreferrer">検出できる情報一覧</Link>をご確認下さい。
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
          />
        }
        label="同意する"
      />
    </>
  );
}

export default Policy;
