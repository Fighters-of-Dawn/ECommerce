import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Buttons/Buttons';
import CloseIcon from '@material-ui/icons/Close';
import { AnimatePresence, motion } from 'framer-motion';

import './Modal.css';

const Modal = (props) => {
  const closeIcon = <CloseIcon />;
  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className='modal'>
        <motion.div animate={{ y: 430 }} className='modal__container'>
          <div className='modal__imageContainer'>
            <img className='modal__image' src={props.image} alt='product' />
          </div>
          <div className='modal__info'>
            <div className='modal__title'>{props.name}</div>
            <div className='modal__price'>Price: ${props.price}</div>
            <div className='modal__description'>
              <div className='modal__descriptionTitle'>Description</div>
              <div className='modal__descriptionText'>{props.description}</div>
            </div>
            <div className='modal__buttons'>
              <Button
                icon={closeIcon}
                onClick={props.setIsOpen}
                type='danger'
                message='Close'
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;
