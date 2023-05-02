import { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'



export const ReviewList = () => {
    const [reviews, setReviews] = useState([])

    const { storeId } = useParams()
    const { reviewId } =useParams()
    const navigate = useNavigate()

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    useEffect(
        ()=> {
        fetch (`http://localhost:8088/reviews?storeId=${storeId}&_expand=vehicle&_expand=user`)
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
        fetch (`http://localhost:8088/reviews?storeId=${storeId}&_expand=vehicle&_expand=user`)
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
                {review.user.name}<br></br>
                {review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br>
                {review.rating}<br></br>
                {review.text}<br></br>
                {review.date}<br></br>
                
                {
                autoUserObject.storeOwner === false
                ?<>
               <button onClick={() => navigate(`/reviews/${storeId}/${review.id}`)}>Edit Review</button>
               <button onClick={()=>{
                fetch(`http://localhost:8088/reviews/${review.id}`,{
                    method: "DELETE"
                })
                .then(()=>{getAllReviews()})
            }} className="review__delete">Delete</button>
               </>
               :<></>
                }   
                
                </>
                
                
                
            )
    }
    </article>

}