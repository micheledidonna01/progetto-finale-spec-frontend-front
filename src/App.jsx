import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from "./layout/DefaultLayout";
import  Products  from "./pages/Products";
import { ProductPage } from "./pages/ProductPage";
import { ContextProductsProvider } from "./context/ContextProducts";
import { AddProduct } from "./pages/AddProduct";
import { HomePage } from "./pages/HomePage";
import { Contact } from "./pages/Contact";
import  NotFound  from "./pages/NotFound";

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
              <Route path=":id" element={<ProductPage />} />
              <Route path="not-found" element={<NotFound />} />
              <Route path="add" element={<AddProduct />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </ContextProductsProvider>
    </>
  )
}

export default App

