import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import GPUNodes from "../pages/GPUNodes/GPUNodes";
import Jobs from "../pages/Jobs/Jobs";
import Monitoring from "../pages/Monitoring/Monitoring";
import History from "../pages/History/History";
import Scheduler from "../pages/Scheduler/Scheduler";
import AIScheduler from "../pages/AI/AIScheduler";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/gpu-nodes"
          element={
            <MainLayout>
              <GPUNodes />
            </MainLayout>
          }
        />

        <Route
          path="/jobs"
          element={
            <MainLayout>
              <Jobs />
            </MainLayout>
          }
        />

        <Route
          path="/monitoring"
          element={
            <MainLayout>
              <Monitoring />
            </MainLayout>
          }
        />

        <Route
          path="/history"
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        />

        <Route
          path="/scheduler"
          element={
            <MainLayout>
              <Scheduler />
            </MainLayout>
          }
        />

        <Route
          path="/ai-scheduler"
          element={
            <MainLayout>
              <AIScheduler />
            </MainLayout>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}