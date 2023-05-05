import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { ProfileEdit } from "../profile/ProfileEdit"
import { AddVehicleForm } from "../vehicles/AddVehicleForm"
import { VehicleList } from "../vehicles/VehicleList"
import { AddStoreForm } from "../stores/AddStoreForm"
import { OwnerStoreList } from "../stores/OwnerStoreList"
import { StoreContainer } from "../stores/StoreContainer"
import { StorePage } from "../stores/StorePage"
import { StoreEdit } from "../stores/StoreEdit"
import { StoreReviews } from "../stores/StoreReviews"
import { ReviewEdit } from "../reviews/ReviewEdit"
import { UserReviews } from "../reviews/UserReviews"
import { ReviewEditFromProfile } from "../reviews/ReviewEditFromProfile"
import { FavoriteStoreList } from "../favoriteStores/FavoriteStoreList"
import { StoreResponse } from "../stores/StoreResponse"
import "./views.css"

export const StoreViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="header">Auto Shops Made Easy</h1>
                    <div className="subheader">Auto Shopping for Non-Car-Experts
                    </div>

                    <Outlet />
                </>
            }>
                <Route path="profile" element={ <Profile /> } />

                <Route path="profile/ProfileEdit" element={ <ProfileEdit />} />

                <Route path="vehicles/AddVehicleForm" element={ <AddVehicleForm />} />

                <Route path="vehicles/VehicleList" element={ <VehicleList />} />

                <Route path="stores/AddStoreForm" element={ <AddStoreForm />} />

                <Route path="stores/OwnerStoreList" element={ <OwnerStoreList />} />

                <Route path="stores/StoreContainer" element={ <StoreContainer />} />

                <Route path="stores/StorePage/:storeId" element={ <StorePage />} />

                <Route path ="stores/StoreEdit/:storeId" element={ <StoreEdit />} />

                <Route path="stores/StoreReviews/:storeId" element={ <StoreReviews /> } />

                <Route path="reviews/:storeId/:reviewId" element={ <ReviewEdit /> } />

                <Route path="reviews" element={ <UserReviews /> } />

                <Route path="reviews/user/:reviewId" element={ <ReviewEditFromProfile /> } />

                <Route path="FavoriteStores" element={ <FavoriteStoreList />} />

                <Route path="StoreResponse/:reviewId/:storeId" element={ <StoreResponse />} />

            


            </Route>
        </Routes>
    )
}