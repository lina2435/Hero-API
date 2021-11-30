import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContextProvider } from "./contexts/auth-context";
import { HerosProvider } from "./contexts/heros-context";
import HeroDetails from "./views/HeroDetails";
import Home from "./views/Home";
import Login from "./views/Login";
import Search from "./views/Search";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <HerosProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/details/:id" component={HeroDetails} />
            <Redirect to="/home" />
          </Switch>
        </HerosProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
