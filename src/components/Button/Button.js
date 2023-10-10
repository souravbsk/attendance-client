import React from 'react';

const Button = ({text,handleButton,isBtnDisable}) => {
    return (
        <button disabled={isBtnDisable} onClick={handleButton} className='btn bg-[#0D64A5] text-white rounded-full'>
            {text}
        </button>
    );
};

export default Button;