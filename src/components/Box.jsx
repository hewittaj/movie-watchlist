/* eslint-disable react/prop-types */
import { useState } from 'react'

function Box(props) {
    const { children } = props
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className='box'>
            <button
                className='btn-toggle'
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? '–' : '+'}
            </button>
            {isOpen && children}
        </div>
    )
}

export default Box
