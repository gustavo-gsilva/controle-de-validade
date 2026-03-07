import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Batches from "./pages/Batches";

function App() {
   return (
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/" element={<Dashboard />} />
         <Route path="/products" element={<Products />} />
         <Route path="/batches" element={<Batches />} />
      </Routes>
   );
}

export default App;
