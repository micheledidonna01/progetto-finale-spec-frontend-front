import { useReducer, useState } from "react"
import { ContextProducts } from "../context/ContextProducts";
import { useContext } from "react";
import productsReducer from "../reducers/productsReducer";
export function AddProduct() {

    
    
    const { products, characteristics, } = useContext(ContextProducts);
    const initialsState = {
        products: products,
        characteristics: characteristics,
    }
    const [state, dispatch] = useReducer(productsReducer, initialsState);
    

    const initialSetProduct = {
        id: products.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: '',
        slug: '',
        description: '',
        category: "smartphone" | "tablet" | "computer",
        brand: '',
        images: [],
        price: 0,
        discount: 0,
    }

    const initialSetChar = {
        id: characteristics.length + 1,
        title: "Information product",
        category: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        info: {
            display: '',
            ram: '',
            storage: '',
            battery: '',
            camera: '',
            processor: '',
        }
    }

    const [newProduct, setNewProduct] = useState(initialSetProduct);

    const [newCharacteristic, setNewCharacteristic] = useState(initialSetChar);

    // const [state, dispatch] = useReducer()

    async function addProduct() {

        try {
            const promise = await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            const promise2 = await fetch('http://localhost:3001/characteristics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCharacteristic)
            });

            if (!promise.ok) {
                throw new Error('Problemi con la risposta del server per il prodotto' + promise.status + ' ' + promise.statusText)
            }

            if (!promise2.ok) {
                throw new Error('Problemi con la risposta del server per le caratteristiche' + promise2.status + ' ' + promise2.statusText)
            }

            let [productRes, charRes] = await Promise.all([promise, promise2]);
            let productData = await productRes.json();

            let charData = await charRes.json();
            console.log(productData);
            console.log(charData);

            // setProducts([...products, productData.product]);
            // setCharacteristics([...characteristics, charData.characteristic]);
            
            dispatch({
                type: 'ADD_PRODUCT', payload: {
                    product: productData.product,
                    characteristic: charData.characteristic
                }
});
            
            
        } catch (e) {
            console.error(e)
        }
    }


    const isTitleProduct = newProduct.title.length > 3;
    const isDescriptionProduct = newProduct.description.length > 15 && newProduct.description.length < 200;
    const isCategoryProduct = ["smartphone", "tablet", "computer"].includes(newProduct.category);
    const isBrandProduct = newProduct.brand.length > 3;
    const isPriceProduct = newProduct.price > 0;
    const isDiscountProduct = newProduct.discount > 0 && newProduct.discount < 100;
    const isRamChar = newCharacteristic.info.ram !== '';
    const isStorageChar = newCharacteristic.info.storage !== '';
    const isBatteryChar = newCharacteristic.info.battery !== '';
    const isCameraChar = newCharacteristic.info.camera !== '';
    const isProcessorChar = newCharacteristic.info.processor !== '';
    const isDisplayChar = newCharacteristic.info.display !== '';

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !isTitleProduct ||
            !isDescriptionProduct ||
            !isCategoryProduct ||
            !isBrandProduct ||
            !isPriceProduct ||
            !isDiscountProduct ||
            !isRamChar ||
            !isStorageChar ||
            !isBatteryChar ||
            !isCameraChar ||
            !isProcessorChar ||
            !isDisplayChar
        ) {
            alert("Completa tutti i campi correttamente");
            return;
        }
        console.log(newProduct);
        console.log(newCharacteristic);

        addProduct();
        setNewProduct(initialSetProduct);
        setNewCharacteristic(initialSetChar);
    }

    function handleFormProduct(e) {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "price" || name === "discount") {
            newValue = parseFloat(newValue);
        }

        let updated = {
            ...newProduct,
            [name]: newValue
        };

        if (name === "title") {
            updated.slug = value.toLowerCase().replace(/\s+/g, '-');
        }


        if (name === "category") {
            updated.images =
                value === "tablet"
                    ? ["tablet1.jpg", "tablet2.jpg", "tablet3.jpg"]
                    : value === "computer"
                        ? ["pc1.jpg", "pc2.jpg", "pc3.jpg"]
                        : ["phone1.jpg", "phone2.jpg", "phone3.jpg"];
            setNewCharacteristic(prev => ({
                ...prev,
                category: value
            }));
        }

        setNewProduct(updated);
    }


    function handleFormChar(e) {
        const { name, value } = e.target;

        if (["display", "processor", "ram", "storage", "battery", "camera"].includes(name)) {
            setNewCharacteristic(prev => ({
                ...prev,
                info: {
                    ...prev.info,
                    [name]: value
                }
            }));
        } else {
            setNewCharacteristic(prev => ({
                ...prev,
                [name]: value
            }));

        }
    }


    return (
        <div className="py-5">
            
            <div className="container py-5">
                <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <h2 className="mb-4 text-primary">Dettagli Prodotto</h2>

                    <div className="row my-3">
                        <div className="col-12 ">
                            <label htmlFor="title" className="form-label">Nome</label>{newProduct.title.length !== 0 ? isTitleProduct ? <span className="text-success px-1">👍✅</span> : <span className="text-danger px-1">👎❌</span>: null}
                            <input type="text" className="form-control" id="title" name="title" required value={newProduct.title} onChange={handleFormProduct} />
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="description" className="form-label">Descrizione</label>{newProduct.description.length !== 0 ? isDescriptionProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                        <textarea className="form-control" id="description" name="description" rows="3" value={newProduct.description} onChange={handleFormProduct}></textarea>
                    </div>

                    <div className="row my-3">
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">Categoria</label>
                            <select className="form-select" id="category" name="category" value={newProduct.category} onChange={handleFormProduct} >
                                <option value="">Seleziona una categoria</option>
                                <option value="computer">Computer</option>
                                <option value="smartphone">Smartphone</option>
                                <option value="tablet">Tablet</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="brand" className="form-label">Brand</label>{newProduct.brand.length !== 0 ? isBrandProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                            <input type="text" className="form-control" id="brand" name="brand" value={newProduct.brand} onChange={handleFormProduct} />
                        </div>
                        {/* <div className="col-md-4">
                            <label htmlFor="images" className="form-label">Immagini (URL separati da virgola)</label>
                            <select className="form-select" id="images" name="images" value={newProduct.images} onChange={handleFormProduct}>
                                <option value="pc-images">For PC</option>
                                <option value="smartphone-images">For Smartphone</option>
                                <option value="tablet-images">For Tablet</option>
                            </select>
                        </div> */}
                    </div>

                    <div className="row my-4">
                        <div className="col-md-6">
                            <label htmlFor="price" className="form-label">Prezzo (€)</label>{newProduct.price !== 0 ? isPriceProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                            <input type="number" className="form-control" id="price" name="price" step="0.01" value={newProduct.price} onChange={handleFormProduct} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="discount" className="form-label">Sconto (%)</label>{newProduct.discount !== 0 ? isDiscountProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                            <input type="number" className="form-control" id="discount" name="discount" min="0" max="100" value={newProduct.discount} onChange={handleFormProduct} />
                        </div>
                    </div>

                    <h4 className="mb-3 text-primary">Caratteristiche Tecniche</h4>

                    <div className="row my-3">
                        <div className="col-md-4">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select className="form-select" id="category" name="category" value={newCharacteristic.category} onChange={handleFormChar} disabled>
                                <option value="">Scegli</option>
                                <option value="computer">Computer</option>
                                <option value="smartphone">Smartphone</option>
                                <option value="tablet">Tablet</option>
                            </select>
                            <label htmlFor="display" className="form-label">Display</label>
                            <select className="form-select" id="display" name="display" value={newCharacteristic.info.display} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="6.1">6.1</option>
                                <option value="6.5">6.5</option>
                                <option value="6.7">6.7</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="ram" className="form-label">RAM</label>
                            <select className="form-select" id="ram" name="ram" value={newCharacteristic.info.ram} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="4GB">4GB</option>
                                <option value="6GB">6GB</option>
                                <option value="8GB">8GB</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="storage" className="form-label">Storage</label>
                            <select name="storage" id="storage" className="form-select" value={newCharacteristic.info.storage} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="128GB">128GB</option>
                                <option value="256GB">256GB</option>
                                <option value="512GB">512GB</option>
                            </select>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-md-4">
                            <label htmlFor="battery" className="form-label">Batteria</label>
                            <select className="form-select" id="battery" name="battery" value={newCharacteristic.info.battery} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="4000mAh">4000mAh</option>
                                <option value="5000mAh">5000mAh</option>
                                <option value="6000mAh">6000mAh</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="camera" className="form-label">Fotocamera</label>
                            <select className="form-select" id="camera" name="camera" value={newCharacteristic.info.camera} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="8MP">8MP</option>
                                <option value="12MP">12MP</option>
                                <option value="16MP">16MP</option>
                                <option value="40MP">40MP</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="processor" className="form-label">Processore</label>
                            <select className="form-select" id="processor" name="processor" value={newCharacteristic.info.processor} onChange={handleFormChar}>
                                <option value="">Scegli una dimensione</option>
                                <option value="Snapdragon">Snapdragon</option>
                                <option value="Intel">Intel</option>
                                <option value="Exynos">Exynos</option>
                                <option value="Android">Android</option>
                                <option value="IOS">IOS</option>
                                <option value="MacOS">MacOs</option>
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