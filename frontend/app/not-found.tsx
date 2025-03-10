import React from 'react'
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
        <Image src={'/not-found-image.png'} alt={'404 not found'} width={600} height={600} />
        <p className='text-4xl font-serif'>404: Page not found</p>
    </div>
  )
}

export default NotFound
