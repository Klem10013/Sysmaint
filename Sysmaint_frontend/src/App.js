import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserHomaPage from "./Components/UserHomePage/UserHomaPage";
import AddUserPage from "./Components/AddUser/AddUserPage";
import AddMachinePage from "./Components/AddMachine/AddMachinePage";
import AddTaskPage from "./Components/AddTask/AddTaskPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path={"/"} element={<HomePage />}/>
                <Route path={"/login"} element={<LoginPage />}/>
                <Route path={"/user_page"} element={<UserHomaPage />}/>
                <Route path={"/add_user_page"} element={<AddUserPage/>} />
                <Route path={"/add_machine_page"} element={<AddMachinePage/>} />
                <Route path={"/add_task_page"} element={<AddTaskPage/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
