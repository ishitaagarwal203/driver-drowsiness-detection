import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardShell from "./components/layout/DashboardShell";
import WorkingModel from "./pages/WorkingModel";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <DashboardShell>
        <Routes>
          <Route path="/" element={<WorkingModel />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardShell>
    </BrowserRouter>
  );
}

export default App;