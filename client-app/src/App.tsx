import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "./components/Container/Container";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";

function App() {
  return (
    <div className="font-bold bg-[#0B101B] min-h-[100vh] ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Container />
              {/* <Footer /> */}
            </>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
