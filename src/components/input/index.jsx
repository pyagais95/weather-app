import React from 'react'

const InputComponent = (props) => {
  const {type,value, placeholder, onChange, className} = props
  return (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
  )
}

export default InputComponent