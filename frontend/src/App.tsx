/** @format */

import "./App.scss";
import {Home} from "./pages/Home";
import { Login } from "./pages/Login";
import { Sign } from "./pages/Sign";
import { TodoList } from "./pages/TodoList";

function App() {
  return (
    <div className='App'>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Sign /> */}
      <TodoList />
    </div>
  );
}

export default App;
