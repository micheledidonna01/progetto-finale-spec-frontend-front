import { useState } from "react";

export default function useStorage(itemKey, initialValue) {

    //dichiarazione dello state
    const [state, setState] = useState(() => {

        //codice a rischio
        try {

            //prendo dal localStorage il valore della chiave
            const prevState = localStorage.getItem(itemKey);

            //se la chiave esiste
            if (prevState) {
                //ritorno il valore della stringa JSON in formato oggetto  
                return JSON.parse(prevState);
            }
            
        } catch (err) {
            //gestione degli errori
            console.log(`Errore nel parse di ${itemKey}`, err);
        }
        //setto la chiave con il valore iniziale
        localStorage.setItem(itemKey, JSON.stringify(initialValue));

        //ritorno il valore iniziale
        return initialValue;
    });

    //funzione per cambiare lo stato
    const changeState = (newValue) => {
        // setto lo stato
        setState(newValue);

        //setto il valore della chiave
        localStorage.setItem(itemKey, JSON.stringify(newValue));
    };

    //ritorno il valore dello stato e la funzione per cambiare lo stato
    return [state, changeState];
}
