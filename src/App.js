import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools';
import {PostDetails,Home} from "./Pages";
const App = () => {
 // Create a client
 const queryClient = new QueryClient();
 return (
  <ChakraProvider>
   <QueryClientProvider client={queryClient}>
    <Routes>
     <Route exact path="/posts/:id" element={<Home />} />
     <Route path="/postDetail/:id" element={<PostDetails />} />
     <Route path="*" element={<Heading>Page not found!</Heading>} />
    </Routes>
    <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  </ChakraProvider>
 );
};

export default App;