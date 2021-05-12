import { useLocation } from 'react-router-dom';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Link from './Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { PagesTitle, PagesType, useRedirect } from './Pages';

import AdsCard from './AdsCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      cursor: 'pointer',
    },
    textblock: {
      display: 'inline-block',
    },
    linkGroup: {
      marginTop: 5,
      marginLeft: 5,
    },
    link: {
      marginRight: '1em',
      display: 'inline-block',
    }
  })
);

function Header() {
  const classes = useStyles();

  const location = useLocation();
  const redirect = useRedirect();

  const pages: PagesType[] = ['/', '/about', '/catalog'];
  const title = PagesTitle[location.pathname as PagesType];

  return (
    <>
      <Typography onClick={() => redirect('/')} variant="h4" className={classes.title}>MHRise 護石キャプチャー</Typography>
      <AdsCard data-ad-slot={process.env.REACT_APP_GOOGLE_AD_SLOT_SQUARE_TOP ?? ''} />
      <div className={classes.linkGroup}>
        {pages.map(page =>
          page !== location.pathname?
            <Link href={page} className={classes.link}>
              {PagesTitle[page] ? PagesTitle[page] : 'トップページ' }
            </Link> 
          : <Typography component="span" className={classes.link}>{PagesTitle[page] ? PagesTitle[page] : 'トップページ' }</Typography>
        )}
      </div>
      <Divider />
    </>
  );
}

export default Header;

