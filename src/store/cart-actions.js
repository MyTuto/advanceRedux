import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
    return async(dispatch) =>{
        const fetchData = async() => {
            const response = await fetch('https://productsredux-default-rtdb.firebaseio.com/cart.json');

            const data = await response.json();


            return data;
        }

        try {
           const cartData = await fetchData();
           dispatch(cartActions.replaceCart({
               items: cartData.items || [],
               totalQuantity: cartData.totalQuantity
           }))
        } catch (error) {
            dispatch(uiActions.setNotification("Sending Data Failed"));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(uiActions.setNotification("Sending Data"));
  
      const sendingHttp = async () => {
        const response = await fetch(
          "https://productsredux-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({items:cart.items, totalQuantity: cart.totalQuantity}),
          }
        );
  
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      };
      
      try {
        await sendingHttp();
        dispatch(uiActions.setNotification("Success"));
      } catch (error) {
        dispatch(uiActions.setNotification("Sending Data Failed"));
      }
    };
  };