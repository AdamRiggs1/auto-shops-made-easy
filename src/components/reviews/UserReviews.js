import { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'



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
                <>
                {review.store.name}<br></br>
                {review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br>
                {review.rating} stars<br></br>
                {review.text}<br></br>
                {review.date}<br></br>
                
                {
                autoUserObject.id === review.userId
                ?<>
               <button onClick={() => navigate(`/reviews/user/${review.id}`)}>Edit Review</button>
               <button onClick={()=>{
                fetch(`http://localhost:8088/reviews/${review.id}`,{
                    method: "DELETE"
                })
                .then(()=>{getAllReviews()})
            }} className="review__delete">Delete</button><br></br>
               </>
               :<></>
                }   
                
                </>
                
                
                
            )
    }
    <button onClick={() => navigate("/profile")}>Back to Profile</button>
    </article>

}
