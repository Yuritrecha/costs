import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home'
import Contato from './components/pages/Contato'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects';
import NavBar from './components/pages/static/NavBar'
import Footer from './components/pages/static/Footer'
import Project from './components/pages/Project'

import Container from './components/pages/static/Container';


function App() {
  return (
    <Router>
      <NavBar /> 
      <Container customClass="min-height">
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path='/Projects' element={<Projects/>} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route path="/project/:id" element={<Project />} />

      </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
