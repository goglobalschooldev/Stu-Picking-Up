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
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from './schema/login';
import SectionShift from './page/SectionShift';

function App() {

  const { data } = useQuery(IS_LOGGED_IN);
  const login = !!data?.isLoggedIn

  return (
    <ChakraProvider theme={theme, colortheme}>
      <Router>

        
        {login ? <>
          <Switch>
            <Route exact path="/">
              <SectionShift />
            </Route>
            <Route path="/classroom/:classid&:academicid">
              {/* <Login /> */}
              <ClassRoom />
            </Route>
          </Switch>
        </>
          : 
          <>
            <Switch>
              <Route >
                <Login />
              </Route>
            </Switch>
          </>
        }
      </Router>
    </ChakraProvider>
  );
}

export default App;
