import React from 'react'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'


import './Styles.scss'
const Navbar = (props) => {

    const user = useSelector((state) => state.user);

    const role = user.role
    const comfirm_role = 'contributor'

    const onclickUpgradeHandler = () => {
        props.history.push("./role");
      };

      let upgrade_button;

      if( JSON.stringify(role) !== JSON.stringify(comfirm_role) ){
        upgrade_button = <button onClick={onclickUpgradeHandler}>Upgrade Role</button>
      }

    return (
        <div className="nav-bar">
            <div className="nav-container">
                <h3>PELARD-N</h3>
                <div className="profile">
                <h3> Your Welcome</h3>
                <h3>{user.userName}</h3>
                {upgrade_button}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
