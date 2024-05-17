// React imports
import React, {useState} from 'react';

// Chakra imports
import {
  Box,
  VStack,
  Grid,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';

// Assets import
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { FiRefreshCcw } from "react-icons/fi";
import Layout from './layout'

function App() {

  // State variables
  const [query, setQuery] = useState('');
  const [schema, setSchema] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate SQL query
  const generateSQLQuery = () => {
    setIsLoading(true); // Set loading state to true
    fetch('https://api-inference.huggingface.co/models/ahmedrizwan239/NativeSQL-with-schema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        inputs: `tables: ${schema}. question: ${query}`,
        parameters: {
          max_length: 512,
          num_beams: 10,
          top_k: 10
        }
      }),
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      setGeneratedQuery(data[0].generated_text);
      setIsLoading(false); // Set loading state to false after receiving response
    })    
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false); // Set loading state to false in case of error
    });
  };

  return (
    <Layout>
      <Flex w={'full'} justifyContent={'center'} py={8} bgGradient="linear(to-br, rgba(203, 108, 230, .8), rgba(31, 41, 55, 0))">
        <Box bg="#111111" border={'1px solid purple'} color="white" borderRadius="xl" w={'35%'} p={4} boxShadow={'lg'}>
          <VStack spacing={5} m={8}>
            <FormControl id="name">
              <FormLabel>Your Query:</FormLabel>
              <Textarea borderColor="gray.300" _focus={{ borderColor: '#c66ae0'}}
                placeholder="List down students with age above 20" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
              />
            </FormControl>
            <FormControl id="name">
              <FormLabel>Table Schema:</FormLabel>
              <Textarea borderColor="gray.300" _focus={{ borderColor: '#c66ae0'}}
                placeholder="student(id,name, age)"
                value={schema} 
                onChange={(e) => setSchema(e.target.value)} 
              />
            </FormControl>
            <FormControl id="name">
              <FormLabel>Generated SQL Query:</FormLabel>
              <Textarea borderColor="gray.300" _focus={{ borderColor: '#c66ae0'}} 
                placeholder="SELECT * FROM Students WHERE age > 20" 
                value={generatedQuery} 
                readOnly 
              />
            </FormControl>
            <FormControl id="name" justifyContent={'center'} textAlign={'center'}>
              <Button variant="solid" bg='#c66ae0' color={'white'} w={'50%'} mt={4}
                leftIcon={<FiRefreshCcw color='white' />}
                _hover={{}}
                onClick={generateSQLQuery}
                isLoading={isLoading}
                loadingText="Generating..."
              >
                Send Message
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Flex>
    </Layout>
  );
}

export default App;
