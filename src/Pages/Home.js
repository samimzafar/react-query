import { useQuery } from "react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
const fetchData = async (id) => {
 try {
  const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${id}`);
  return data;
 } catch (error) {
  throw new Error(error);
 };

};
const Home = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const pageID = parseInt(id);
 const toast = useToast();
 const { data, isLoading, isError, error } = useQuery(['posts', pageID], () => fetchData(pageID), {
  keepPreviousData: true,
  onError: (error) => {
   toast({ status: "error", title: error });
  }
 });

 if (isLoading) {
  console.log("🚀 ~ file: Home.js:29 ~ Home ~ isLoading", isLoading);
  return <Grid placeItems="center" height="100vh"><Spinner /></Grid>;
 }
 else if (isError) {
  console.log("🚀 ~ file: Home.js:29 ~ Home ~ isError", error);
  return <h1>{error.message}</h1>;
 }
 return (
  <Container maxW="1300px" mt="4">
   <Flex justify="space-between" mb="4">
    <Button colorScheme="red" onClick={() => {
     if (data.meta.pagination.links.previous !== null) {
      navigate(`/posts/${pageID - 1}`);
     }
    }}
     disabled={data?.meta.pagination.links.previous == null}
    >Prev</Button>
    <Text>Current Page : {pageID}</Text>
    <Button colorScheme="green" onClick={() => navigate(`/posts/${pageID + 1}`)}>Next</Button>
   </Flex>
   {data.data?.map(post => (
    <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc" key={post.id} mb="4">
     <Flex justify="space-between" >
      <Text>UserID : {post.user_id}</Text>
      <Text>PostID : {post.id}</Text>
     </Flex>
     <Heading>Title {post.title}</Heading>
     <Text>Content {post.body}</Text>
     <Button colorScheme="green" onClick={() => navigate(`/postDetail/${post.id}`, { state: post })} >View Deails</Button>
    </Stack>
   ))
   }
  </Container>
 );
};
export default Home;