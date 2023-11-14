import { Skeleton } from '@mui/material'
import React from 'react'

 const TableSkeleton = () => {
  return (
    <div>
        <Skeleton className='w-full' variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton className='w-full mt-1' variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton className='w-full mt-1' variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton className='w-full mt-1' variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton className='w-full mt-1' variant="text" sx={{ fontSize: '1rem' }} />
    </div>
  )
}
export default TableSkeleton