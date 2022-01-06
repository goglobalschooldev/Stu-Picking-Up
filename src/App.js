import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme, colortheme } from './theme'
import './App.css';
import Login from './page/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ClassRoom from './page/ClassRoom';




function App() {
 
  return (
    <ChakraProvider theme={theme, colortheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
            {/* <ClassRoom /> */}
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
