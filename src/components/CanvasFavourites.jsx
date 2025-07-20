import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Solo il CSS
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ContextProducts } from "../context/ContextProducts";
import { useContext } from 'react';
import { Link } from "react-router-dom";
export default function CanvasFavourites({ isOpen, onClose }) {

    const {favourites, setFavourites} = useContext(ContextProducts);
    console.log(favourites);

    function removeAtFavourites(p) {
        setFavourites(favourites.filter(f => f.id !== p.id));
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" backdropClassName='bg-black'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <div className='d-flex '>
                        <p >Favourites</p>
                        <i className='bi bi-star-fill text-warning px-2'></i>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* Contenuto del canvas */}
                {favourites.length === 0 ? <p>No favourites yet</p> :
                    <ul className='list-group row gap-2'>
                        {favourites.map((f, i) => <li key={i} className="list-group-item ">
                            <Link to={`/products/${f.id}`} className='d-flex justify-content-between align-items-center'>
                            <span>{f.title}</span>
                            <button onClick={() => removeAtFavourites(f)} className='btn btn-outline-danger'><i className='bi bi-trash'></i></button>
                            </Link> 
                        </li>
                        )}
                    </ul>}
                <div className=' d-flex justify-content-center w-100 position-relative bottom-0 py-5'>
                    <button className='btn btn-warning trans' onClick={onClose}>Close</button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}


