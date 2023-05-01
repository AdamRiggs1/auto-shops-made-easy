import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const StoreEdit = () => {
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
    const { storeId } = useParams()
    const navigate = useNavigate()


    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/stores/${storeId}`)
                .then(response => response.json())
                .then(
                    (storeArray) => {
                        update(storeArray)
                    }
                )
        },
        [storeId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        return fetch(`http://localhost:8088/stores/${storeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(store)
        })
            .then(response => response.json())
            .then(
                () => {
                    navigate(`/stores/StorePage/${storeId}`)
                }
            )
    }



    return (<>
        <form className="storeForm">
            <h2 className="storeForm__title">Edit Your Store</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="name of store"
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
                        placeholder="Enter a description of your store, features it offers, price points, etc."
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
                Submit Changes
            </button>
            <button onClick={()=> {navigate(`/stores/StorePage/${storeId}`)}}>Cancel Edit</button>
        </form>
    </>
    )


}