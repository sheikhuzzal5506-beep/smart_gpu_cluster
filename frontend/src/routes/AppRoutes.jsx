import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import GPUNodes from "../pages/GPUNodes/GPUNodes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect Home */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        {/* GPU Nodes */}
        <Route
          path="/gpu-nodes"
          element={
            <MainLayout>
              <GPUNodes />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}