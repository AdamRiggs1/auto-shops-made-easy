import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Store } from './Store'

export const StoreRating = ({ searchTermState }) => {
    const [reviews, setReviews] = useState([])
    const [filteredStores, setFiltered] = useState([])

    const { storeId } = useParams()

    useEffect(
        ()=> {
        fetch (`http://localhost:8088/reviews?storeId=${storeId}`)
        .then(response => response.json())
        .then(
            (reviewArray)=> {
                setReviews(reviewArray)
            }
        )
    },
    []
    )

    //create a mathematical function to find the average of all reviews on a given store
    /*const reviewAverageFunction = () => {
        for (const review of reviews) {
            let average = 0
            average += review.rating
            return average
        }
        
    }*/

    /*const reviewAverageFunction = () => {
        let count = 0, sumHeight = 0;
        for (let key in reviews) {
            if (reviews.hasOwnProperty(key)) {
                if (reviews[key].hasOwnProperty("rating")) {
                    sumHeight += reviews[key].rating;
                    count += 1
                    return sumHeight/count
                }
            }
        }
    }*/

    /*const reviewAverageFunction = () => {
        
        const arr = Object.values(reviews)
        const sum = (prev, cur) => ({rating: prev.rating + cur.rating});
        const avg = arr.reduce(sum).rating / arr.length;
        return avg
        
    }*/
    
    /*const reviewAverageFunction = () => {
        for (const review in reviews) {
            let total = 0
            let length = 0
            total += reviews[review.ratings]
            length++
            return total/length
        }
    }*/

    const reviewAverageFunction = () => {
        return reviews.map(review => 
          review.rating.length
        )

    }
    


    //use .map to iterate through the stores array to display all stores

    return <article className="reviews">
    {
        reviewAverageFunction()
        
    }
    </article>

}