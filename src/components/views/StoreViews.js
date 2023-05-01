import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { ProfileEdit } from "../profile/ProfileEdit"
import { AddVehicleForm } from "../vehicles/AddVehicleForm"
import { VehicleList } from "../vehicles/VehicleList"
import { AddStoreForm } from "../stores/AddStoreForm"
import { OwnerStoreList } from "../stores/OwnerStoreList"
import { StoreList } from "../stores/StoreList"
import { StorePage } from "../stores/StorePage"
import { StoreEdit } from "../stores/StoreEdit"

export const StoreViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Auto Shops Made Easy</h1>
                    <div>Auto Shopping for Non-Car-Experts
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

                <Route path="stores/StoreList" element={ <StoreList />} />

                <Route path="stores/StorePage/:storeId" element={ <StorePage />} />

                <Route path ="stores/StoreEdit/:storeId" element={ <StoreEdit />} />


            </Route>
        </Routes>
    )
}