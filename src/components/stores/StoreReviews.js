import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const StoreReviews = () => {
    const [vehicles, setVehicles] = useState([])
    //set the state for reviews
    const [reviews, newReview] = useState({
        text: "",
        storeResponseText:"",
        rating: 0,
        date: "",
        userId: 0,
        storeId: 0,
        vehicleId: 0
    })
    
    const { storeId } = useParams()
    const navigate = useNavigate()

    
    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)
    //fetch the reviews array
    useEffect(
            () => {
                fetch(`http://localhost:8088/reviews`)
                    .then(response => response.json())
                    .then(
                        (reviewArray) => {
                            newReview(reviewArray)
                        }
                    )
            },
            []
        )

    useEffect(
        () => {
            fetch(`http://localhost:8088/vehicles?userId=${autoUserObject.id}&_expand=vehicleType`)
                .then(response => response.json())
                .then(
                    (vehicleArray) => {
                        setVehicles(vehicleArray)
                    }
                )
        },
        []
    )
    
    
    //then make a handleSaveButton function
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const reviewToSendToAPI ={
        userId: autoUserObject.id,
        vehicleId: reviews.vehicleId,
        rating: reviews.rating,
        text: reviews.text,
        date: reviews.date,
        storeId: reviews.storeId,
        storeResponseText: reviews.storeResponseText
        }

        
        return fetch(`http://localhost:8088/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...reviewToSendToAPI, storeId: parseInt(storeId), storeResponseText: ""})
        })
        .then(response => response.json())
        .then(
                () => {
                    navigate(`/stores/StorePage/${storeId}/:reviewId`)
                }
                )
            }
    //in this function, make a post fetch call to post the review to the specific store


    return(       
         <form className="reviewForm">
    <h2 className="reviewForm__title">Leave Your Review</h2>
    <h3 className="reviewForm__subheading">Describe the cost of the repair, as well as the specifc items you had fixed</h3>
   
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer_vehicle">Repaired Vehicle:</label>
                    <select
                        className="customer_vehicle"
                        onChange={
                            (evt) => {
                                const copy = { ...reviews }
                                copy.vehicleId = parseInt(evt.target.value)
                                newReview(copy)
                            }
                        }>
                        <option value={0}>Choose Vehicle</option>
                        {
                            vehicles.map(
                                vehicle => {
                                   return <option key={vehicle.id}value={vehicle.id}>{vehicle.make} {vehicle.model} {vehicle.year} ({vehicle.vehicleType.vehicleType})</option>
                                }

                            )
                        }

                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer_vehicle">Star Rating:</label>
                    <select
                        className="customer_vehicle"
                        onChange={
                            (evt) => {
                                const copy = { ...reviews }
                                copy.rating = parseInt(evt.target.value)
                                newReview(copy)
                            }
                        }>
                        <option value={0}>How Many Stars?</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>

                    </select>
                </div>
            </fieldset>

    <fieldset>
        <div className="form-group">
            <label htmlFor="customer__review">Review:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="write what you paid, what repairs you got done, quality of service, etc."
                value={reviews.text}
                onChange={
                    (evt) => {
                        const copy = { ...reviews }
                        copy.text = evt.target.value
                        newReview(copy)
                    }
                } />
        </div>
    </fieldset>

    <fieldset>
        <div className="form-group">
            <label htmlFor="customer__review">Date:</label>
            <input
                required autoFocus
                type="date"
                className="form-control"
                value={reviews.date}
                onChange={
                    (evt) => {
                        const copy = { ...reviews }
                        copy.date = evt.target.value
                        newReview(copy)
                    }
                } />
        </div>
    </fieldset>

    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Review
    </button>
    <button onClick={()=> {navigate(`/stores/StorePage/${storeId}/:reviewId`)}}>Cancel Edit</button>
</form>


    )
}