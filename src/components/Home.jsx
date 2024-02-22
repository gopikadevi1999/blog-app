import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import axios from 'axios'
import { API_URL } from '../App'
import { toast } from 'react-toastify'
import BlogCard from './common/BlogCard'

function Home() {

  let [blogs, setBlogs] = useState([])

  let getBlogs = async () => {
    try {
      let res = await axios.get(API_URL)
      if (res.status === 200) {
        toast.success('blogs fetched successfully')
        setBlogs(res.data.filter((e) => e.status))
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])
  
  return <>
  <Topbar />
  <div className="previewWrapper">
    {
      blogs.map((e) =>{
        return <BlogCard title={e.title} image={e.image} description={e.description} key={e.id} />
      })
    }
  </div>
  </>
}

export default Home