import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import GPUNodes from "../pages/GPUNodes/GPUNodes";
import Jobs from "../pages/Jobs/Jobs";
import Monitoring from "../pages/Monitoring/Monitoring";
import History from "../pages/History/History";
import Scheduler from "../pages/Scheduler/Scheduler";
import AIScheduler from "../pages/AI/AIScheduler";
import Login from "../pages/Login/Login";

import { isAuthenticated } from "../services/authService";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Redirect Home */}
        <Route
          path="/"
          element={
            isAuthenticated()
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* GPU Nodes */}
        <Route
          path="/gpu-nodes"
          element={
            <ProtectedRoute>
              <MainLayout>
                <GPUNodes />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Jobs */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Jobs />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Monitoring */}
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Monitoring />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* History */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <MainLayout>
                <History />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Scheduler */}
        <Route
          path="/scheduler"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Scheduler />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* AI Scheduler */}
        <Route
          path="/ai-scheduler"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AIScheduler />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Unknown Route */}
        <Route
          path="*"
          element={
            isAuthenticated()
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}