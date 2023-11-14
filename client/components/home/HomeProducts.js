"use client"
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import CustomImage from '../Global/CustomImage'
import { useParams, useSearchParams,useRouter } from 'next/navigation'
import { Pagination } from '@mui/material'
import formatter from 'currency-formatter'
import Link from 'next/link'


export const HomeProducts = () => {
  const params= useSearchParams()
  let page= params.get("page")
  page = !page || Number(page)<=0 ? 1 : page
    const [products, setProducts]=React.useState([])
    const [count, setCount]=React.useState(0)
    console.log(count)
    const totalLinks = Math.ceil(count/8);
    console.log(totalLinks)
    const getproducts=async()=>{
    
      const {data}= await axios.get(`${process.env.NEXT_PUBLIC_API}/product/home_products/${page}`)
      return data
    }
    const {data, isError, isFetching} = useQuery(["products",page], getproducts)

    const { push } = useRouter();
  function handlePaginationChange(e, value) {
    push(
      `/?page=${Number(value)}`,
      undefined,
      {
        shallow: true,
      }
    );
  }
    React.useEffect(() => {
      console.log(data)
  if(!isError && !isFetching) {
  setProducts(data.products)
  setCount(data.total)
  }
    },[data, isError, isFetching,page])
    console.log(products)
  return (
    <div className='max-w-[1200px] w-full mx-auto mt-20'>
        <div  className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>{
        isFetching ? "loading" : products?.length > 0 && products?.map((product)=>{
          const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
            return (
                <Link href={`/product/${product?.slug}`} key={product._id} className="flex flex-col bg-white p-5 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
  <div className='w-full h-[200px] relative'>
    <span className='absolute top-1 right-4 flex items-center justify-center w-9 h-9 bg-blue-600 text-white rounded-full text-sm font-medium'>{product.discount}%</span>
      <CustomImage url={product.image} fallback={'/fallback.png'}/></div>
  <div className="p-4 md:p-5">
    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
      {product.title}
    </h3>
    <div className='flex items-center space-x-2'>
      <span className='text-lg font-semibold text-gray-500 line-through'>{formatter.format(product.price,{code:"USD"})}</span>

      <span className='text-lg font-semibold text-black'>{formatter.format(discountPrice,{code:"USD"})}</span>
    </div>

  </div>
</Link>
            )
        })
    }</div>
    {products?.length !==0 &&  <Pagination
        count={totalLinks}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        shape="rounded"
        className="mt-3"
        onChange={handlePaginationChange}
      /> }
   
    </div>
    
  )
}
