import { useContext, useEffect } from "react"
import { ContextProducts } from "../context/ContextProducts"
import { Link } from "react-router-dom";

export function CharacteristicsPage() {

    const { characteristics, getCharacteristics } = useContext(ContextProducts)
    console.log(characteristics);

    useEffect(() => {
        getCharacteristics();
    }, [])

    return <>

        <ul>
            {characteristics?.map((c, i) => <li key={i}>
                <Link to={`/characteristics/${c.id}`} c={c}>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                </Link>
            </li>

            )}
        </ul>
    </>
}