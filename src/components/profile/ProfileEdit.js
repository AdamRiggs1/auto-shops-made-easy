import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./profileForm.css"


export const ProfileEdit = () => {
    /*
    TODO: Add the correct default properties to the
    initial state object
    */
    const [profile, newProfile] = useState({
        name: "",
        email: "",
        img: ""
    })
    /*
    TODO: Use the useNavigation() hook so you can redirect
    the user to the ticket list
    */
    const navigate = useNavigate()


    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users/${autoUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                newProfile(data)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        return fetch(`http://localhost:8088/users/${autoUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(
                () => {
                    navigate("/profile")
                }
            )
    }



    return (<>
        <form className="profile_edit_form">
            <h2 className="profile_edit_form_title">Edit Your Profile</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="name"
                        value={profile.name}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.name = evt.target.value
                                newProfile(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus
                        type="email"
                        className="form-control"
                        placeholder="example@example.com"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                newProfile(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        required autoFocus
                        type="password"
                        className="form-control"
                        placeholder="enter password"
                        value={profile.password}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                newProfile(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="profile__picture">Profile Picture:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="place image url here"
                        value={profile.img}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.img = evt.target.value
                                newProfile(copy)
                            }
                        } />
                </div>
            </fieldset>

            <section className="profile_edit_buttons">
                <button className="profile_edit_submit"
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    >
                    Submit Changes
                </button>
                <button className="profile_edit_back" onClick={() => navigate("/profile")}>Back to Profile</button>
            </section>
        </form>
    </>
    )

}