import React, { useEffect } from 'react';

interface Window {
  adsbygoogle: any[];
}
declare var window: Window;

function AdsCard() {
    useEffect(() => {
        if ('adsbygoogle' in window && process.env.NODE_ENV !== "development") {
            window.adsbygoogle.push({});
        }
    }, [])

    return (
        <ins className="adsbygoogle"
            style={{ "display": "block" }}
            data-ad-client={process.env.REACT_APP_GOOGLE_AD_CLIENT}
            data-ad-slot={process.env.REACT_APP_GOOGLE_AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    );
}

export default AdsCard;