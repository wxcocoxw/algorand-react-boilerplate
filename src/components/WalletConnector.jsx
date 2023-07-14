import {
  Heading,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Select,
  Badge,
} from '@chakra-ui/react';
import { useWallet } from '@txnlab/use-wallet';
import { truncateAddress } from '../helpers/conversions';
import { Divider } from '@chakra-ui/layout';
import PropTypes from 'prop-types';

const WalletConnector = ({ isOpen, onClose }) => {
  const { providers, activeAccount } = useWallet();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      alignItems="center"
      justifyContent="center"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader>Connect Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4} direction="row" align={'stretch'} justify={'space-around'}>
              {providers?.map(provider => (
                <Stack key={'provider-' + provider.metadata.id} direction={'column'} align={'center'} justify={'stretch'} spacing={4}>
                  <Heading as="h4" size="md" textAlign={'center'}>
                    {provider.metadata.name}
                  </Heading>
                  <Badge colorScheme={provider.isActive ? 'green' : 'red'} textAlign={'center'} py={1} px={4} borderRadius={'full'} >
                    {provider.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Image
                      maxWidth={100}
                      maxHeight={100}
                      objectFit={'cover'}
                      alt={provider.metadata.name}
                      src={provider.metadata.icon}
                      borderRadius="500px"
                    />
                  <Stack direction={'column'}>
                    <Button
                      onClick={provider.connect}
                      disabled={provider.isConnected}
                      variant={provider.isConnected ? 'disabled' : 'solid' }
                    >
                      Connect
                    </Button>
                    <Divider />
                    <Button
                      onClick={provider.disconnect}
                      disabled={!provider.isConnected}
                      variant={!provider.isConnected ? 'disabled' : 'outline'}
                    >
                      Disconnect
                    </Button>
                    <Divider />
                    <Button
                      onClick={provider.setActiveProvider}
                      disabled={!provider.isConnected || provider.isActive}
                      variant={!provider.isConnected || provider.isActive ? 'disabled' : 'outline'}
                      cursor={!provider.isConnected || provider.isActive ? 'not-allowed' : 'pointer'}
                    >
                      Set Active
                    </Button>
                    <Divider />
                    <Stack>
                      {provider.isActive && provider.accounts.length && (
                        <Select
                          value={activeAccount?.address}
                          onChange={e =>
                            provider.setActiveAccount(e.target.value)
                          }
                        >
                          {provider.accounts.map(account => (
                            <option
                              key={account.address}
                              value={account.address}
                            >
                              {truncateAddress(account.address)}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

WalletConnector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WalletConnector;
