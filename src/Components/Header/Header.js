import React from 'react'

const Header = ({ turns, onShuffle }) => {
    return (
        <>
            <h1 className='header_name'> test your memory </h1>
            <button onClick={onShuffle}> Start new Game here</button>
            <p className='header_turns'>turns: {turns}</p>
        </>
    );
};


export default Header;