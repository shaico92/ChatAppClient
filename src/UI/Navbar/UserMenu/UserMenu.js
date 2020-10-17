import React from "react";
import Logout from '../../../Authentication/Logout/Logout'
import './UserMenu.css'
const UserMenu = ({open,cookie})=>{



    return (
        open?
        <div className="UserMenuContent">
            <Logout />
            <p>Settings</p>
        </div>:null
    )


}


export default UserMenu;