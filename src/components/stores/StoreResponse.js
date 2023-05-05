import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const StoreResponse = () => {
    //set the state for reviews
    const [reviews, update] = useState({
        text: "",
        storeResponseText: "",
        rating: 0,
        date: "",
        userId: 0,
        storeId: 0,
        vehicleId: 0
    })
    const [allReviews, setAllReviews ] = useState([])

    const { storeId } = useParams()
    const { reviewId } = useParams()
    const navigate = useNavigate()


    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)
    //fetch the reviews array

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews?_expand=user&_expand=vehicle&id=${reviewId}`)
                .then(response => response.json())
                .then(
                    (reviewArray) => {
                        setAllReviews(reviewArray)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews/${reviewId}`)
                .then(response => response.json())
                .then(
                    (reviewArray) => {
                        update(reviewArray)
                    }
                )
        },
        []
    )



    //then make a handleSaveButton function
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const reviewToSendToAPI = {
            userId: autoUserObject.id,
            vehicleId: reviews.vehicleId,
            rating: reviews.rating,
            text: reviews.text,
            date: reviews.date,
            storeId: reviews.storeId,
            storeResponseText: reviews.storeResponseText
        }


        return fetch(`http://localhost:8088/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...reviewToSendToAPI, storeId: parseInt(storeId) })
        })
            .then(response => response.json())
            .then(
                () => {
                    navigate(`/stores/StorePage/${storeId}`)
                }
            )
    }
    //in this function, make a post fetch call to post the review to the specific store


    return (<article>
        {

            allReviews.map(review =>
                <>
                    {review.user.name}<br></br>
                    {review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br>
                    {review.rating} stars<br></br>
                    {review.text}<br></br>
                    {review.date}<br></br>

                </>
            )
        }
        <section><form className="reviewForm">
            <h2 className="reviewForm__title">Submit Your Response</h2>
            <h3 className="reviewForm__subheading">Respond to customers in a constructive way</h3>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="owner__response">Your Response:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Respond to review here"
                        value={reviews.storeResponseText}
                        onChange={
                            (evt) => {
                                const copy = { ...reviews }
                                copy.storeResponseText = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Response
            </button>
            <button onClick={() => { navigate(`/stores/StorePage/${storeId}`) }}>Cancel Response</button>
        </form>
        </section>
    </article>
    )
}