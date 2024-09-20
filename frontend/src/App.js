import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import PersonalDetails from "./pages/PersonalDetails";
import AddPost from "./pages/AddPost";
import User from "./components/User";
import SinglePost from "./pages/SinglePost";
import PrivateRoute from "./privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addpost" element={<AddPost />} />
          </Route>
          <Route path="/" element={<Homepage />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/post/:id" element={}/> */}
          <Route path="/personal" element={<PersonalDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
