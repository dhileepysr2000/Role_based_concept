import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
 import { Dashboard } from './Components/Admin_dash';
import { Admin } from './Components/admin';
import { Subadmin } from './Components/subadmin';
import { Update } from './Components/update';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup />}/>
      <Route path="/Update/:id" element={<Update/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/Subadmin" element={<Subadmin/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
