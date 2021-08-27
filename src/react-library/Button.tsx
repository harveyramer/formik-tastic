import React, {useState, useEffect} from 'react';

const AwesomeButton = (props:any) => {
    const [color, setColor] = useState<string>()
    useEffect(() => {
        if (props.variant) {
            if (props.variant === 'primary') {
                setColor('#0077ff')
            } else if (props.variant === 'secondary') {
                setColor('#ff0062')
            } else if (props.variant === 'success') {
                setColor('#0f8000')
            } else {
                setColor('#949393')
            }
        }
    })
    const {children} = props

    return (
        <button 
            className='buttonComponent'
            style={{
                backgroundColor: color
            }}
        >
            {children.toUpperCase()}
        </button>
    )
}

export default AwesomeButton;