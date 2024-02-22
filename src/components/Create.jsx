import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Topbar from './Topbar';
import BlogCard from './common/BlogCard';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function create() {
  
  let navigate =  useNavigate()

  let [title, setTitle] = useState('')
  let [image, setImage] = useState('')
  let [description, setDescription] = useState('')

  let handleCreate = () => {
    try {
      let data = {title, image, description,status:false}
      let res = axios.post(API_URL,data)
      if (res.status === 201) {
        toast.success('Blog created successfully')
        navigate('/dashboard')
      }
    } catch (error) {
      
    }
  }

  return <>
    <div className='container-fluid'>
      <Topbar />
      <div className="homeWrapper">
      <div className="formWrapper">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="image url" onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder='Enter description' onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => handleCreate()}>
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

export default create