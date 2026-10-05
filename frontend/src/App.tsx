import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateAlertPage from './pages/CreateAlertPage';
import AlertDetailsPage from './pages/AlertDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import UpdateAlertPage from './pages/UpdateAlertPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alerts/create" element={<CreateAlertPage />} />
        <Route path="/alerts/update" element={<UpdateAlertPage />} />
        <Route path="/alerts/:id" element={<AlertDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
