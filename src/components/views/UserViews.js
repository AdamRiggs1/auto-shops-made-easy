import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { UserProfileEdit } from "../profile/UserProfileEdit"
import { AddVehicleForm } from "../vehicles/AddVehicleForm"
import { VehicleList } from "../vehicles/VehicleList"

export const UserViews = () => {
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

                <Route path="profile/UserProfileEdit" element={ <UserProfileEdit />} />

                <Route path="vehicles/AddVehicleForm" element={ <AddVehicleForm />} />

                <Route path="vehicles/VehicleList" element={ <VehicleList />} />

            </Route>
        </Routes>
    )
}