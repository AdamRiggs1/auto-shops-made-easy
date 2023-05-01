import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'



export const Reviews = () => {
    const [reviews, setReviews] = useState([])

    const { storeId } = useParams()

    
    
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


    //use .map to iterate through the reviews array to display all stores

    return <article className="reviews">
    {
            reviews.map(review => 
                <>
                {review.user.name}<br></br>
                {review.vehicle.make} {review.vehicle.model} {review.vehicle.year} <br></br>
                {review.rating}<br></br>
                {review.text}<br></br>
                {review.date}<br></br>
                </>
            )
    }
    </article>

}