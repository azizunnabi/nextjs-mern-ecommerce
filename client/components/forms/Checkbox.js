"use client"

 const Checkbox = ({checked,checkBoxonChange}) => {
  
  

  return (
    <div>
         <div className="flex gap-x-6">
            
  <div className="flex">
    <input type="checkbox"  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-4" name="sm" onChange={checkBoxonChange} value={checked?.sm} />
    <label htmlFor="hs-checkbox-group-4" className="text-sm text-gray-500 ml-3 dark:text-gray-400" >Extra small</label>
  </div>

  <div className="flex">
    <input type="checkbox"  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-4" name="xs" onChange={checkBoxonChange} value={checked?.xs}/>
    <label htmlFor="hs-checkbox-group-4" className="text-sm text-gray-500 ml-3 dark:text-gray-400" >small</label>
  </div>

  <div className="flex">
    <input type="checkbox"  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-5" name="md" onChange={checkBoxonChange} value={checked?.md}/>
    <label htmlFor="hs-checkbox-group-5" className="text-sm text-gray-500 ml-3 dark:text-gray-400" >Medium</label>
  </div>

  <div className="flex">
    <input type="checkbox"  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-6" name="lg" onChange={checkBoxonChange} value={checked?.lg}/>
    <label htmlFor="hs-checkbox-group-6" className="text-sm text-gray-500 ml-3 dark:text-gray-400" >Large</label>
  </div>

  <div className="flex">
    <input type="checkbox"  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-6" name="xl" onChange={checkBoxonChange} value={checked?.xl}/>
    <label htmlFor="hs-checkbox-group-6" className="text-sm text-gray-500 ml-3 dark:text-gray-400" >Extra Large</label>
  </div>
</div>
<h3>dddd</h3>

    </div>
  )
}
export default Checkbox