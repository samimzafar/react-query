import { useQuery } from "react-query";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
const fetchData = async (id) => {
 try {
  const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${id}`);
  return data;
 } catch (error) {
  console.log("🚀 ~ file: Home.js:11 ~ fetchData ~ error", error);
  throw Error(error);
 }
};
const Home = () => {
 const { id } = useParams();
 console.log("🚀 ~ file: Home.js:16 ~ Home ~ id", id);
 const navigate = useNavigate();
 const pageID = parseInt(id);
 const toast = useToast();
 const { data, isLoading } = useQuery(['posts', pageID], () => fetchData(pageID), {
  keepPreviousData: true,
  onError: (error) => {
   toast({ status: "error", title: error });
  }
 });
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
   {isLoading ? <Grid placeItems="center" height="100vh"><Spinner /></Grid> :
    data.data?.map(post => (
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