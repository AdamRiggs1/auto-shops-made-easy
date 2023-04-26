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
        <h2>User Profile</h2>
        <div>{profile.name}</div>
    </section>

            <section>
                <button onClick={() => navigate("/profile/UserProfileEdit")}>Edit Profile</button>
                <button onClick={() => navigate("")}>Add Vehicle</button>
                <button onClick={() => navigate("")}>Reviews</button>
            </section>

            </article>
            
}