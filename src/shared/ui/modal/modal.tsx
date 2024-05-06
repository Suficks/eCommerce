import React, { ReactNode } from 'react';

import './modal.scss';

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  return <div className="modal-wrapper">{children}</div>;
}

export default Modal;
