import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { UserProfileEdit } from "../profile/UserProfileEdit"

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

            </Route>
        </Routes>
    )
}