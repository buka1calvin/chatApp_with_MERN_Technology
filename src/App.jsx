import { BrowserRouter as Router } from 'react-router-dom';
// import './App.css'
import {Navigator} from './routes/index'
import { Navigation } from './components/Nagivation';

function App() {

  return (
    <div>
    <Router>
      <Navigation/>
    <Navigator />
    </Router>
    </div>
  )
}

export default App
