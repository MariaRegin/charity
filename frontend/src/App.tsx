import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage/MainPage";
import Catalogue from "./components/Catalogue/Catalogue/Catalogue";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Header from "./components/Header/Header";

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
      </Routes>
    </>
  );
}

export default App;
