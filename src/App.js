
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuQr from './views/MenuQr';
import Header from './views/Header';
import Footer from './views/Footer';
import Home from './views/Home';
import Tables from './views/Tables';
import Checkout from './views/Checkout';
import Success from './views/Success';
import ErrorView from './views/Error';

function App() {
  return (
    <div className="app">
      <Header/>

      <BrowserRouter >
          <Switch>     
            <Route path="/menu/:tableid" component={MenuQr} />
            <Route path="/tables" component={Tables} />
            <Route path="/checkout/success/:tableid" component={Success} />
            <Route path="/checkout/error/:tableid" component={ErrorView} />
            <Route path="/checkout/:tableid" component={Checkout} />            
            <Route path="/" component={Home} />
          </Switch>
      </BrowserRouter>

      <Footer/>
    </div>
    
  );
}

export default App;
