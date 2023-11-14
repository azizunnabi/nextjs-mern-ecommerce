"use client"
// import React from 'react'
// import Checkbox from '../forms/Checkbox'
import { TwitterPicker } from 'react-color'
import { v4 as uuidv4 } from 'uuid';
// import { Colors } from '../components/Colors';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import { useMutation } from 'react-query';
import { errorsConversion } from '@/app/Utils';
import { Colors } from '@/components/Colors';



import { useEffect, useState } from 'react';
import {  useSearchParams ,useRouter} from 'next/navigation';
import { Img } from 'react-image';
// import Input from '@/components/forms/Input';
import Checkbox from '@/components/forms/Checkbox';
import { Router } from 'next/router';
import Input from '@/components/forms/Input';



 const page = () => {
    
  const query= useSearchParams()
  const {push}=useRouter()
  // const {id} = router.query
  const id =query.get("id")
  
  const [updateProduct,setupdateProduct]=useState({
    slug:"",
    title:"",
    price: "",
    description:"",
    quantities:"",
    category:"",
    colors:[],
    image:"",
    discount: "",
    stock: ""
   })

   const [size,setSize]=useState({
    esmall:false,
    small: false,
    medium: false,
    large:false,
    elarge:false,
  })

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setupdateProduct({ ...updateProduct, [name]: value });
  };

   
    
    useEffect(()=>{
//axios.get(`http://localhost:5001/api/product/get_product/${id}`)
axios.get(`http://localhost:5001/api/product/get_product/${id}`)
.then((response) => {
  const data=response.data
  //  console.log(data.singleProduct.title);
  
   setupdateProduct({
    slug:data.singleProduct.slug,
    title:data.singleProduct.title,
    price:data.singleProduct.price,
    description:data.singleProduct.description,
    quantities:data.singleProduct.quantities,
    category:data.singleProduct.category,
    colors:data.singleProduct.colors,
    image:data.singleProduct.image,
    discount:data.singleProduct.discount,
    stock:data.singleProduct.stock
  })
   
   
   
  }).catch((error) => {
   
    alert('An error happened. Please Chack console');
    console.log(error);
  });
    },[])
        
    
//checkbox
const checkBoxonChange=(e)=>{
  
  setSize({...size,[e.target.name]:e.target.checked})
 
  
}
console.log(size)

    // const savecolors = (color)=>{
    //   const filtered = updateProduct.colors.filter((clr) => clr.color !==color.hex);
    //   setupdateProduct({...updateProduct,colors:[...filtered, {color:color.hex, id:uuidv4()}]})
    // }

    const savecolors = (color) => {
      if (!Array.isArray(updateProduct.colors)) {
        // If updateProduct.colors is not an array or undefined, initialize it as an empty array
        setupdateProduct({ ...updateProduct, colors: [{ color: color.hex, id: uuidv4() }] });
      } else {
        // Filter the array and update it
        const filtered = updateProduct.colors.filter((clr) => clr.color !== color.hex);
        setupdateProduct({ ...updateProduct, colors: [...filtered, { color: color.hex, id: uuidv4() }] });
      }
    }
    
    const deleteColor = color =>{
      const filtered=updateProduct.colors.filter(clr => clr.color !== color.color);
      setupdateProduct({...updateProduct, colors:filtered})
    }
    const handleChange = async (img) => {
      const file = new FormData();
      file.append("file", img);
      file.append("upload_preset", "lptffysq");
      file.append("cloud_name", "dor9xjdhd");
    
    
      const {data}= await axios.post("https://api.cloudinary.com/v1_1/dor9xjdhd/image/upload",
      file);
        
        setupdateProduct({...updateProduct, image:data.secure_url});
       
    };
  
          // const updateproduct= (e) => {
          //  alert("yes")
          //   const data = {
          //    title,
          //     price,
          //     description,
          //     // quantities,
          //     category,
          //     discount,
          //     stock
          //   };
          //   alert(data.title)
          //   e.preventDefault();
           
          //  axios.put('http://localhost:5001/api/product/update_product/${id}',data).then((response)=>{
          //   console.log('Product updated successfully:', response.data);
            
          //  // navigate('/')
          // })
          // .catch((error)=>{
           
          //   console.log('Something wrong. Data not updated');
          //   console.log(error)
          // }) 
          //   // You can access the form data as an object within formData state.
            
          // };

          const updateproduct = async (e) => {
            e.preventDefault(); // Fixed the typo here
          
            try {
              const response = await axios.put(`http://localhost:5001/api/product/update_product/${id}`, updateProduct); // Removed the spread operator {...}
              console.log(response);
              if (response.status === 200) {
                console.log("Data updated sucessfully");
                push('/dashboard/all_products');
              } else {
                console.log("Data not updated");
              }
              
            } catch (error) {
              console.error('Error updating product', error);
            }
          };
  return (
    <div>
      <h3>UpdateProduct</h3>
      
      <form>
       
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
      
      
<div className='flex flex-col'>
<label for="Title">Title{updateProduct.title}</label>

<input type="text" error={errors.title} placeholder="product name" name="title" value={updateProduct.title} onChange={onChange} className='border' />
      </div>
      
<div className='flex flex-col'>
<label for="price">Price</label>
      <input type="text" error={errors.price} id="price" className='border'  placeholder="product price" name="price" value={updateProduct.price} onChange={onChange} />
      </div>
      
      <div className='flex flex-col'>
      <label for="description">Description</label>
     <textarea className=" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"  id="description" placeholder ="Product Description" name="description" value={updateProduct.description} onChange={onChange} rows="3"></textarea>
     </div>

      <select  name="category" className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={categories} onChange={onChange}>
  <option >Select category</option>
  {categories.map(category=>{
    return (<option key={category.id} className='capitalize' value={category.name}>{category.name}</option>)
  })}
     </select>
      
      
<div className='flex flex-col'>
     <label for="color" className="sr-only">Select Colors</label>
    <TwitterPicker id="color" onChangeComplete={savecolors} />
</div>


    

    <div className='w-full xl:w-6/12 p-3' id="color">
      <Colors colors={updateProduct.colors} deleteColor={deleteColor} />
    </div>
    

   <div className=''>
    <Img 
      src={updateProduct.image}
      loader={"Loading"}
      className="w-full h-[200px] object-cover"
    />
    <FileUploader 
    handleChange={handleChange}
    name="file"
    types={["jpg", "jpeg", "png"]}
    />
</div>
<div className='flex flex-col'>
<label for="discount">Discount</label>
<input type="text" id="discount" className='border h-[30px]'  placeholder="Discount" name="discount" value={updateProduct.discount} onChange={onChange} />
</div>
<div className='flex flex-col'>
<label for="stock">Stock available</label>
<input type="text" id="stock" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500  border focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Stock Available" name="stock" value={updateProduct.stock} onChange={onChange} />
</div>

<div className='flex flex-col'>
<label for="size">Size</label>
  <Checkbox size={size} id="sizes" checkBoxonChange={checkBoxonChange}/>
</div>
  
  </div>
  <button  className='bg-rose-300' onClick={updateproduct} >Add Product</button>
  </form>

  
    </div>
  )
}
export default page