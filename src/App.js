
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuQr from './views/MenuQr';
import Header from './views/Header';
import Footer from './views/Footer';
import Home from './views/Home';

function App() {
  return (
    <div>
      <Header/>

      <BrowserRouter>
          <Switch>     
            <Route path="/menu/:tableid" component={MenuQr} />
            <Route path="/" component={Home} />
          </Switch>
      </BrowserRouter>

      {/*<Footer/> */}
    </div>
    
  );
}

export default App;
