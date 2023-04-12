
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import { AuthGuard } from "./Auth/AuthGuard";
import { GuestGuard } from "./Auth/GuestGuard";
import {AuthProvider} from "./Auth/JWTAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Sign from "./pages/Sign";
import TodoList from "./pages/TodoList";
import {store} from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<GuestGuard><Home /></GuestGuard>} />
          <Route path='/login' element={<GuestGuard><Login /></GuestGuard>} />
          <Route path='/sign-in' element={<GuestGuard><Sign /></GuestGuard>} />
          <Route path='/my_todo' element={<AuthGuard><TodoList /></AuthGuard>} />
          <Route path='/*' element={<AuthGuard><NotFound/></AuthGuard>} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
