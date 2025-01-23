import LoginPage from './components/login';
import { BrowserRouter as Router , Route,Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Dashboard from './components/Dashboard';


function App() {


  
  return (
    <div className="">
      <>
        <Router>
          <AuthProvider>
          <Routes>
            <Route path={"/"} element={<LoginPage />} />
            <Route path={"/dashboard"} element={<Dashboard/>} />
          </Routes>
          </AuthProvider>
          
        </Router>
      </>
      
      
    </div>
  );
}

export default App;
