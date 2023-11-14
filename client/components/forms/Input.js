import React from 'react'

 const Input = ({type,placeholder,error,name,onChange,value}) => {
  return (
    <div>
    <input onChange ={onChange} type={type} name={name} value={value} class="py-3 px-4  block w-full border-gray-200 rounded-md text-sm focus:border-blue-500  border focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder={placeholder}  />
    {error  && <span className='text-rose-600'>{error}</span> }
    </div>
  
  )
}
export default Input