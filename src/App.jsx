import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from "./layout/DefaultLayout";
import  Products  from "./pages/Products";
import { ProductPage } from "./pages/ProductPage";
import { ContextProductsProvider } from "./context/ContextProducts";
import { AddProduct } from "./pages/AddProduct";
import { HomePage } from "./pages/HomePage";
import { Contact } from "./pages/Contact";

function App() {




  return (
    <>
    <ContextProductsProvider>

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

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

