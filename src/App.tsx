import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="dashboard" />} path="/" />
      <Route element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default App;
