import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  const ROLES = {
    Admin: 5150,
    Editor: 1984,
    User: 2001,
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="*" element={<Missing />} />

          {/* privete routes */}
          <Route element={<RequireAuth roles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth roles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth roles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth roles={[ROLES.Admin, ROLES.Editor]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
