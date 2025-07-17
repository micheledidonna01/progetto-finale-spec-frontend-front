import { useReducer, useState } from "react"


export function AddProduct(){

    const [newProduct, setNewProduct] = useState({
        title: '',
        slug: '',
        description: '',
        category: '',
        price: '',
        image: ''
    });

    const [newCharacteristic, setNewCharacteristic] = useState({
        display: '',
        resolution: '',
        processor: '',
        ram: '',
        storage: '',
        battery: ''
    });

    const [state, dispatch] = useReducer()


    function handleSubmit(e){
        e.preventDefault();
        console.log(newProduct);
        console.log(newCharacteristic);
    }

    function handleFormProduct(e){
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    function handleFormChar(e){
        setNewCharacteristic({
            ...newCharacteristic,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h1>Add Product</h1>
            <div className="container py-5">
                <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <h2 className="mb-4 text-primary">Dettagli Prodotto</h2>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="title" className="form-label">Titolo</label>
                            <input type="text" className="form-control" id="title" name="title" required value={newProduct.title} onChange={handleFormProduct}/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrizione</label>
                        <textarea className="form-control" id="description" name="description" rows="3" value={newProduct.description} onChange={handleFormProduct}></textarea>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="category" className="form-label">Categoria</label>
                            <select className="form-select" id="category" name="category" value={newProduct.category} onChange={handleFormProduct} >
                                <option value="computer">Computer</option>
                                <option value="smartphone">Smartphone</option>
                                <option value="tablet">Tablet</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <input type="text" className="form-control" id="brand" name="brand" value={newProduct.brand} onChange={handleFormProduct}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="images" className="form-label">Immagini (URL separati da virgola)</label>
                            <select className="form-select" id="images" name="images" value={newProduct.images} onChange={handleFormProduct}>
                                <option value="pc-images">For PC</option>
                                <option value="smartphone-images">For Smartphone</option>
                                <option value="tablet-images">For Tablet</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="price" className="form-label">Prezzo (€)</label>
                            <input type="number" className="form-control" id="price" name="price" step="0.01" value={newProduct.price} onChange={handleFormProduct}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="discount" className="form-label">Sconto (%)</label>
                            <input type="number" className="form-control" id="discount" name="discount" min="0" max="100" value={newProduct.discount} onChange={handleFormProduct}/>
                        </div>
                    </div>

                    <h4 className="mb-3 text-primary">Caratteristiche Tecniche</h4>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="display" className="form-label">Display</label>
                            <select className="form-select" id="display" name="display" value={newCharacteristic.display} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="6.1">6.1</option>
                                <option value="6.5">6.5</option>
                                <option value="6.7">6.7</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="ram" className="form-label">RAM</label>
                            <select className="form-select" id="ram" name="ram" value={newCharacteristic.ram} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="4GB">4GB</option>
                                <option value="6GB">6GB</option>
                                <option value="8GB">8GB</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="storage" className="form-label">Storage</label>
                            <select name="storage" id="storage" className="form-select" value={newCharacteristic.storage} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="128GB">128GB</option>
                                <option value="256GB">256GB</option>
                                <option value="512GB">512GB</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="battery" className="form-label">Batteria</label>
                            <select className="form-select" id="battery" name="battery" value={newCharacteristic.battery} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="4000mAh">4000mAh</option>
                                <option value="5000mAh">5000mAh</option>
                                <option value="6000mAh">6000mAh</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="camera" className="form-label">Fotocamera</label>
                            <select className="form-select" id="camera" name="camera" value={newCharacteristic.camera} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="8MP">8MP</option>
                                <option value="12MP">12MP</option>
                                <option value="16MP">16MP</option>
                                <option value="40MP">40MP</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="processor" className="form-label">Processore</label>
                            <select className="form-select" id="processor" name="processor" value={newCharacteristic.processor} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="Snapdragon">Snapdragon</option>
                                <option value="intel">Intel</option>
                                <option value="Exynos">Exynos</option>
                            </select>
                            
                        </div>
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">Salva Prodotto</button>
                    </div>
                </form>
            </div>
        </div>
    )
}