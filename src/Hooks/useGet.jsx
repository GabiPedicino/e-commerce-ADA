import { useEffect, useState } from "react";

import axios from "axios";

const URLBASE = "https://strapiecommerce-production.up.railway.app/api";

const useGet = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`${URLBASE}${url}`);
      setData(response.data);
    };
    getProducts();
  }, []);
  return { data };
};
export default useGet;
