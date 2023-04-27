import { useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Store } from './Store'



export const StoreList = () => {
    const [stores, setStores] = useState([])

    
    
    useEffect(
        ()=> {
        fetch (`http://localhost:8088/stores`)
        .then(response => response.json())
        .then(
            (storeArray)=> {
                setStores(storeArray)
            }
        )
    },
    []
    )

    //use .map to iterate through the stores array to display all stores

    return <article className="stores">
    {
        stores.map(store => 
            <>
        <Store store={store} />
            </>
        )
        
    }
    </article>

}