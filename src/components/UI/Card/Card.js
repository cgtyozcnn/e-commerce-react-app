import React from 'react'
import './Card.scss'
const Card = props =>(
    <div className={`Card ${props.classes}`}>
        {props.children}
    </div>
)

export default Card