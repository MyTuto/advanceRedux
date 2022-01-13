import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/Layout/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notificationMessage = useSelector(state => state.ui.notification);

  const dispatch = useDispatch();


  useEffect(()=> {
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
    if(isInitial){
      isInitial=false;
      return;
    }
    if(cart.isChanged) {
      dispatch(sendCartData(cart));
    }

    return () => {
      console.log('clean up')
    }
  }, [cart,dispatch]);
  return (
    <Fragment>
      {notificationMessage && <Notification message={notificationMessage}/>}
      <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
    
  );
}

export default App;
