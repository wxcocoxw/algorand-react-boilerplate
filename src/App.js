import {
  ChakraProvider,
  Box,
  Container,
  Flex,
  Stack,
  Heading,
  useDisclosure,
  Button,
  IconButton,
  useToast,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import React, { useState, useEffect } from 'react';
import theme from './theme';
import Cover from './components/Cover';
import WalletConnector from './components/WalletConnector';
import {
  reconnectProviders,
  WalletProvider,
  PROVIDER_ID,
  pera,
  defly,
  useWallet,
} from '@txnlab/use-wallet';
import { getNFD } from './helpers/getNFD';

const walletProviders = {
  [PROVIDER_ID.DEFLY]: defly.init({
    clientOptions: {
      shouldShowSignTxnToast: true,
    },
  }),
  [PROVIDER_ID.PERA]: pera.init({
    clientOptions: {
      shouldShowSignTxnToast: true,
    },
  }),
};

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeAccount, isReady } = useWallet();
  const [nfdName, setNfdName] = useState('');
  const toast = useToast();

  useEffect(() => {
    reconnectProviders(walletProviders);
  }, []);

  useEffect(() => {
    if (activeAccount && isReady) {
      const walletAddress = activeAccount.address;

      const fetchNfd = async () => {
        const nfd = await getNFD(walletAddress);
        setNfdName(nfd);
      };

      fetchNfd();
    }
  }, [activeAccount, isReady]);

  const handleWalletConnect = () => {
    onOpen();
  };

  // Copy Wallet Address to Clipboard //
  const copyToClipboard = () => {
    let copyText = activeAccount.address;
    navigator.clipboard.writeText(copyText);
    toast({
      description: 'Copied to Clipboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <WalletProvider value={walletProviders}>
        <Container maxW="container.xl">
          <Box>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              p={{ base: 4, md: 4 }}
              gap={{base: 4, md: 4}}
              align={'center'}
              spacing={{ base: 0, md: 4 }}
            >
              <Heading as={'h1'} mb={{ base: 4, md: 0 }}>
                Algorand ReactJS Boilerplate
              </Heading>
              <Spacer />
              <Flex justifyContent={'center'} align={'center'}>
                {activeAccount && (
                  <IconButton
                    aria-label="Copy to Clipboard"
                    icon={<CopyIcon />}
                    onClick={copyToClipboard}
                    mr={4}
                    size="md"
                    mb={{ base: 4, md: 0 }}
                  />
                )}
                {activeAccount && (
                  <Text fontSize="md" mr={4} mb={{ base: 4, md: 0 }}>
                    {nfdName}
                  </Text>
                )}
              </Flex>
              <Flex justifyContent={'center'} align={'center'}>
                <Button onClick={handleWalletConnect} mb={{ base: 4, md: 0 }}>
                  Manage Wallet
                </Button>
                <ColorModeSwitcher
                  justifySelf="flex-end"
                  mb={{ base: 4, md: 0 }}
                />
              </Flex>
            </Stack>
            <WalletConnector isOpen={isOpen} onClose={onClose} />
          </Box>
          {!activeAccount && <Cover onConnect={handleWalletConnect} />}
        </Container>
      </WalletProvider>
    </ChakraProvider>
  );
}

export default App;
