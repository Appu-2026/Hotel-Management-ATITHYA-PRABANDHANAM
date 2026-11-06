import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import AtithyaPrabandhanamlogin from './pages/AtithyaPrabandhanamlogin';
import SystemAdminDashboard from './pages/SystemAdminDashboard';
import HotelManagerDashboard from './pages/HotelManagerDashboard';
import KitchenStaffDashboard from './pages/KitchenStaffDashboard';
import DeliveryStaffDashboard from './pages/DeliveryStaffDashboard';
import CustomerGuestPortal from './pages/CustomerGuestPortal';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AtithyaPrabandhanamlogin />} />
          <Route path="/about" element={<AtithyaPrabandhanamlogin />} />
          <Route path="/admin" element={<SystemAdminDashboard />} />
          <Route path="/manager" element={<HotelManagerDashboard />} />
          <Route path="/kitchen" element={<KitchenStaffDashboard />} />
          <Route path="/delivery" element={<DeliveryStaffDashboard />} />
          <Route path="/guest" element={<CustomerGuestPortal />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
