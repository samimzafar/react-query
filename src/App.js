import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider,Heading } from '@chakra-ui/react';
const App = () => {
 // Create a client
 const queryClient = new QueryClient();
 return (
  <ChakraProvider>
   <QueryClientProvider client={queryClient}>
   <Heading>I'm a Heading</Heading>
   </QueryClientProvider>
  </ChakraProvider>
 );
};

export default App;