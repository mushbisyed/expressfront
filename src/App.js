
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import View from './component/view'
import Update from './component/update'
import Insert from './component/insert'
import Register from './component/Register'
import Login from './component/login'


function App() {
 
  return (
    <>
<BrowserRouter>
<Routes>
<Route exact path='/' element={<View/>}/>
<Route exact path='/update/:id' element={<Update/>}/>
<Route exact path='/insert' element={<Insert/>}/>
<Route exact path='/Register' element={<Register/>}/>
<Route exact path='/login' element={<Login/>}/>


</Routes>
</BrowserRouter>
 
    </>
   
  );
}

export default App;

