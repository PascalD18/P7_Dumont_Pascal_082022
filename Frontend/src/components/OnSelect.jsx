import React from 'react'

const OnSelect = ({ children, handleClick }) => {
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

export default OnSelect