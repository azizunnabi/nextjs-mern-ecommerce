import React, { useEffect, useState } from 'react'
import Checkbox from '../forms/Checkbox'
import { TwitterPicker } from 'react-color'
import { v4 as uuidv4 } from 'uuid';
import { Colors } from '../Colors';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import { useMutation } from 'react-query';
import { errorsConversion } from '@/app/Utils';
import Input from '../forms/Input';
import { data } from 'autoprefixer';
import { Router } from 'next/router';
import { all_products } from './all_products';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export const CreateProduct = () => {
  const {push} = useRouter()
  const [state,setState]=useState({
    title:"",
    price: "",
    description:"",
    category:"",
    colors:[],
    image:"",
    discount: "",
    stock: ""
   })

   const [sizes, setSizes]=useState({
    sm:"",
    xs:"",
    md:"",
    lg:"",
    xl:""
  
  })
const [checked, setChecked]=useState({
  sm:false,
  xs:false,
  md:false,
  lg:false,
  xl:false,

})


      const CreateProduct = async (e) =>{
       
         e.preventDefault()
         
         mutate({...state,sizes:checked})
         if(mutate()){
          <div class="bg-green-500 text-sm text-white rounded-md p-4" role="alert">
  <span class="font-bold">Success</span> alert! You should check in on some of those fields below.
</div>
           push('/dashboard/all_products')
 
         }
           console.log(state)
         Router.push(all_products)
          
      
       
        // const response= await axios.post('http://localhost:5001/api/product/create_product', {...state});
        // console.log(response)
        // if(response){
        //   alert("data added")
        // }else{
        //   alert("Data not added")
        // }
        
      }
      //  const [size,setSize]=useState({
      //   esmall:false,
      //   small: false,
      //   medium: false,
      //   large:false,
      //   elarge:false,
      // })

       const [categories,setCategories]=useState([{
        id:1,
        name:"shoes",

    },
    {
        id:2,
        name:"cloths",

    },
    {
        id:3,
        name:"mobiles",

    }

])

const [errors,setErrors]=useState({})

const onChange=async (e)=>{
console.log(e)
setState({...state,[e.target.name]:e.target.value})
}

//checkbox
const checkBoxonChange=(e)=>{
  
  setChecked({...checked,[e.target.name]:e.target.checked})
 
  
}
console.log(checked)


const savecolors = (color)=>{
  const filtered = state.colors.filter((clr) => clr.color !==color.hex);
  setState({...state,colors:[...filtered, {color:color.hex, id:uuidv4()}]})
}

const deleteColor = color =>{
  const filtered=state.colors.filter(clr => clr.color !== color.color);
  setState({...state, colors:filtered})
}


const handleChange = async (img) => {
  const file = new FormData();
  file.append("file", img);
  file.append("upload_preset", "lptffysq");
  file.append("cloud_name", "dor9xjdhd");
 





    const {data}= await axios.post("https://api.cloudinary.com/v1_1/dor9xjdhd/image/upload",
    file);
    
    setState({...state, image:data.secure_url});
   
};

// const { error, isError, isSuccess, isLoading, mutate} = useMutation(data => {
//   console.log(data)
//   return axios.post('http://localhost:5001/api/product/create_product', data)
// })

const { error, isError, isSuccess, isLoading, mutate,data} = useMutation(data => {
  
  return axios.post('http://localhost:5001/api/product/create_product', data)
  
})

console.log(state)

// console.log(error)

useEffect(() => {
  console.log(error)
  if(isError) {
      if(error?.response?.status === 400 ) {
         //console.log(error)
         const response = errorsConversion(error?.response?.data?.error);
          setErrors(response);
            }
  }
  if(isSuccess){
    toast.success("Product Added Successfully")
    push('/dashboard/all_products')
  }
}, [isError,isSuccess])
console.log(errors)

//console.log(state)
  return (
    
    <div>
      <h3>Create Product</h3>
     
      <form>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
      
      <Input type="text" error={errors.title} placeholder="product name" name="title"
       value={state.title} onChange={onChange} className='border' />
      
      <Input type="number" error={errors.price}  className='border'  placeholder="product price" name="price" value={state.price} onChange={onChange} />
      
     <textarea className
     =" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder ="Product Description" name="description" value={state.description} onChange={onChange} error={errors.description} rows="3"></textarea>


      <select  name="category" className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"  value={state.category} onChange={onChange}>
  <option >Select category</option>
  {categories.map(category=>{
    return (<option key={category.id} className='capitalize' value={category.name}>{category.name}</option>)
  })}
     </select>

     <label htmlFor="file-input" className="sr-only">Select Colors</label>
    <TwitterPicker onChangeComplete={savecolors} />

    <div className='w-full xl:w-6/12 p-3'>
      <Colors colors={state.colors} deleteColor={deleteColor} />
    </div>
     

    <FileUploader 
    handleChange={handleChange}
    name="file"
    types={["jpg", "jpeg", "png"]}
    />

<Input type="number" className='border h-[30px]'  placeholder="Discount" name="discount" value={state.discount} error={errors.discount} onChange={onChange} />
<Input type="number" className='border'  placeholder="Stock Available" name="stock" value={state.stock} error={errors.stock}  onChange={onChange} />
     


<Checkbox checked={checked} checkBoxonChange={checkBoxonChange}/>

  
  </div>
  <button  className='py-3 px-4 mt-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800' onClick={CreateProduct} >Add Product</button>
  </form>
    </div>
  )
}
