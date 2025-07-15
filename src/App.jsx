import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from "./layout/DefaultLayout";
import { Products } from "./pages/Products";
function App() {




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Products />} />
            {/* <Route path=":id" element = {} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

