import { useState, useReducer, useContext } from "react"
import { ContextProducts } from "../context/ContextProducts";
import productsReducer from "../reducers/productsReducer";
export function ModifyProductForm({product, char}) {

    console.log(product);
    console.log(char);
    const { products, characteristics } = useContext(ContextProducts);
    
    const [state, dispatch] = useReducer(productsReducer, {
        products,
        characteristics
    } );
    const [modProduct, setModProduct] = useState({
        id: product.id,
        createdAt: product.createdAt,
        updatedAt: new Date().toISOString(),
        title: '',
        slug: '',
        description: '',
        category: "smartphone" | "tablet" | "computer",
        brand: '',
        images: [],
        price: 0,
        discount: 0,
        // image: modProduct?.category === "tablet" ? ["tablet1", "tablet2", "tablet3"] : modProduct.category === "computer" ? ["pc1", "pc2", "pc3"] : ["phone1", "phone2", "phone3"]
    });

    const [modCharacteristic, setModCharacteristic] = useState({
        id: char.id,
        title: "Information product",
        category: '',
        createdAt: '',
        updatedAt: new Date().toISOString(),
        info: {
            display: '',
            ram: '',
            storage: '',
            battery: '',
            camera: '',
            processor: '',
        }
    });

    // const [state, dispatch] = useReducer()





    const isTitleProduct = modProduct.title.length !== 0 && modProduct.title.length > 3;
    const isDescriptionProduct = modProduct.title.length !== 0 && modProduct.description.length > 15 && modProduct.description.length < 200;
    // const isCategoryProduct = ["smartphone", "tablet", "computer"].includes(modProduct.category);
    const isBrandProduct = modProduct.brand.length !== 0 && modProduct.brand.length > 3;
    const isPriceProduct = modProduct.price !== 0 && modProduct.price > 0;
    const isDiscountProduct = modProduct.discount !== 0 && modProduct.discount > 0 && modProduct.discount < 100;
    // const isRamChar = modCharacteristic.info.ram !== '';
    // const isStorageChar = modCharacteristic.info.storage !== '';
    // const isBatteryChar = modCharacteristic.info.battery !== '';
    // const isCameraChar = modCharacteristic.info.camera !== '';
    // const isProcessorChar = modCharacteristic.info.processor !== '';
    // const isDisplayChar = modCharacteristic.info.display !== '';

    function handleSubmit(e) {
        e.preventDefault();

        const finalProduct = {
            ...modProduct,
            title: modProduct.title.trim() || product.title,
            slug: modProduct.slug || product.slug,
            description: modProduct.description.trim() || product.description,
            category: modProduct.category || product.category,
            brand: modProduct.brand.trim() || product.brand,
            price: modProduct.price > 0 ? modProduct.price : product.price,
            discount: modProduct.discount > 0 ? modProduct.discount : product.discount,
            images: modProduct.images.length ? modProduct.images : product.images,
        };

        const finalChar = {
            ...modCharacteristic,
            category: modCharacteristic.category || char.category,
            info: {
                display: modCharacteristic.info.display || char.info.display,
                ram: modCharacteristic.info.ram || char.info.ram,
                storage: modCharacteristic.info.storage || char.info.storage,
                battery: modCharacteristic.info.battery || char.info.battery,
                camera: modCharacteristic.info.camera || char.info.camera,
                processor: modCharacteristic.info.processor || char.info.processor,
            }
        };

        modifyProduct(finalProduct, finalChar);

        window.location.reload();
    }



    function handleFormProduct(e) {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "price" || name === "discount") {
            newValue = parseFloat(value);
            if (isNaN(newValue)) newValue = 0; // lo gestirai al submit
        }

        // Genera slug se il titolo cambia
        let updated = {
            ...modProduct,
            [name]: newValue
        };

        if (name === "title") {
            updated.slug = newValue.toLowerCase().replace(/\s+/g, '-');
        }

        if (name === "category") {
            const imagesByCategory = {
                tablet: ["tablet1.jpg", "tablet2.jpg", "tablet3.jpg"],
                computer: ["pc1.jpg", "pc2.jpg", "pc3.jpg"],
                smartphone: ["phone1.jpg", "phone2.jpg", "phone3.jpg"]
            };

            updated.images = imagesByCategory[newValue] || product.images;

            setModCharacteristic(prev => ({
                ...prev,
                category: newValue
            }));
        }

        setModProduct(updated);
    }





    function handleFormChar(e) {
        const { name, value } = e.target;

        if (["display", "processor", "ram", "storage", "battery", "camera"].includes(name)) {
            setModCharacteristic(prev => ({
                ...prev,
                info: {
                    ...prev.info,
                    [name]: value
                }
            }));
        } else {
            setModCharacteristic(prev => ({
                ...prev,
                [name]: value
            }));

        }
    }

    async function modifyProduct(product, char) {
        try {
            const promise = await fetch(`http://localhost:3001/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const promise2 = await fetch(`http://localhost:3001/characteristics/${char.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(char)
            });

            if (!promise.ok) throw new Error(`Prodotto: ${promise.status} ${promise.statusText}`);
            if (!promise2.ok) throw new Error(`Caratteristiche: ${promise2.status} ${promise2.statusText}`);

            const [productRes, charRes] = await Promise.all([promise, promise2]);
            const productData = await productRes.json();
            const charData = await charRes.json();

            // setProducts(prev => prev.map(p => p.id === productData.product.id ? productData.product : p));
            // setCharacteristics(prev => prev.map(c => c.id === charData.characteristic.id ? charData.characteristic : c));

            dispatch({ type: 'UPDATE_PRODUCT', payload: {
                product: productData.product,
                characteristic: charData.characteristic
            } });
            return [productData, charData];

        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // useEffect(() => {
    //     getPost(product.id);
    // }, [products, characteristics])

    return (
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
            <h2 className="mb-4 text-primary">Modifica Prodotto</h2>

            <div className="row my-3">
                <div className="col-12 ">
                    <label htmlFor="title" className="form-label">Nome</label>{modProduct.title.length !== 0 ? isTitleProduct ? <span className="text-success px-1">👍✅</span> : <span className="text-danger px-1">👎❌</span> : null}
                    <input type="text" className="form-control" id="title" name="title" value={modProduct.title} onChange={handleFormProduct} placeholder={product.title}/>
                </div>
            </div>

            <div className="my-3">
                <label htmlFor="description" className="form-label">Descrizione</label>{modProduct.description.length !== 0 ? isDescriptionProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                <textarea className="form-control" id="description" name="description" rows="3" value={modProduct.description} onChange={handleFormProduct} placeholder={product.description}></textarea>
            </div>

            <div className="row my-3">
                <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Categoria</label>
                    <select className="form-select" id="category" name="category" value={modProduct.category} onChange={handleFormProduct} >
                        <option value="">Seleziona una categoria</option>
                        <option value="computer">Computer</option>
                        <option value="smartphone">Smartphone</option>
                        <option value="tablet">Tablet</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="brand" className="form-label">Brand</label>{modProduct.brand.length !== 0 ? isBrandProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                    <input type="text" className="form-control" id="brand" name="brand" value={modProduct.brand} onChange={handleFormProduct} placeholder={product.brand}/>
                </div>
                {/* <div className="col-md-4">
                            <label htmlFor="images" className="form-label">Immagini (URL separati da virgola)</label>
                            <select className="form-select" id="images" name="images" value={modProduct.images} onChange={handleFormProduct}>
                                <option value="pc-images">For PC</option>
                                <option value="smartphone-images">For Smartphone</option>
                                <option value="tablet-images">For Tablet</option>
                            </select>
                        </div> */}
            </div>

            <div className="row my-4">
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Prezzo (€)</label>{modProduct.price !== 0 ? isPriceProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                    <input type="number" className="form-control" id="price" name="price" step="0.01" value={modProduct.price} onChange={handleFormProduct} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="discount" className="form-label">Sconto (%)</label>{modProduct.discount !== 0 ? isDiscountProduct ? <span className="px-1">👍✅</span> : <span className="px-1">👎❌</span> : null}
                    <input type="number" className="form-control" id="discount" name="discount" min="0" max="100" value={modProduct.discount} onChange={handleFormProduct} />
                </div>
            </div>

            <h4 className="mb-3 text-primary">Caratteristiche Tecniche</h4>

            <div className="row my-3">
                <div className="col-md-4">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" name="category" value={modCharacteristic.category} onChange={handleFormChar} disabled>
                        <option value="">Scegli</option>
                        <option value="computer">Computer</option>
                        <option value="smartphone">Smartphone</option>
                        <option value="tablet">Tablet</option>
                    </select>
                    <label htmlFor="display" className="form-label">Display</label>
                    <select className="form-select" id="display" name="display" value={modCharacteristic.info.display} onChange={handleFormChar}>
                        <option value="">Scegli una dimensione</option>
                        <option value="6.1">6.1</option>
                        <option value="6.5">6.5</option>
                        <option value="6.7">6.7</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="ram" className="form-label">RAM</label>
                    <select className="form-select" id="ram" name="ram" value={modCharacteristic.info.ram} onChange={handleFormChar}>
                        <option value="">Scegli una dimensione</option>
                        <option value="4GB">4GB</option>
                        <option value="6GB">6GB</option>
                        <option value="8GB">8GB</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="storage" className="form-label">Storage</label>
                    <select name="storage" id="storage" className="form-select" value={modCharacteristic.info.storage} onChange={handleFormChar}>
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
                    <select className="form-select" id="battery" name="battery" value={modCharacteristic.info.battery} onChange={handleFormChar}>
                        <option value="">Scegli una dimensione</option>
                        <option value="4000mAh">4000mAh</option>
                        <option value="5000mAh">5000mAh</option>
                        <option value="6000mAh">6000mAh</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="camera" className="form-label">Fotocamera</label>
                    <select className="form-select" id="camera" name="camera" value={modCharacteristic.info.camera} onChange={handleFormChar}>
                        <option value="">Scegli una dimensione</option>
                        <option value="8MP">8MP</option>
                        <option value="12MP">12MP</option>
                        <option value="16MP">16MP</option>
                        <option value="40MP">40MP</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="processor" className="form-label">Processore</label>
                    <select className="form-select" id="processor" name="processor" value={modCharacteristic.info.processor} onChange={handleFormChar}>
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
    )
}