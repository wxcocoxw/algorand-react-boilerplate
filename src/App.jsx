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
import { useState, useEffect } from 'react';
import theme from './theme';
import Cover from './components/Cover';
import WalletConnector from './components/WalletConnector';
import { WalletProvider, useInitializeProviders, PROVIDER_ID, useWallet } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { getNFD } from './helpers/getNFD';
import algosdk from 'algosdk';

function App() {
   const providers = useInitializeProviders({
       providers: [
         { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
         { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
       ],
       nodeConfig: {
        network: 'mainnet',
        nodeServer: 'https://mainnet-api.algonode.cloud',
        nodeToken: '',
        nodePort: '443'
      },
      algosdkStatic: algosdk
     })

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeAccount, isReady } = useWallet();
  const [nfdName, setNfdName] = useState('');
  const toast = useToast();

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
      <WalletProvider value={providers}>
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
