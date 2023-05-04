import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const DeleteFavoriteStore = ({favoriteStore, getAllFavoriteStores}) => {
    
 

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

        return fetch(`http://localhost:8088/favoriteStores/${favoriteStore.id}`, {
            method: "DELETE"
        })
        .then(()=> {getAllFavoriteStores()})
    }

return(
    <>
    <button
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
    Remove From Favorites
</button>
</>
)
}


