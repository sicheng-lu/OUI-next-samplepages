import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OuiProvider from './OuiProvider';
import ApplicationShell from './components/ApplicationShell';
import DiscoverPage from './pages/DiscoverPage';
import ServicePage from './pages/ServicePage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <OuiProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ApplicationShell />}>
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/" element={<Navigate to="/service" replace />} />
            <Route path="*" element={<Navigate to="/service" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OuiProvider>
  );
};

export default App;
