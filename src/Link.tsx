import MtLink, { LinkProps } from '@material-ui/core/Link';
import { Link as RtLink } from 'react-router-dom';

import { PagesTitle } from './Pages';

function Link(props: LinkProps) {
  const href = props.href || '/';
  const path = href.replace(/[#?].*/, '');
  return (
    (path in PagesTitle) ?
      <MtLink component={RtLink} to={href} {...{ ...props, href: undefined }}>
      </MtLink>
      :
      <MtLink { ...props } />
  );
}

export default Link;