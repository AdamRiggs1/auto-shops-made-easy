import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddStoreForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [store, update] = useState({
        name: "",
        address: "",
        description: "",
        img: "",
        userId: 0
    })

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()


    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const storeToSendToAPI = {
            userId: autoUserObject.id,
            name: store.name,
            address: store.address,
            description: store.description,
            img: store.img
        }




        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/stores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(storeToSendToAPI)
        })
            .then(response => response.json())
            .then(
                () => {
                    navigate("/profile")
                }


            )
    }

    return (
        <form className="storeForm">
            <h2 className="storeForm__title">Add a New Store</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="enter your store name."
                        value={store.name}
                        onChange={
                            (evt) => {
                                const copy = { ...store }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="store__picture">Picture of Store:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="enter the url of your photo."
                        value={store.img}
                        onChange={
                            (evt) => {
                                const copy = { ...store }
                                copy.img = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="123 Example Lane"
                        value={store.address}
                        onChange={
                            (evt) => {
                                const copy = { ...store }
                                copy.address = evt.target.value
                                update(copy)
                            }
                        } />
            </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a description of what your store does"
                        value={store.description}
                        onChange={
                            (evt) => {
                                const copy = { ...store }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
            </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Store
            </button>
            <button onClick={() => navigate("/profile")}>Back to Profile</button>
        </form>
    )
}