import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Link from './Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import AdsCard from './AdsCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      marginTop: 5,
      marginBottom: 5,
    },
    copyright: {
      margin: 5,
      textAlign: 'right',
    },
  })
);

function Footer() {
  const classes = useStyles();

  return (
    <>
      <AdsCard data-ad-slot={process.env.REACT_APP_GOOGLE_AD_SLOT_SQUARE_BOTTOM ?? ''} />
      <Divider className={classes.divider} />
      <Box m={1}>
        <Typography variant="body1">
          本ツールに関するご意見やご要望、誤検出の報告、その他お問い合わせは
          <Link href="https://forms.gle/SLxcmWQMiMfFLN237">こちらのフォーム</Link>
          または
          <Link href="https://twitter.com/koo_type">@koo_type</Link>へリプライ、DMをお願いします。
        </Typography>
        <Typography variant="body1">後者の方が具体的な返答ができると思います。</Typography>
      </Box>
      <Typography variant="body2" className={classes.copyright}>&copy; 2021{(new Date().getFullYear() !== 2021)? '-' + (new Date().getFullYear()) : ''} koo_type</Typography>
    </>
  );
}

export default Footer;

