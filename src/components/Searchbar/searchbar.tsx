import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const Searchbar = () => {
  return (
    <div className='relative'>
      <Search size={18} className='absolute left-2 top-2 text-gray-500'/>
      <Input placeholder='Search Service' className='ps-8'/>
    </div>
  )
}

export default Searchbar