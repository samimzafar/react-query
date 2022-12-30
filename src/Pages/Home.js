import { useQuery } from "react-query";
import axios from "axios";
import { Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
const fetchData = async () => {
 try {
  const { data } = await axios.get("https://gorest.co.in/public/v1/posts");
  return data;
 } catch (error) {
  console.log("🚀 ~ file: Home.js:11 ~ fetchData ~ error", error)
  throw Error(error)
 }
};
const Home = () => {
 const toast = useToast();
 const { data, isLoading } = useQuery('posts', fetchData, {
  onError: (error) => {
   toast({ status: "error", title: error });
  }
 });
 return (
  <Container maxW="1300px" mt="4">
   {isLoading ? <Grid placeItems="center" height="100vh"><Spinner /></Grid> :
    data.data?.map(post => (
     <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc" key={post.id} mb="4">
      <Flex justify="space-between">
       <Text>UserID : {post.user_id}</Text>
       <Text>PostID : {post.id}</Text>
      </Flex>
      <Heading>Title {post.title}</Heading>
      <Text>Content {post.body}</Text>
     </Stack>
    ))
   }
  </Container>
 );
};
export default Home;