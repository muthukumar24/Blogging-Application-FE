import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {

  const { userBlogs, getUserBlogs, deleteBlog } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUserBlogs();
  }, [])

  // Delete a Blog
  const handleDelete = async (blogId) => {
    await deleteBlog(blogId);
    getUserBlogs();
  }

  return (
    <div className='py-6 mx-auto'>
      <h2 className='text-center text-2xl font-semibold mb-5'>My Blogs</h2>
      {
        userBlogs.length === 0 ? (
          <p className='text-gray-500'>No Blogs Found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> 
            {
              userBlogs.map((item) => (
                <div key={item._id} className='bg-white rounded-2xl 
                shadow-2xl overflow-hidden flex flex-col'>
                  <img src={item.image} alt={item.title} 
                  className='w-full h-48 object-fit'/>
                  <div className='p-4 flex-1 flex flex-col justify-between'>
                    <div>
                      <h5>{item.title}</h5>
                      <p className='text-sm text-gray-600 mb-2'>
                        <span className='font-medium'>Author: </span> {item.author}<br />
                        <span className='font-medium'>Category: </span> {item.category}
                      </p>
                      <p className='text-gray-700 mb-4'>{item.content.slice(0, 100)}...</p>
                    </div>

                    <div className='flex justify-end gap-3'>
                      <button className='bg-cyan-800 text-white px-5 py-2 rounded cursor-pointer hover:bg-cyan-900'
                      onClick={() => navigate(`/edit/${item._id}`, { state: { blog: item }})}>
                        Edit
                      </button>
                      <button className='bg-red-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-red-800'
                      onClick={() => handleDelete(item._id)}>
                        Delete 
                      </button>
                    </div>

                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default MyBlogs