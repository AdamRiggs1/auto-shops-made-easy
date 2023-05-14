//import useEffect and state components 
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//import appropriate image tag

export const UserProfile = () => {
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
        <h2 className="profile__header">Profile</h2>
        <div className="profile__name">{profile.name}</div><br></br>
        <img className="profile__pic" src={profile.img} />
    </section>

            <section className="profile__buttons">
                <div className="profile__div">
                <h4 className="profile__manage">Manage Profile</h4>
                <button className="profile__button" onClick={() => navigate("/profile/ProfileEdit")}>Edit Profile</button>
                </div>
                <div className="profile__div">
                <h4 className="profile__manage">Manage Vehicles</h4>
                <button className="profile__button" onClick={() => navigate("/vehicles/AddVehicleForm")}>Add Vehicle</button><br></br>
                <button className="profile__button" onClick={() => navigate("/vehicles/VehicleList")}>View Vehicles</button>
                </div>
                <div className="profile__div">
                <h4 className="profile__manage">Manage Reviews</h4>
                <button className="profile__button" onClick={() => navigate("/reviews")}>View Your Reviews</button>
                </div>
                <div className="profile__div">
                <h4 className="profile__manage">Manage Favorite Stores</h4>
                <button className="profile__button" onClick={() => navigate("/FavoriteStores")}>View Your Favorite Stores</button>
                </div>
            </section>

            </article>
            
}