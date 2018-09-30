import React from "react";
import PropTypes from "prop-types";
import "../../assets/styles/pearsonusercomponent.scss";

/**
 * PearsonUserComponent to display avatar, name of Pearson user.
 * @param {object} props 
 */
export const PearsonUserComponent = (props) => {
    const { avatar, first_name, last_name, onDeleteUser } = props;
    return (
        <div className="person-container">
            <img src={ avatar } alt={first_name} />
            <div className="user-content">
                <span>{ first_name } { last_name }</span>
                <button onClick={ onDeleteUser }>Delete</button>
            </div>
        </div>
    );
}

PearsonUserComponent.propTypes = {
    /**
     * Pearson user avatar url
     */
    avatar: PropTypes.string.isRequired,

    /**
     * Pearson user first name
     */
    first_name: PropTypes.string.isRequired,

    /**
     * Pearson user last name
     */
    last_name: PropTypes.string,

    /**
     * method to be invoked once clicked on the delete button
     */
    onDeleteUser: PropTypes.func
}
