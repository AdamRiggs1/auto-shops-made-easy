import { Outlet, Route, Routes } from "react-router-dom"

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

            </Route>
        </Routes>
    )
}