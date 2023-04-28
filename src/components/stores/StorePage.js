
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export const StorePage = () => {
    const [stores, setStores] = useState([])
    const {storeId} = useParams()
   
   const navigate = useNavigate()

   const localAutoUser = localStorage.getItem("auto_user")
        const autoUserObject = JSON.parse(localAutoUser)
    
    useEffect(
        ()=> {
        fetch (`http://localhost:8088/stores?id=${storeId}`)
        .then(response => response.json())
        .then(
            (storeArray)=> {
                setStores(storeArray)
            }
        )
    },
    []
    )

//itterate through the stores array to get the name, address, and description from the desired store
    return <article className="stores">
    {
        stores.map(store => 
            <>
            {store.name}<br></br>
            {store.address}<br></br>
            {store.description}<br></br>
            </>
        )
             
        
    }
    {
        stores.map(store =>
        autoUserObject.storeOwner
        ?<>
        <button onClick={() => navigate(`/stores/StoreEdit/${store.id}`)}>Edit Store Information</button>
        </>
        :<>
        </>
        )
    }
    <section>
    <button onClick={() => navigate("/stores/StoreList")}>View Stores</button>
    <button onClick={() => navigate("")}>Leave a Review</button>
    </section>
    </article>
}