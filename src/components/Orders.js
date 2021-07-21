import { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from './OrderItem'

function Orders() {
 const [ordersList, setOrdersList] = useState([]);
 const [isLoading, setIsLoading] = useState(false)
 const [errorMessage, setErrorMessage] = useState('');
  function fetchOrders() {
    setIsLoading(true);
    return axios
      .get('https://artful-iudex.herokuapp.com/orders')
      .then((response) => {
        setOrdersList(response['data'])
      })
      .catch(() => {
        setErrorMessage("Error while fetching orders list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
 
 useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex overscroll-y-none flex-col">
    {errorMessage && <div className="w-48 mx-auto text-red">{errorMessage}</div>}
    <div className="w-6/12 m-auto flex flex-col mt-8">
     {isLoading ? 'Loading orders list' :
     ordersList.map((orderItem) => (
      <OrderItem orderItem={orderItem} key={orderItem.id} />
      ))}
    </div>
    </div>
  );
}

export default Orders;
