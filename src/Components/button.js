import React from 'react'

export default function button (props) {
  return (
    <div>
      <button onClick = {props.clickFunction} style={{backgroundColor:props.bgColor, color:props.textColor}}>
      {props.text}
    </button>
    </div>
  )
}
