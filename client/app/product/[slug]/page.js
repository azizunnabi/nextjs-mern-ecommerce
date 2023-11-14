
import CustomImage from '@/components/Global/CustomImage'
import Nav from '@/components/dashboard/Nav'
import axios from 'axios'
import formatter from 'currency-formatter'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'




const fetchDetails= async (slug)=>{
    try {
        
const {data}=await axios.get(`${process.env.NEXT_PUBLIC_API}/product/${slug}`)
console.log("Data",data)
return data
    } catch (error) {
        console.log("error",error)
        throw new Error('Details fetching failed')
        
    }
}

 const page = async (props) => {
  
    console.log(props);
   
    const details= await fetchDetails(props.params.slug);
    const percentage = details.discount / 100;
  const discountPrice = details.price - details.price * percentage;
    console.log("details",details)

    const addToCart = () =>{
     setCount(count+1)
     console.log(count)
    //  setCart(details)
    //  console.log(cart.title)
    }
  return (
    
    <div>
    <Nav />
    <div className='max-w-screen-xl mx-auto px-4 my-10  '>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
         <div className='w-full h-[250px] relative'>
            {/* {details.title} */}
<CustomImage url={details.image} fallback={'/fallback.png'} />
         </div>
         <div >
<h1 className='text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5'>
    {details.title}</h1> 
    <p className='text-body text-sm lg:text-base leading-6 lg:leading-8'>{details.description}</p>

    <div className='flex items-center space-x-2 mt-5'>
      <span className='text-2xl font-semibold text-gray-500 line-through'>{formatter.format(details.price,{code:"USD"})}</span>

      <span className='text-2xl font-semibold text-black'>{formatter.format(discountPrice,{code:"USD"})}</span>
    </div>

    <h3 className='text-base md:text-lg text-heading font-semibold mb-3 capitalize mt-5'>Size</h3>

    <ul className='flex flex-wrap colors ltr:-mr-3 rtl:-ml-3 space-x-7'>
    
    {/* {details.size.map(sizes =>(
         

          
    <li key ={sizes.id} className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black' >{details.size}</li>
    
      ))} */}

    <li  className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>Sm</li>

        <li  className='cursor-pointer rounded  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>xl</li>

        <li  className='cursor-pointer rounded   w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>lg</li>
        
       
</ul>

<h3 className='text-base md:text-lg text-heading font-semibold mb-3 capitalize mt-5'>Color</h3>

<div className='flex flex-wrap space-x-3'>
      {details.colors.map(color =>(
          <div key ={color.id}  className='w-[30px] h-[30px] rounded-full cursor-pointer p-3 ' style={{background:color.color}}>
  
          </div>
      ))}
      </div>

      <div className='flex flex-row mt-7 space-x-4'>
         <button className='cursor-pointer border rounded  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:bg-black hover:text-white hover:border-black border-black'><AddIcon /></button>
         <span className='
         font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-12  md:w-20 xl:w-24'>1</span>
         <button className='cursor-pointer hover:bg-black hover:text-white border rounded  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'><AddIcon /></button>
         
         <button className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-heading text-white py-2 transform-none normal-case bg-black hover:text-white hover:bg-gray-600 hover:shadow-cart cursor-not-allowed hover:cursor-not-allowed w-full md:w-6/12 xl:w-full bg-gray-400 hover:bg-gray-400' >Add to Cart</button>

         </div>


         </div>

         
        </div>

    </div>
    </div>
  )
}
export default page
