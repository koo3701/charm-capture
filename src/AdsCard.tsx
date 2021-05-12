import React, { useEffect } from 'react';

interface Window {
  adsbygoogle: any[];
}
declare var window: Window;

type Props = {
  className?: string,
  style?: React.CSSProperties,
  'data-ad-client'?: string,
  'data-ad-slot': string,
  'data-ad-format'?: string
  'data-full-width-responsive'?: string,
}

function AdsCard(props: Props) {
  useEffect(() => {
    if ('adsbygoogle' in window && process.env.NODE_ENV !== 'development') {
      window.adsbygoogle.push({});
    }
  }, [])

  return (
    <ins className={ (props.className ? props.className + ' ' : '') + 'adsbygoogle' }
      style={ props.style ?? { 'display': 'block' } }
      data-ad-client={ props['data-ad-client'] ?? process.env.REACT_APP_GOOGLE_AD_CLIENT }
      data-ad-slot={ props['data-ad-slot'] }
      data-ad-format={ props['data-ad-format'] ?? 'auto' }
      data-full-width-responsive={ props['data-full-width-responsive'] ?? 'true' }></ins>
  );
}

export default AdsCard;