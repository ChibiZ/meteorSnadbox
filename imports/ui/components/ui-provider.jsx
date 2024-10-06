import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React from 'react';

const customTheme = extendTheme({
  fonts: {
    heading: `"Balsamiq Sans", sans-serif`,
    body: `"Balsamiq Sans", sans-serif`,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const toastOptions = {
  defaultOptions: {
    position: 'top-right',
    duration: 5000,
    isClosable: true,
  },
};

export function UIProvider({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <ChakraProvider theme={customTheme} toastOptions={toastOptions}>
        {children}
      </ChakraProvider>
    </>
  );
}
