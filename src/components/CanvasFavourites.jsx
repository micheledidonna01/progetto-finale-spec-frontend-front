import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Solo il CSS
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ContextProducts } from "../context/ContextProducts";
import { useContext } from 'react';
export default function CanvasFavourites({ isOpen, onClose }) {

    const {favourites, setFavourites} = useContext(ContextProducts);
    console.log(favourites);

    function removeAtFavourites(p) {
        setFavourites(favourites.filter(f => f.id !== p.id));
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" backdropClassName='bg-black'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Favourites</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* Contenuto del canvas */}
                {favourites.length === 0 ? <p>No favourites yet</p> :
                    <ul className='list-group list-group-flush'>
                        {favourites.map((f, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{f.title}</span>
                            <button onClick={() => removeAtFavourites(f)} className='btn btn-outline-danger'>Remove</button>
                        </li>
                        )}
                    </ul>}
              
            </Offcanvas.Body>
        </Offcanvas>
    );
}


