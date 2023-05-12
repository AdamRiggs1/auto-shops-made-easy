import { ReviewList } from './ReviewList'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const ReviewContainer = () => {
    const [ stores, setStores ] = useState([])

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const { storeId } = useParams()
    const { reviewId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/stores`)
                .then(response => response.json())
                .then((storeArray) => {
                    setStores(storeArray)
                })
        },
        []
    )
    

    return( <article>
        

        {
            stores.map( store =>
                <>
            {store.userId} 
            </>
                
            
          )  
        }
</article>
        
    )
}