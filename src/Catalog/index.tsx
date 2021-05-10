import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import Divider from '@material-ui/core/Divider';


import { Skill, LackSkill, Level, LackLevel, Slot, LackSlot } from './catalogs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    tableContainer: {
      margin: 10,
      width: 175 + 100 + 97 + 20 + 16 * 4,
      maxWidth: '95%',
      float: 'left',
    },
    clear: {
      clear: 'both',
      marginBottom: 5,
    },
    table: {
      margin: 'auto',
      width: 175 + 100 + 97,
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
    bold: {
      fontWeight: 'bold',
      display: 'inline',
    },
  })
);

function Index() {
  const classes = useStyles();

  const title = [
    '検出可能',
    '検出不可',
  ];

  const ar = [
    [    Skill,     Level,     Slot],
    [LackSkill, LackLevel, LackSlot],
  ];
  let table: string[][][] = [
    [],
    [],
  ];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < Math.max(ar[i][0].length, ar[i][1].length, ar[i][2].length); j++) {
      table[i].push([0, 1, 2].map(k => j < ar[i][k].length ? ar[i][k][j] : (j === 0 ? 'なし' : '')))
    }
  }

  return (
    <div className={classes.root}>
      <Box m={0.5}>
        <Typography variant="body1">以下が現状検出可能/不可能な情報の一覧です。</Typography>
        <Box m={1}>
          {[0, 1].map(i => 
            <div className={classes.tableContainer}>
              <Accordion defaultExpanded={i === 1}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{title[i]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {table[i].map(row => 
                          <TableRow>
                            <TableCell>{row[0]}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
        </Box>
        <Divider className={classes.clear} />
        <Box m={1}>
          <Typography variant="body1">マカ錬金結果のスクリーンショットを元に判定を行っているため、管理人が直近で入手していないスキルは検出できません。</Typography>
          <Box m={0.5}>
            <Typography variant="body1">もし<Typography variant="body1" className={classes.bold}>検出不可</Typography>
            に分類されている情報を含む護石の入手時のスクリーンショットをお持ちの方がいらっしゃいましたら
            <Typography variant="body1" className={classes.bold}>
              <Link href="https://forms.gle/t3iG1fF7h7mM9jkb8">こちら</Link>
            </Typography>
            より提供いただけますと大変助かります。</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Index;

