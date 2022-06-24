import React from "react";
import "./App.css";
import "./codeInput.scss";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import LipaNaMpesaScreen from "./screens/LipaNaMpesa";
import PaymentVerificationSreen from "./screens/PaymentVerification";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import EmailVerificationScreen from "./screens/emailVerifySreen";
import CongratNote from "./screens/congratScreen";
import CategoryScreen from "./screens/categoryScreen";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/search/:keyword/:category" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route path="/subsribe/" component={CongratNote} exact />
        <Route
          path="/search/:keyword/:category/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/products/:id" component={SingleProduct} exact />
        <Route
          path="/products/category/:categoryName"
          component={CategoryScreen}
        />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} exact />
        <Route
          path="/register/status"
          component={EmailVerificationScreen}
          exact
        />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter
          path="/payments/lipa-na-mpesa"
          component={LipaNaMpesaScreen}
        />
        <PrivateRouter
          path="/payments/lipa-na-mpesa-code/verification"
          component={PaymentVerificationSreen}
        />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
