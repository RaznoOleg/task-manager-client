import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { PATH } from './utils/constants/routes';
import TaskDetails from './pages/taskDetails';

function App() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />}></Route>
      <Route path={PATH.TASK_DETAILS} element={<TaskDetails />}></Route>
    </Routes>
  );
}

export default App;
