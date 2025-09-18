import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(99,102,241,0.08);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 24px rgba(99,102,241,0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.2rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: #6366f1;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`;

function RecipeGrid({ recipes, onRecipeClick }) {
  return (
    <Grid>
      {recipes.map(recipe => (
        <Card key={recipe.id} onClick={() => onRecipeClick(recipe)}>
          <Image src={recipe.image} alt={recipe.name} />
          <CardContent>
            <Title>{recipe.name}</Title>
            <Description>{recipe.description}</Description>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

export default RecipeGrid;
