  //import useEffect and state components 
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//import appropriate image tag

export const StoreProfile = () => {
    //use a fetch call that will get all of the information for the specific user
    //that is currently logged in
    const [profile, setProfile] = useState({
        name: "",
        img: ""
    })
    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const navigate=useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${autoUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    setProfile(data)
                })
        },
        []
    )

    return <article>
        <section>
        <h2>Store Owner Profile</h2>
        <div>{profile.name}</div>
    </section>

            <section>
                <button onClick={() => navigate("/profile/ProfileEdit")}>Edit Profile</button>
                <button onClick={() => navigate("/vehicles/AddVehicleForm")}>Add Vehicle</button>
                <button onClick={() => navigate("/vehicles/VehicleList")}>View Vehicles</button>
                <button onClick={() => navigate("")}>Reviews</button>
                <button onClick={() => navigate("/stores/AddStoreForm")}>Add Store</button>
                <button onClick={() => navigate("/stores/OwnerStoreList")}>Edit Store Page</button>
            </section>

            </article>
            
}
