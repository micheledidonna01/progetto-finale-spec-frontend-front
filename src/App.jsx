import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from "./layout/DefaultLayout";
import { Products } from "./pages/Products";
import { ProductPage } from "./pages/ProductPage";
import { TabletsPage } from "./pages/TabletsPage";
import { SmartphonesPage } from "./pages/SmartphonesPage";
import { ComputersPage } from "./pages/ComputersPage";
import { ContextProductsProvider } from "./context/ContextProducts";
import { CharacteristicsPage } from "./pages/CharacteristicsPage";
import { CharacteristicsForProduct } from "./pages/CharacteristicsForProduct";
import { AddProduct } from "./pages/AddProduct";

function App() {




  return (
    <>
    <ContextProductsProvider>

        <BrowserRouter>
        <Routes>

          <Route path="/products" element={<DefaultLayout />}>
            <Route index element={<Products />} />
            <Route path="/products:id" element = {<ProductPage />} />
            <Route path="/products/add" element = {<AddProduct />} />
            
            {/* <Route path="/computer" element = {<ComputersPage />} />
            <Route path="/tablet" element = {<TabletsPage />} />
            <Route path="/smartphone" element = {<SmartphonesPage />} /> */}
          </Route>

          {/* <Route path="characteristics" element={<DefaultLayout />}>
            <Route index element={<CharacteristicsPage />} />
            <Route path="/characteristics:id" element = {<CharacteristicsForProduct />} />
          </Route> */}



        </Routes>
      </BrowserRouter>

    </ContextProductsProvider>
    </>
  )
}

export default App

