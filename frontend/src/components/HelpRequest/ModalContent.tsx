import Modal from "react-modal";

const ModalContent = ({ isOpen, onRequestClose, modalText }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div>
          <h2>Участие в сборе средств и вещей</h2>
          <p>{modalText}</p>
          <button onClick={onRequestClose}>Закрыть</button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalContent;
