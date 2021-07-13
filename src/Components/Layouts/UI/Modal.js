import React from 'react'

import './Styles.css'
const Modal = (props) => {
    return (
        <div className="modal-main">
            <div className="modal-container">
                <div className="modal-header">
                    <i class="material-icons">close</i>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
