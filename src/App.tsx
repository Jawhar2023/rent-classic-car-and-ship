import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ExperiencesPage from "@/pages/ExperiencesPage";
import LazerocarePage from "@/pages/LazerocarePage";
import LazerocarePortalPage from "@/pages/LazerocarePortalPage";
import SmileCarePortalPage from "@/pages/SmileCarePortalPage";
import TourismMedicalPortalPage from "@/pages/TourismMedicalPortalPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/lazerocare" element={<LazerocarePortalPage />} />
        <Route path="/lazerocare/about" element={<LazerocarePage />} />
        <Route path="/lazerocare/portal" element={<Navigate to="/lazerocare" replace />} />
        <Route path="/smile-care" element={<SmileCarePortalPage />} />
        <Route path="/tourism-medical" element={<TourismMedicalPortalPage />} />
      </Routes>
    </BrowserRouter>
  );
}
