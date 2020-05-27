import React from 'react'

const InputComponent = (props) => {
  const {type,value, placeholder, onChange, className, min, max, id, onInput} = props
  return (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        min={min}
        max={max}
        onInput={onInput}
        id={id}
      />
  )
}

export default InputComponent