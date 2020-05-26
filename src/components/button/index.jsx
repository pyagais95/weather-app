import React from 'react'
import Button from 'react-bootstrap/Button'

export const ButtonComponent = (props) => {
  const {type, name, onClick, className} = props
  return (
    <div>
      <Button
        type={type}
        onClick={onClick}
        className={className}
      >
        {name}
      </Button>
    </div>
  )
}
export default ButtonComponent