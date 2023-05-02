import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const AddVehicleForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [vehicle, update] = useState({
        make: "",
        model: "",
        year: 0,
        vehicleTypeId: 0,
        userId: 0
    })

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/vehicleTypes`)
                .then(response => response.json())
                .then((vehicleTypeArray) => {
                    setVehicleTypes(vehicleTypeArray)
                })
        },
        []
    )




    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const vehicleToSendToAPI = {
            userId: autoUserObject.id,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            vehicleTypeId: vehicle.vehicleTypeId
        }




        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/vehicles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleToSendToAPI)
        })
            .then(response => response.json())
            .then(
                () => {
                    navigate("/profile")
                }


            )
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Add a New Vehicle</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="make">Make:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Toyota, Honda, etc."
                        value={vehicle.name}
                        onChange={
                            (evt) => {
                                const copy = { ...vehicle }
                                copy.make = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Accord, Elantra, etc."
                        value={vehicle.model}
                        onChange={
                            (evt) => {
                                const copy = { ...vehicle }
                                copy.model = evt.target.value
                                update(copy)
                            }
                        } />
            </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        value={vehicle.year}
                        onChange={
                            (evt) => {
                                const copy = { ...vehicle }
                                copy.year = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
            </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="vehicle_type">Vehicle Type:</label>
                    <select
                        className="vehicle_type"
                        onChange={
                            (evt) => {
                                const copy = { ...vehicle }
                                copy.vehicleTypeId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }>
                        <option value={0}>Choose Vehicle Type</option>
                        {
                            vehicleTypes.map(
                                vehicleType => {
                                   return <option key={vehicleType.id}value={vehicleType.id}>{vehicleType.vehicleType}</option>
                                }

                            )
                        }

                    </select>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Vehicle
            </button>
            <button onClick={() => navigate("/profile")}>Back to Profile</button>
        </form>
    )
}