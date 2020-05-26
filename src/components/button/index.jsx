import React from 'react'
import Button from 'react-bootstrap/Button'

export const ButtonComponent = (props) => {
  const {name, onClick} = props
  return (
    <div>
      <Button
        variant="primary"
        onClick={onClick}
      >
        {name}
      </Button>
    </div>
  )
}
export default ButtonComponent