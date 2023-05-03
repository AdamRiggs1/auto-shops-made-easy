import { useEffect, useState} from 'react'
import { Store } from './Store'

export const StoreList = ({ searchTermState }) => {
    const [stores, setStores] = useState([])
    const [filteredStores, setFiltered] = useState([])

    useEffect(
        ()=> {
        fetch (`http://localhost:8088/stores`)
        .then(response => response.json())
        .then(
            (storeArray)=> {
                setStores(storeArray)
                setFiltered(storeArray)
            }
        )
    },
    []
    )
    
    useEffect(
        () => {
            const searchedStores = stores.filter(store => store.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setFiltered(searchedStores)
        },
        [searchTermState]
    )
    


    //use .map to iterate through the stores array to display all stores

    return <article className="stores">
    {
        filteredStores.map(store => 
            <>
        <Store store={store} />
            </>
        )
        
    }
    </article>

}