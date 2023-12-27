'use client'
import { validFiles } from '@/lib/validFiles';
import React, { useRef } from 'react'
import { FiUploadCloud } from 'react-icons/fi';
import Image from 'next/image';

const UploadForm = ({setFiles}) => {
    const formRef = useRef()

    const handleInputFiles = (files) => {
        if(!files.length) return;    
        [...files].map(file => {
          const result = validFiles(file);
          setFiles(prev => [...prev, result]);
        })
    
        formRef.current.reset();
      }
      const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer;
        handleInputFiles(data.files);
      }
  return (
    <form className='upload_form' ref={formRef}
    onDrop={handleDrop} onDragOver={e => e.preventDefault()}
  >
    <input type="file" id="upload" accept='.png, .jpg' multiple
    hidden onChange={e => handleInputFiles(e.target.files)} />

    <label htmlFor="upload" className='upload_form_label'>
      <FiUploadCloud src="/empty.png" alt='add' width={130} height={40}
      sizes='25vw' style={{width: 136, height: 96}} />

      <h5>
        Drag &amp; drop up to 5 images or
        <span>browse</span> to choose a file
      </h5>

      <small>JPEG, PNG only - Max 1MB</small>
    </label>
  </form>
  )
}

export default UploadForm