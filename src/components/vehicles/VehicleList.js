import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


export const VehicleList = () => {
    const [vehicles, setVehicles] = useState([])

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    const navigate = useNavigate()
    
    useEffect(
        ()=> {
        fetch (`http://localhost:8088/vehicles?_expand=vehicleType&userId=${autoUserObject.id}`)
        .then(response => response.json())
        .then(
            (vehicleArray)=> {
                setVehicles(vehicleArray)
            }
        )
    },
    []
    )

    //this variable will get the info from API and go to the jsx in the function

    const getAllVehicles = () => {
            fetch (`http://localhost:8088/vehicles?_expand=vehicleType&userId=${autoUserObject.id}`)
            .then(response => response.json())
            .then(
                (vehicleArray)=> {
                    setVehicles(vehicleArray)
                }
            )
        }    
    
        //jsx should use a .map to iterate through the vehciles array to display all of the information for all the cars
        //there should be a delete button next to each car

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