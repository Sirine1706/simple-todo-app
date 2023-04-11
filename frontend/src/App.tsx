/** @format */

import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import "./App.scss";
import {AuthProvider} from "./Auth/JWTAuthContext";
import { store } from "./redux/store";
import {RenderRoutes} from "./routes";

function App() {
  return (
    <BrowserRouter>
      
    </BrowserRouter>
  );
}

export default App;
