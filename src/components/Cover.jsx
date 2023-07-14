import { Box, Button, Center, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Cover = ({ onConnect }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={999}
      backgroundColor="rgba(0, 0, 0, 0.75)"
      backdropBlur={"md"}
    >
      <Center width="100%" height="100%">
        <Box textAlign="center">
          <Text fontSize="2xl" marginBottom={4} color={'white'}>
            Connect Your Wallet
          </Text>
          <Button 
            onClick={onConnect}
            variant="solid"
          >
            Connect
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

Cover.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

export default Cover;
