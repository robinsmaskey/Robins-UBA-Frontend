import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
import ProtectedRoute from "./components/protectedroutes";
import UserList from "./components/userlist";
import UserForm from "./components/userform";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import UserSearch from "./components/usersearch";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/:id/edit" element={<UserForm />} />
            <Route path="/users/" element={<UserList />} />
            <Route path="/users/search" element={<UserSearch />} />
            
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;