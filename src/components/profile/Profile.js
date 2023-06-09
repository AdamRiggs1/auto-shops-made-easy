import { UserProfile } from "./UserProfile"
import { StoreProfile } from "./StoreProfile"
import "./profile.css"

export const Profile = () => {

        const localAutoUser = localStorage.getItem("auto_user")
        const autoUserObject = JSON.parse(localAutoUser)
    
        if (autoUserObject.storeOwner) {
          return < StoreProfile />
        }
        else {
          return < UserProfile />
        }
    }