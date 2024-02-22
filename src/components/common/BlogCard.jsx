import React from 'react'
import Card from 'react-bootstrap/Card';


function BlogCard({ title, image, description }) {
  return <>   
    
      <Card style={{ width: '30rem', padding: '10px' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Img variant="bottom" src={image} alt={title} />
        <Card.Body>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    
  </>
}

export default BlogCard