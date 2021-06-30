import { Box, Flex, Heading } from "@chakra-ui/react";
import LoginButton from "../components/LoginButton";

export function Index() {
  return (
    <Flex justify="center" mt="2rem">
      <Box>
        <Heading>Sink</Heading>
        <LoginButton />
      </Box>
    </Flex>
  );
}

export default Index;
