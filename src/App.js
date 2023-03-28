import './App.css';
import Game from './components/Game';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Help from './components/Help';
import { ChakraProvider, Container, Flex, VStack } from '@chakra-ui/react';
import { AppContextProvider } from './context/appContext';
import OverallStats from './components/OverallStats';
import Settings from './components/Settings';

function App() {
  return (
    <ChakraProvider>
      <AppContextProvider>
        <main>
          <Container
            maxW={'container.md'}
            p={0}
          >
            <Flex h="100vh" py={10}>
              <VStack
                w="full"
                h="full"
                px={5}
                py={5}
                spacing={10}
                alignItems="center"
              >
                <Nav />
                <Game />
                <Footer />
                {/* 
                
                <Alert /> 
                */}
                <Help />
                <OverallStats />
                <Settings />
              </VStack>
            </Flex>
          </Container>
        </main>
      </AppContextProvider>
    </ChakraProvider>

    // <div className="App bg-body-tertiary">
    //   <div className='bg-body container-md'>
    //     <Nav />
    //     <Game />
    //     <Footer />
    //   </div>
    // </div>
  );
}

export default App;
