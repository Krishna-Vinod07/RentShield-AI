import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnalyzeAgreement from "./pages/AnalyzeAgreement";
import AnalysisResult from "./pages/AnalysisResult";
import VerifyLandlord from "./pages/VerifyLandlord";
import ChatAssistant from "./pages/ChatAssistant";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/analyze"
          element={<AnalyzeAgreement />}
        />

        <Route
          path="/report"
          element={<AnalysisResult />}
        />

        <Route
          path="/verify"
          element={<VerifyLandlord />}
        />

        <Route
          path="/chat"
          element={<ChatAssistant />}
        />

        
      </Routes>

    </BrowserRouter>
  );
}

export default App;