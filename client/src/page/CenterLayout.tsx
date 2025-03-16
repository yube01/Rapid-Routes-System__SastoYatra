import { Outlet } from "react-router-dom";

const CenterLayout = () => {
    return (
        <div className="flex items-center justify-center">
            <div className=" p-2">
                <Outlet />
            </div>
        </div>
    );
};

export default CenterLayout;