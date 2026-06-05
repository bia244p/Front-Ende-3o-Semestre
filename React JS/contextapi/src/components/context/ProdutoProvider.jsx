import { useState } from "react";
import ProdutoContext from "./ProdutoContext";

const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = (nome) => {
    const novoProduto = {
      id: Date.now(),
      nome,
    };

    setProdutos([...produtos, novoProduto]);
  };

  return (
    <ProdutoContext.Provider
      value={{
        produtos,
        adicionarProduto,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
};

export default ProdutoProvider;