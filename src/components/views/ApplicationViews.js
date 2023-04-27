import { StoreViews } from "./StoreViews.js"
import { UserViews } from "./UserViews.js"

export const ApplicationViews = () => {

    const localAutoUser = localStorage.getItem("auto_user")
    const autoUserObject = JSON.parse(localAutoUser)

    if (autoUserObject.storeOwner) {
        //return employee views
        return <StoreViews />
    }
    else {
        //return customer views
        return <UserViews />
    }
}