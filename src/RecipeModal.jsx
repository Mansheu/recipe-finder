import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(99,102,241,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 400px;
  width: 90vw;
  box-shadow: 0 8px 32px rgba(99,102,241,0.18);
  overflow: hidden;
  animation: fadeIn 0.2s;
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95);}
    to { opacity: 1; transform: scale(1);}
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #6366f1;
`;

const ModalDesc = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 28px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99,102,241,0.12);
`;

function RecipeModal({ recipe, onClose }) {
  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
        <ModalImage src={recipe.image} alt={recipe.name} />
        <ModalContent>
          <ModalTitle>{recipe.name}</ModalTitle>
          <ModalDesc>{recipe.description}</ModalDesc>
        </ModalContent>
      </Modal>
    </Overlay>
  );
}

export default RecipeModal;
