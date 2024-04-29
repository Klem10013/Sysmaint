import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserHomaPage from "./Components/UserHomePage/UserHomaPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path={"/"} element={<HomePage />}/>
                <Route path={"/login"} element={<LoginPage />}/>
                <Route path={"/user_page"} element={<UserHomaPage />}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
