import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'




export const ReviewList = ({ store }) => {
    const [reviews, setReviews] = useState([])
    const [stores, setStores] = useState([])

    const { storeId } = useParams()
    const { reviewId } = useParams()
    const navigate = useNavigate()

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/reviews?storeId=${storeId}&_expand=vehicle&_expand=user`)
                .then(response => response.json())
                .then(
                    (reviewArray) => {
                        setReviews(reviewArray)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/stores?id=${storeId}`)
                .then(response => response.json())
                .then((storeArray) => {
                    setStores(storeArray)
                })
        },
        []
    )

    const getAllReviews = () => {
        fetch(`http://localhost:8088/reviews?storeId=${storeId}&_expand=vehicle&_expand=user`)
            .then(response => response.json())
            .then(
                (reviewArray) => {
                    setReviews(reviewArray)
                }
            )
    }

    //use .map to iterate through the reviews array to display all reviews

    return <article className="reviews">
        {
            reviews.map(review =>
                <>
                    {review.user.name}<br></br>
                    {review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br>
                    {review.rating} stars<br></br>
                    {review.text}<br></br>
                    {review.date}<br></br>
                    {review.storeResponseText}<br></br>

                    {
                        autoUserObject.id === review.userId
                            ? <>
                                <button onClick={() => navigate(`/reviews/${storeId}/${review.id}`)}>Edit Review</button>
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/reviews/${review.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => { getAllReviews() })
                                }} className="review__delete">Delete</button>
                            </>
                            : <></>
                    }<br></br>

                    {
                        stores.map(store =>

                            autoUserObject.id === store.userId
                                ? <><button onClick={() => { navigate(`/StoreResponse/${review.id}/${storeId}`) }}>Respond</button></>
                                : <></>
                        )

                    }<br></br>


                </>






            )
        }
    </article>

}