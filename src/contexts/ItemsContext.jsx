/*import { Children, createContext } from "react";

export const ItemsContext = createContext();

export const Provider = ({children}) => {
return <ItemsContext.Provider value={1} {children} </ItemsContext.Provider>;
}
</ItemsContext.Provider>
*/

import { createContext, useState} from "react";
export const ItemsContext = createContext();
export const Provider = ({ children }) => {
const [productos, setProductos ] = useState ([])

const reset = () => setProductos ([]);
  return (
    <ItemsContext.Provider value={{productos, reset}}>
      {children}
    </ItemsContext.Provider>
  );
};
