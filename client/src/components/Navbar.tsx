import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className='bg-blue-500'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="h-8 w-8 text-white font-bold text-xl">Facepedia</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex">
              <a href="#" className='text-white hover:bg-blue-300 px-3 py-2 rounded-md'>Home</a>
              <a href="#" className='text-white hover:bg-blue-300 px-3 py-2 rounded-md'>Profile</a>
              <a href="#" className='text-white hover:bg-blue-300 px-3 py-2 rounded-md'>Friends</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
