import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateAlertPage from './pages/CreateAlertPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateAlertPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
