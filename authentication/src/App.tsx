import './App.css';
import Login from "./pages/auth/LoginForm";
import Register from "./pages/auth/RegisterForm";
import List from "./pages/Category/List";
import Edit from "./pages/Category/Edit";
import Add from "./pages/Category/Add";
import { Provider } from "./Provider";
import PublicLayout from "./components/PublicCom";
import { useMemo } from "react";

import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const PrivateOutlet = () => {
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate();
  const isAuth = useMemo(
    () => !!token,
    [navigate]
  )
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PrivateOutlet />}>
            <Route path="/" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;