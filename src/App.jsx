import { Routes, Route } from "react-router-dom";
import Signin from "./pages/signin/signin.jsx";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
