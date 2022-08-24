import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import {Route, Switch} from 'react-router-dom';
import Main from "./components/main";
import Login from "./components/login";

function App() {
    
    return (
        <div>
         <NavBar/>
            <Switch>
                <Route path="/main" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users" component={Users}
                // render={(props) => <Posts {...props} />}
                />
                {/* <Users/> */}
                
            </Switch>
         </div>  
    );
}

export default App;
