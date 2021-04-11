
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuQr from './views/MenuQr';
import Header from './views/Header';
import Footer from './views/Footer';
import Home from './views/Home';

function App() {
  return (
    <div>
      {/*HEADER - LLeva el quizas nombre de aplicacion.*/}
      
      <Header/>

      {/*CONTENT - basicamente es el router de todas las views.
            = Vista login para admin
              - Vista de informes
            = Vista login cajero
              - Vista de las mesas
                  - Ver cada mesa particular
            - Vista principal para el menu
                - Ver el pedido actual
            - Vista para el detalle del pedido     
      */}

      <BrowserRouter>
          <Switch>     
            <Route path="/menu/:tableid" component={MenuQr} />
            <Route path="/" component={Home} />
          </Switch>
      </BrowserRouter>

      {/*FOOTER - vemos que le pondriamos.*/}
      <Footer/>
    </div>
  );
}

export default App;
