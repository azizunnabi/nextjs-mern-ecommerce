import React from 'react'

export const Colors = ({colors,deleteColor}) =>{
    return (
  <div>{colors.length > 0 && <h1>Your choosen colors list</h1>}
  {colors.length > 0 && <div className='flex flex-wrap'>
      {colors.map(color =>(
          <div key ={color.id} onClick={()=>deleteColor(color)} className='w-[30px] h-[30px] rounded-full cursor-pointer p-3 ' style={{background:color.color}}>
  
          </div>
      ))}
      </div>}
  </div>
    )}
