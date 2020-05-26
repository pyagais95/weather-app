import React from 'react'

const InputComponent = (props) => {
  const {value, placeholder, onChange} = props
  return (
    <div >
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default InputComponent