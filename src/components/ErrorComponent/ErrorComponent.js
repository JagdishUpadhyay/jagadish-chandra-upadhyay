import React from "react";
import PropTypes from "prop-types";
import "../../assets/styles/error.scss";

/**
 * ErrorComponent to display error to user.
 * @param {object} props 
 */
export const ErrorComponent = (props) => {
    return (
        <div className="error">{props.errorMsg}</div>
    );
}

ErrorComponent.propTypes = {
    /**
     * error message to display to user.
     */
    errorMsg: PropTypes.string
}

ErrorComponent.defaultProps = {
    errorMsg: "Something went wrong. Please try again later."
}
