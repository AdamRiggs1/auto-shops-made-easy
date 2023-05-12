import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./ReviewList.css"




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
                <section className="review__list">
                    <div className="review__name">{review.user.name}<br></br></div>
                    <div className="review__vehicle">{review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br></div>
                    <div className="review__rating">{review.rating} stars<br></br></div>
                    <div className="review__text">{review.text}<br></br></div>
                    <div className="review__date">{review.date}<br></br></div>
                    <div className="review__response__header">Response from Management:</div>
                    <div className="review__response">{review.storeResponseText}<br></br></div>

                    {
                        autoUserObject.id === review.userId
                            ? <section className="review__buttons">
                                <button onClick={() => navigate(`/reviews/${storeId}/${review.id}`)}>Edit Review</button>
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/reviews/${review.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => { getAllReviews() })
                                }} className="review__delete">Delete</button>
                            </section>
                            : <></>
                    }<br></br>

                    {
                        stores.map(store =>

                            autoUserObject.id === store.userId
                                ? <section className="review__buttons"><button onClick={() => { navigate(`/StoreResponse/${review.id}/${storeId}`) }}>Respond</button></section>
                                : <></>
                        )

                    }<br></br>


                </section>






            )
        }
    </article>

}