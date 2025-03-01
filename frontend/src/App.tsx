import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage/MainPage";
import Catalogue from "./components/Catalogue/Catalogue/Catalogue";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HelpRequest from "./components/HelpRequest/HelpRequest";
import UserProfilePage from "./components/UserProfile/UserProfilePage/UserProfilePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="requests"
          element={
            <ProtectedRoute>
              <Catalogue />
            </ProtectedRoute>
          }
        />
        <Route path="request/:id" element={<HelpRequest />} />
        <Route path="/profile/*" element={<UserProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
