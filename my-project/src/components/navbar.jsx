import React from 'react'

function navbar() {
  return (
    <nav className='flex justify-between bg-violet-500 text-white px-4 py-2'>
        <h1 className='text-xl font-bold'>taskpedia</h1>
        <ul className='flex gap-4'>
            <li className='cursor-pointer hover:font-semibold'>Home</li>
            <li className='cursor-pointer hover:font-semibold'>Your tasks</li>
        </ul>
    </nav>
  )
}

export default navbar