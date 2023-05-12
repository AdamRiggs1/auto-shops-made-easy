import "./StoreList.css"

export const StoreSearch = ({ setterFunction }) => {
    return (
        <div>
            <input 
            className="store_search_bar"
            onChange={
                (changeEvent)=> {
                  setterFunction(changeEvent.target.value)  
                }
            }
            type="text" placeholder="Enter search terms"/>
        </div>
    )
}