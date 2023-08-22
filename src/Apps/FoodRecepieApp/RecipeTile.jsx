import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './RecepieIndex.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';
export default function RecipeTile({recipes}) {
    const [isImageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true)
    };
    
    const convertToInteger = (number) => {
        return parseInt(number,10);
    }
  return (
    <Row>
        {recipes.map((recipe,index) => {
            return(
                <Col md={{ span: 3 }} sm={{span: 3}} key={index}>
                    <Card className="mb-3">
                        <div>
                            <Card.Body>
                                <div className='recipeTile'>
                                    <div className='img-parent'>
                                        {isImageLoaded ? null : (
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                        <img 
                                            src={recipe.recipe.image} 
                                            alt="An example image"
                                            className={`recipe_image ${isImageLoaded ? 'block' : 'none'}`}  
                                            onLoad = {handleImageLoad}
                                        />
                                    </div>
                                        <p className='mb-2 recipe_name'>{recipe.recipe.label}</p>
                                    <div className='data'>
                                        <span className='info'>{convertToInteger(recipe.recipe.calories)} CALORIES</span>
                                        <span className='info2'>{recipe.recipe.ingredients.length} INGREDIENTS</span>
                                    </div>
                                    <div className='source'>
                                        <span>{recipe.recipe.source}</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
            );
        })}
    </Row>
  )
}


