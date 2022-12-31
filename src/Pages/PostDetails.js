import { useLocation } from "react-router-dom";
import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
const PostDetails = () => {
 const { state } = useLocation();
 return (
  <Container maxW="1300px" mt="4">
   <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc" mb="4">
    <Flex justify="space-between">
     <Text>User ID {state.user_id}</Text>
     <Text>Post ID {state.id}</Text>
    </Flex>
    <Heading>Title {state.title}</Heading>
    <Text>Content {state.body}</Text>
   </Stack>
  </Container>
 );
};
export default PostDetails;