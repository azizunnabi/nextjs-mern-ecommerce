"use client"
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Router } from 'next/navigation'
import React, { useState } from 'react'
import all_products from '../all_products'
import { useRouter } from 'next/navigation'

const page =  () => {
    const {push}=useRouter()
    const [deleteConfirm, setDeleteConfirm]=useState(false)


    const query = useSearchParams()
    const id=query.get("id")
    
    const YesDelete = async ()=>{
        
        try {
        const response = await axios.delete(`http://localhost:5001/api/product/delete_product/${id}`);
        console.log(response.data); // Output success message
        onDelete(productId); // Remove the product from the UI
        if(response.status === 200){
            
        push('/dashboard/all_products')
        }
      } catch (error) {
        console.error(error);
      }

    }
    const NoDelete = () =>{
        
        push('/dashboard/all_products')
    }
  return (
    <div >
        
        <h2>Do you really want to Delete this product. Confirm please.</h2>
        <div className='w-6/12  border  flex mt-10 space-x-8'>
        <button onClick={YesDelete} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
  Yes
</button>
<button onClick={NoDelete} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-green-500 text-white-700 shadow-sm align-middle hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green focus:ring-green-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-white-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
  No
</button>
        </div>
    </div>
  )
}
export default page
