import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './RecepieIndex.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
export default function RecipeTile({recipes}) {
   
    const convertToInteger = (number) => {
        return parseInt(number,10);
    }
  return (
    <Row>
        {recipes.map((recipe,index) => {
            return(
                <Col md={{ span: 3 }} sm={{span: 3}}>
                    <Card className="mb-3">
                        <div key={index} >
                            <Card.Body>
                                <div className='recipeTile'>
                                    <div>
                                        <img src={recipe.recipe.image} className='recipe_image'/>
                                        <p className='mb-0 recipe_name'>{recipe.recipe.label}</p>
                                    </div>
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


