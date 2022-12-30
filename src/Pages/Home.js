import { useQuery } from "react-query";
import axios from "axios";
import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
const Home = () => {
 const fetchData = async () => {
  try {
   const { data } = await axios.get("https://gorest.co.in/public/v1/posts");
   return data;
  } catch (error) {
   throw Error(error);
  }
 };
 const { data, isLoading, error } = useQuery('posts', fetchData);
 if (isLoading) return (<div>
  <Heading>Page is laoding</Heading>
 </div>);
 else if (error) return (<div>
  <Heading>Error : {error}</Heading>
 </div>);
 return (
  <Container maxW="1300px" mt="4">
   {data.data?.map(post => (
    <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc" key={post.id} mb="4">
     <Flex justify="space-between">
      <Text>UserID : {post.user_id}</Text>
      <Text>PostID : {post.id}</Text>
     </Flex>
     <Heading>Title {post.title}</Heading>
     <Text>Content {post.body}</Text>
    </Stack>
   ))}
  </Container>
 );
};
export default Home;