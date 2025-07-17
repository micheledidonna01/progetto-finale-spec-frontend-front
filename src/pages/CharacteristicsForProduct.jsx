import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export function CharacteristicsForProduct(){
    const [char, setChar] = useState(null);
    const {id} = useParams();

    async function getChar(id) {

        try {
            const promise = await fetch(`http://localhost:3001/characteristics/${id}`);

            if (!promise.ok) {
                throw new Error(promise.status + ' ' + promise.statusText)
            }
            let result = await promise.json();


            console.log(result);


            setChar(result.characteristic);
            return result;

        } catch (e) {
            console.error(e)
            return {};
        }
    }

    useEffect(() => {
        getChar(id);
    }, [id])
    return <>

        <div className="mt-5">
            {/* {char.title} */}

            {char ? (
                <>
                <p>{char.title}</p>
                <p>{char.value}</p>
                <p>{char.key}</p>
                    <p>{char.product_id}</p>         
                    <p>{char.category}</p>         
                </>

            ):( <p>Nessuna Caratteristica Trovata</p>
            )}
        </div>
        
    
    </>
}