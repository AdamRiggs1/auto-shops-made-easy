import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


export const VehicleList = () => {
    const [vehicles, setVehicles] = useState([])

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const navigate = useNavigate()
    
    useEffect(
        ()=> {
        fetch (`http://localhost:8088/vehicles?_expand=vehicleType`)
        .then(response => response.json())
        .then(
            (vehicleArray)=> {
                setVehicles(vehicleArray)
            }
        )
    },
    []
    )

    const getAllVehicles = () => {
            fetch (`http://localhost:8088/vehicles?_expand=vehicleType`)
            .then(response => response.json())
            .then(
                (vehicleArray)=> {
                    setVehicles(vehicleArray)
                }
            )
        }     
    

    //add a delete button to delete any needed vehicles
    /*const deleteButton = () => {
         
            return fetch(`http://localhost:8088/vehicles`,{
                    method: "DELETE"
                })
                .then(()=>{getAllVehicles()})
        }*/
        
        
        

    return <article className="vehicles">
    {
        vehicles.map(vehicle => 
            <>
            {vehicle.make}
            {vehicle.model}
            {vehicle.year}
            {vehicle.vehicleType.vehicleType}
            <button onClick={() => {
                fetch(`http://localhost:8088/vehicles/${vehicle.id}`, {
                    method: "DELETE"
                })
                .then(()=>{getAllVehicles()})
            }}>Delete</button>

            </>
        )
        
    }
    <section>
    <button onClick={() => navigate("/profile")}>Back to Profile</button>
    </section>
    </article>

}