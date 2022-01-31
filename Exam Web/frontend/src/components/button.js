import React from 'react';

const Button = ({color, textColor, text, onClick}) => {
    return(
        <button style = {{backgroundColor: color, color: textColor}} onClick={onClick} className ='button'>{text}</button>
    )
}

export default Button;