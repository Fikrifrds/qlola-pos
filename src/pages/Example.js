import React, { useContext, useState, useEffect } from 'react';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';

const Example = () => {
  const context = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isTabletOrMobileDevice, isPortrait, isRetina } = context.media;

  return (
    <div>
      <h1>Device Test!</h1>
      {isDesktopOrLaptop && <>
        <p>You are a desktop or laptop</p>
        {isBigScreen && <p>You also have a huge screen</p>}
        {isTabletOrMobile && <p>You are sized like a tablet or mobile phone though</p>}
      </>}
      {isTabletOrMobileDevice && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
      {isRetina && <p>You are retina</p>}
    </div>
  )
}

export default Example;