import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from "./Pages/Home";
const App = () => {
 // Create a client
 const queryClient = new QueryClient();
 return (
  <ChakraProvider>
   <QueryClientProvider client={queryClient}>
    <Routes>
     <Route path="/" element={<Home />} />
    </Routes>
    <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  </ChakraProvider>
 );
};

export default App;