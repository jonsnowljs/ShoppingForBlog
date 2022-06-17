import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import ProfileScreen from 'screens/ProfileScreen';
import ShippingScreen from 'screens/ShippingScreen';
import PaymentScreen from 'screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from 'screens/UserListScreen';
import UserEditScreen from 'screens/UserEditScreen';
import ProductListScreen from 'screens/ProductListScreen';
import ProductEditScreen from 'screens/ProductEditScreen';
import OrderListScreen from 'screens/OrderListScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />

            {/* Admin Screens */}
            <Route path="/admin/userList" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productList"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productList/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route path="/admin/orderList" component={OrderListScreen} />
            <Route path="/admin/order/:id" component={OrderScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
