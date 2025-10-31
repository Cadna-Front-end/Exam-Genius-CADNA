import { Routes, Route } from "react-router-dom";
import Signin from "./pages/signin/signin.jsx";
import Emptystate from './dashboards/instructordashboards/emptystate';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="emptystate" element={<Emptystate/> } />
    </Routes>
  );
}

export default App;
