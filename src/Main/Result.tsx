import React, { useState } from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Button from '@material-ui/core/Button';

import CopyToClipBoard from 'react-copy-to-clipboard';

import { useStore, useDispatch } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    wrap: {
      margin: 10,
    },
    copy: {
      marginLeft: 5,
      marginRight: 5,
    },
    tableContainer: {
      margin: 10,
      width: 175 * 2 + 100 * 2 + 97 * 3 + 20,
      maxWidth: '100%',
    },
    table: {
      margin: 10,
      width: 175 * 2 + 100 * 2 + 97 * 3,
      maxWidth: 'calc(100%, - 20)',
    },
    cellSkill: {
      width: 175,
    },
    cellLevel: {
      width: 100,
    },
    cellSlot: {
      width: 97,
    },
    text: {
      width: '100%',
    },
  })
);

function Result() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const charms = useStore('charms').map((charm) => [
    charm['skill'][0]['name'],
    charm['skill'][0]['level'],
    charm['skill'][1]['name'],
    charm['skill'][1]['level'],
    charm['slot'][0],
    charm['slot'][1],
    charm['slot'][2],
  ]);

  const views = ['table', 'csv', 'json'] as const;
  type View = typeof views[number];
  const [format, setFormat] = useState<View>('table');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFormat: View | null
  ) => {
    if (newFormat !== null) {
      setFormat(newFormat);
    }
  };

const handleClickButton = () => dispatch({ type: 'SNACKBAR', payload: { text: 'コピーしました。', type: 'success' }});

  const copy =
    format === 'table' ? (
      charms.map((charm) => charm.join('\t')).join('\n')
    ) : format === 'csv' ? (
      charms.map((charm) => charm.join(',')).join('\n')
    ) : format === 'json' ? (
      JSON.stringify(charms.map((charm) => ({
        'スキル1': charm[0],
        'スキル1 Lv': charm[1],
        'スキル2': charm[2],
        'スキル2 Lv': charm[3],
        'スロット1': charm[4],
        'スロット2': charm[5],
        'スロット3': charm[6],
      })), null, '  ')
    ) : '';

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <ToggleButtonGroup
          value={format}
          size="small"
          exclusive
          onChange={handleChange}
          aria-label="dump-format"
        >
          {views.map((t) => (
            <ToggleButton value={t} aria-label={t}>
              {t}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <CopyToClipBoard text={copy}>
          <IconButton
            disabled={copy === ''}
            onClick={handleClickButton}
            size="small"
            className={classes.copy}
          >
            <FileCopyOutlinedIcon />
          </IconButton>
        </CopyToClipBoard>
        <Button color="primary" onClick={() => dispatch({ type: 'RESET' })}>リセット</Button>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        {format === 'table' ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellSkill}>スキル1</TableCell>
                <TableCell className={classes.cellLevel}>スキル1 Lv</TableCell>
                <TableCell className={classes.cellSkill}>スキル2</TableCell>
                <TableCell className={classes.cellLevel}>スキル2 Lv</TableCell>
                <TableCell className={classes.cellSlot}>スロット1</TableCell>
                <TableCell className={classes.cellSlot}>スロット2</TableCell>
                <TableCell className={classes.cellSlot}>スロット3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {charms.map((charm) => (
                <TableRow>
                  {charm.map((c, i) => (
                    <TableCell align={ i === 0 || i === 2 ? 'left' : 'center'}>{c}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : format === 'csv' ? (
          <TextField
            variant="outlined"
            multiline
            value={copy}
            className={classes.text}
          />
        ) : format === 'json' ? (
          <TextField
            variant="outlined"
            multiline
            value={copy}
            className={classes.text}
          />
        ) : null}
      </TableContainer>
    </div>
  );
}

export default Result;
