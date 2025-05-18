import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import MyBlogs from './components/MyBlogs'
import Home from './components/Home'
import AddBlog from './components/AddBlog'
import EditBlog from './components/EditBlog'
import NavBar from './components/Navbar'
import { AppContext } from './context/AppContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import ViewBlog from './components/ViewBlog'

const App = () => {

  const { loggedIn } = useContext(AppContext);

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-15 min-h-screen'>
      <ToastContainer position='top-right'/>
      {loggedIn && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/blogs' element={<Home />}/>
        <Route path='/myblogs' element={<MyBlogs />}/>
        <Route path='/add' element={<AddBlog />}/>
        <Route path='/edit/:id' element={<EditBlog />} />
        <Route path='/viewblog' element={<ViewBlog />} />
      </Routes>
    </div>
  )
}

export default App