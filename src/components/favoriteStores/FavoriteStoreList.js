import { useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FavoriteStore } from './FavoriteStore'
import { DeleteFavoriteStore } from './DeleteFavoriteStore'



export const FavoriteStoreList = () => {
    const [stores, setStores] = useState([])
    const [favoriteStores, setFavoriteStores] = useState([])

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const navigate = useNavigate()
    
    useEffect(
        ()=> {
        fetch (`http://localhost:8088/favoriteStores?favoriteStoreUserId=${autoUserObject.id}`)
        .then(response => response.json())
        .then(
            (favoriteStoreArray)=> {
                setFavoriteStores(favoriteStoreArray)
            }
        )
    },
    []
    )



    //this variable will get the info from API and go to the jsx in the function

    const getAllFavoriteStores = () => {
            fetch (`http://localhost:8088/favoriteStores?favoriteStoreUserId=${autoUserObject.id}`)
            .then(response => response.json())
            .then(
                (storeArray)=> {
                    setFavoriteStores(storeArray)
                }
            )
        }    
    
        //jsx should use a .map to iterate through the vehciles array to display all of the information for all the cars
        //there should be a delete button next to each car

    return <article className="stores">
    {
        favoriteStores.map(favoriteStore => 
            <>
        <FavoriteStore favoriteStore={favoriteStore} />
        <DeleteFavoriteStore favoriteStore={favoriteStore}
                            getAllFavoriteStores={getAllFavoriteStores}/>
            </>
        )
        
    }
    <section>
    <button onClick={() => navigate("/profile")}>Back to Profile</button>
    </section>
    </article>

}