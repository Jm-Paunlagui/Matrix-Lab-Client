import React from "react";

/**
 * @description Circular loading animation
 */
export const loading_animation = () => {
    return (
            <svg className="spinner mr-1" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="transparent"
                    strokeWidth="5"
                />
            </svg>

    );
}