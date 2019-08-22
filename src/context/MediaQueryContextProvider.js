import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const MediaQueryContext = React.createContext();

const MediaQueryContextProvider = props => {

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  const isMobileDevicePortrait = useMediaQuery({ maxDeviceWidth: 420 });
  const isMobileDeviceLanscape = useMediaQuery({ maxDeviceHeight: 420 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isRetina = useMediaQuery({ minResolution: '2dppx' });
  
  const mediaQuaryState = { isBigScreen, isMobileDevicePortrait, isTabletOrMobileDevice, isPortrait, isRetina, isDesktopOrLaptop, isMobileDeviceLanscape };

    return (
      <MediaQueryContext.Provider
        value={{
          media: mediaQuaryState
        }}
      >
        {props.children}
      </MediaQueryContext.Provider>
    );
}

export default MediaQueryContextProvider;
