import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import axios from 'axios'
import { API_URL } from '../App'
import { toast } from 'react-toastify'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  
  let navigate = useNavigate()

  let [blogs, setBlogs] = useState([])

  let deleteBlog = async (id) => {
    try {
      let res = await axios.delete(`${API_URL}/${id}`)
      if (res.status === 200) {
        toast.success('blog deleted successfully')
        getBlogs()
      }
    } catch (error) {
      toast.error(error)
    }
  }


  let toggleBlog = async (e) => {
    try {
      e.status = !e.status
      let res = await axios.put(`${API_URL}/${e.id}`,e)
      if (res.status === 200) {
        toast.success('blog status changed')
        getBlogs()
      }
    } catch (error) {
      toast.error(error)
    }
  }

  let getBlogs = async () => {
    try {
      let res = await axios.get(API_URL)
      if (res.status === 200) {
        toast.success('blogs fetched successfully')
        setBlogs(res.data)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getBlogs()
  },[])


  return <>
    <div className="container-fluid">
      <Topbar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            blogs.map((e, i) => {
              return <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ width: "250px" }}>{e.title}</td>
                <td>
                  <img src={e.image} alt={e.title} style={{ width: '100px' }} />
                </td>
                <td>
                  <div style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.description}</div>
                </td>
                <td>
                  <label className="switch">
                    <input type="checkbox" defaultChecked={e.status} onChange={() => toggleBlog(e)} />
                      <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <Button variant='info' onClick={() => navigate(`/edit/${e.id}`)}>Edit</Button>
                  &nbsp;
                  <Button variant='danger' onClick={() => deleteBlog(e.id)}>Delete</Button>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  </>
}

export default Dashboard