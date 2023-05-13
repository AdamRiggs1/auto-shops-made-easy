import { useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './StoreList.css'


export const OwnerStoreList = () => {
    const [stores, setStores] = useState([])

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const navigate = useNavigate()
    
    useEffect(
        ()=> {
        fetch (`http://localhost:8088/stores?userId=${autoUserObject.id}`)
        .then(response => response.json())
        .then(
            (storeArray)=> {
                setStores(storeArray)
            }
        )
    },
    []
    )

    //this variable will get the info from API and go to the jsx in the function

    const getAllStores = () => {
            fetch (`http://localhost:8088/stores?userId=${autoUserObject.id}`)
            .then(response => response.json())
            .then(
                (storeArray)=> {
                    setStores(storeArray)
                }
            )
        }    
    
        //jsx should use a .map to iterate through the vehciles array to display all of the information for all the cars
        //there should be a delete button next to each car

    return <article className="stores">
    {
        stores.map(store => 
            <section className="owner_stores">
        <Link className="store_info_link" to={""}>{store.name}</Link>
            <div className="store_list_address">{store.address}</div>
            <img className="store_list_img" src={store.img} />
            <button
            className="owner_stores_delete_button"
             onClick={() => {
                fetch(`http://localhost:8088/stores/${store.id}`, {
                    method: "DELETE"
                })
                .then(()=>{getAllStores()})
            }}>Delete</button> 
            </section>
        )
        
    }
    <section>
    <button className="back_to_profile_button" onClick={() => navigate("/profile")}>Back to Profile</button>
    </section>
    </article>

}