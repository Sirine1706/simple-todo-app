/** @format */

import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Sign} from "./pages/Sign";
import {TodoList} from "./pages/TodoList";

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign' element={<Sign />} />
    <Route path='/login' element={<Login />} />
    <Route path='/my-todo' element={<TodoList />} />
  </Routes>
  </BrowserRouter>;
}

export default App;
