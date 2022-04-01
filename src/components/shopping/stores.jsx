import React, { useState, useEffect } from "react";
import http from "../../services/httpService";

function Stores(props) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function getStores() {
      const result = await http.get("/shopping/stores/");
      setStores(result.data);
    }
    getStores();
  }, []);

  const renderStores = () => {
    return stores.map((store) => (
      <li key={store.id}>
        {store.id} - <strong>{store.name}</strong>
      </li>
    ));
  };

  return (
    <div>
      <h2>Stores</h2>
      <ul>{renderStores()}</ul>
    </div>
  );
}

export default Stores;
