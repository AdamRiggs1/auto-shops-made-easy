import { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./UserReviews.css"


export const UserReviews = () => {
    const [reviews, setReviews] = useState([])

    const { reviewId } = useParams()
    const navigate = useNavigate()

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    useEffect(
        ()=> {
        fetch (`http://localhost:8088/reviews?_expand=store&_expand=vehicle&userId=${autoUserObject.id}`)
        .then(response => response.json())
        .then(
            (reviewArray)=> {
                setReviews(reviewArray)
            }
        )
    },
    []
    )
    
    const getAllReviews=() => {
        fetch (`http://localhost:8088/reviews?_expand=store&_expand=vehicle&userId=${autoUserObject.id}`)
        .then(response => response.json())
        .then(
            (reviewArray)=> {
                setReviews(reviewArray)
            }
        )
    }

    //use .map to iterate through the reviews array to display all reviews

    return <article className="reviews">
    {
            reviews.map(review => 
                <section className="review_list">
                <div className="user_review_store_name">{review.store.name}<br></br></div>
                <div className="user_review_vehicle">{review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br></div>
                <div className="user_review_rating">{review.rating} stars<br></br></div>
                <div className="user_review_text">{review.text}<br></br></div>
                <div className="user_review_date">{review.date}<br></br></div>
                
                {
                autoUserObject.id === review.userId
                ?<>
               <button className="user_review_edit_button" onClick={() => navigate(`/reviews/user/${review.id}`)}>Edit Review</button>
               <button className="user_review_delete_button" onClick={()=>{
                fetch(`http://localhost:8088/reviews/${review.id}`,{
                    method: "DELETE"
                })
                .then(()=>{getAllReviews()})
            }} >Delete</button><br></br>
               </>
               :<></>
                }   
                
                </section>
                
                
                
            )
    }
    <button className="back_to_profile_button" onClick={() => navigate("/profile")}>Back to Profile</button>
    </article>

}
