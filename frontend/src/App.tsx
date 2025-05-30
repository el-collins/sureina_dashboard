import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Lazy load all components
const MainLayout = lazy(() =>
  import("./pages/main-layout").then((module) => ({
    default: module.MainLayout,
  }))
);
const Dashboard = lazy(() => import("./pages/dashboard"));
const AnalyticsPage = lazy(() => import("./pages/analytics"));
const AdSpendDashboard = lazy(() => import("./pages/ads-spend-dashboard"));



const App: React.FC = () => {

  
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>

          {/* Protected routes - only accessible if the user is logged in */}
          <Route path="/" element={null}>
            <Route
              element={
                <MainLayout>
                  <Outlet />
                </MainLayout>
              }
            >
              {/* Use relative paths for nested routes */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ads-spend-dashboard" element={<AdSpendDashboard />} />
              <Route path="analytics-page" element={<AnalyticsPage />} />
            </Route>
          </Route>

          {/* 404 - catch-all route */}
          <Route
            path="*"
            element={
              <div>
                <h1>404</h1>
                <p>Page not found</p>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;



