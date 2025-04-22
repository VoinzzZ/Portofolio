import React from 'react'
import Note from '../../../public/assets/images/Note.png'

const Projects = () => {
    return (
        <>
            <section className='grid grid-cols-2 gap-5 justify-center items-start min-h-screen px-6 pt-32'>
                <div className='col-span-2'>
                    <h1 className='text-6xl text-white mb-0 font-bold'>Other Post</h1>
                </div>

                <div className='border border-gray-600 bg-black rounded-lg p-5 flex flex-col'>
                    <img src={Note} alt='projects' className='w-full h-100 rounded-lg object-cover' />
                    <a href='https://github.com/VoinzzZ/Note-App' target='_blank' rel='noopener noreferrer' className='text-4xl text-white mt-4 hover:underline'>Note App</a>
                    <p className='text-xl text-gray-500'>December 28, 2024</p>
                    <p className='text-xl text-white mt-4'>Web-based notes application, has a simple Auth and CRUD system</p>
                </div>

                <div className='border border-gray-600 bg-black rounded-lg p-5 flex flex-col'>
                    <img src={Note} alt='projects' className='w-full h-100 rounded-lg object-cover' />
                    <a href='https://github.com/yourusername/note-app' target='_blank' rel='noopener noreferrer' className='text-4xl text-white mt-4 hover:underline'>Note App</a>
                    <p className='text-xl text-gray-500'>December 28, 2024</p>
                    <p className='text-xl text-white mt-4'>Web-based notes application, has a simple Auth and CRUD system</p>
                </div>
            </section>
        </>
    )
}


export default Projects