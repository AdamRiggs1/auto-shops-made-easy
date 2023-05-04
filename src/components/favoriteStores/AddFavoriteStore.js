import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const AddFavoriteStore = ({store}) => {
    /*
    TODO: Add the correct default properties to the
    initial state object
    */
    const [favoriteStore, setFavoriteStore] = useState({
        name: "",
        address: "",
        description: "",
        img: "",
        userId: 0,
        favoriteStoreUserId: 0,
        storeId: 0
    })



    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/stores?id=20}`)
                .then(response => response.json())
                .then(
                    (setFavoriteStoreArray) => {
                        setFavoriteStore(setFavoriteStoreArray)
                    }
                )
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const favoriteStoreToBeSavedToTheAPI = {
            userId: store.userId,
            storeId: store.storeId,
            name: store.name,
            address: store.address,
            description: store.description,
            img: store.img,
            favoriteStoreUserId: autoUserObject.id
        }

        return fetch(`http://localhost:8088/favoriteStores?storeId=${store.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoriteStoreToBeSavedToTheAPI)
        })
            .then(response => response.json())
            .then(
                setFavoriteStore()
            )
    }
return(
    <>
    <button
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
    Add to Favorties
</button>
</>
)
}