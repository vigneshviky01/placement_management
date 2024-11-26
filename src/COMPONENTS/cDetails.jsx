import React from 'react'

function cDetails(props) {
  return (

      <tr>
    
      <td>{props.Sno}</td>
      <td>{props.name}</td>
      <td>{props.criteria}</td>
      <td>{props.date}</td>
      <td className='operations'>
        <img src="/info.png" alt="" width={20} onClick={props.info}/>
        <img src="/edit.png" alt="" width={20} onClick={props.updatec}/>
        <img src="/delete.png" alt="" width={20}  onClick={props.deletec}/>
        </td>
      </tr>

     
 
  )
}

export default cDetails