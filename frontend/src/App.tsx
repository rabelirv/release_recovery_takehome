import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import Dashboard from './pages/Dashboard';
import CoachDashboard from './pages/CoachDashboard';
import CheckInHistory from './pages/CheckInHistory';

// Hardcoded user ID for now (we'll add auth later)
export const CURRENT_USER_ID = 1;

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-stone-50">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coach" element={<CoachDashboard />} />
              <Route path="/history" element={<CheckInHistory />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
}

export default App;
