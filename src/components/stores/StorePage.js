
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReviewList } from "../reviews/ReviewList"
import { AddFavoriteStore } from "../favoriteStores/AddFavoriteStore"
import "./StorePage.css"

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
            <div className="store__name">{store.name}<br></br></div>
            <img className="store__img" src={store.img} /><br></br>
            <div className="store__address">{store.address}<br></br></div>
            <div className="store__description__header">About Us:</div>
            <div className="store__description">{store.description}<br></br></div>
            </>
        )
             
        
    }
    {
        stores.map(store =>
        autoUserObject.storeOwner && store.userId === autoUserObject.id
        ?<>
        <button onClick={() => navigate(`/stores/StoreEdit/${store.id}`)}>Edit Store Information</button>
        </>
        :<>
        </>
        )
    }

    <ReviewList className="reviews" />
   
   {
    
    
    stores.map(store =>
    <section className="store_page_buttons">
    <button className="leave_review_button" onClick={() => navigate(`/stores/StoreReviews/${store.id}`)}>Leave a Review</button><br></br>
    <div className="favorite_store_button"><AddFavoriteStore store={store} /><br></br></div>
    <button className="view_stores_button" onClick={() => navigate("/stores/StoreContainer")}>View Stores</button><br></br>
    </section>
    )
    
    }
    </article>
}