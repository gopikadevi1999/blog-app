import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Topbar from './Topbar';
import BlogCard from './common/BlogCard';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {

  let {id} = useParams()
  
  let navigate =  useNavigate()
i
  let [title, setTitle] = useState('')
  let [image, setImage] = useState('')
  let [description, setDescription] = useState('')

  let handleEdit = () => {
    try {
      let data = {title, image, description,status:false}
      let res = axios.put(`${API_URL}/${id}`,data)
      if (res.status === 200) {
        toast.success('Blog edited successfully')
        navigate('/dashboard')
      }
    } catch (error) {
      
    }
  }

  let getBlogById = async () => {
    try {
      let res = await axios.get(`${API_URL}/${id}`)
      if (res.status === 200) {
        setTitle(res.data.title)
        setImage(res.data.image)
        setDescription(res.data.description)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getBlogById()
  })

  return <>
    <div className='container-fluid'>
      <Topbar />
      <div className="homeWrapper">
      <div className="formWrapper">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="image url" value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => handleEdit()} >
            Submit
          </Button>
        </Form>
      </div>
      <br />
      <div className="previewWrapper" >
        <h2>preview</h2>
        <BlogCard title={title} image={image} description={description} />
      </div>
    </div>
   </div>
  </>
}

export default Edit