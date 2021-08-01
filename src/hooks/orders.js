import { OrdersAPI } from "../api/orders";
import { useState, useEffect } from "react";

export function useFetchOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    OrdersAPI.fetchOrders()
      .then((responseData) => {
        setData(responseData);
      })
      .catch(() => {
        setErrorMessage("Error while fetching orders list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading, data, errorMessage };
}
