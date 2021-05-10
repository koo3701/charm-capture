import MtLink, { LinkProps } from '@material-ui/core/Link';
import { Link as RtLink } from 'react-router-dom';

import { PagesTitle } from './Pages';

function Link(props: LinkProps) {
  const href = props.href || '/';
  const path = href.replace(/[#?].*/, '');
  return (
    (path in PagesTitle) ?
      <RtLink to={props.href || '/'} target={props.target} rel={props.rel}>
        <MtLink {...{ ...props, href: undefined, target: undefined, ref: undefined }} />
      </RtLink>
      :
      <MtLink { ...props } />
  );
}

export default Link;