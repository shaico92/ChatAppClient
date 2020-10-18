import React from "react";
import Logout from '../../../Authentication/Logout/Logout'
import './UserMenu.css'
const UserMenu = ({open,askToLogoutUserMenu})=>{



    return (
        open?
        <div className="UserMenuContent">
            <Logout clicked={askToLogoutUserMenu}/>
            <div>Settings</div>
        </div>:null
    )


}


export default UserMenu;