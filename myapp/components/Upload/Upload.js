'use client'
import React, {useState} from 'react'
import UploadForm from '../Form/UploadForm/UploadForm'
import UploadCard from '../Card/UploadCard'

const Upload = () => {
    const [files, setFiles] = useState([])
  return (
    <div
    className='flex max-w-screen-xl flex-col mx-auto items-center justify-center text-black'
    >
        <UploadForm setFiles={setFiles} />
        <div className='flex gap-4'>
        {
          files.map((file, index) => (
            <UploadCard
              key={index}
              file={file}
              setFiles={setFiles}
              index={index}
            />
          ))
        }
        </div>
    
    </div>
  )
}

export default Upload