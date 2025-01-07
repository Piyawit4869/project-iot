import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import * as Icon from '@ant-design/icons';

export const ModalVerify = ({
  title,
  content,
  isOpen,
  onClose,
  modalFooter,
  label,
  onClick,
  CancelButton,
  ConfirmButton,
  type,
  form,
}: any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                <Icon.ExclamationOutlined color="accent2" />
                {title}
              </ModalHeader>
              <ModalBody>
                <p>{content}</p>
              </ModalBody>
              <ModalFooter>
                {CancelButton && (
                  <Button
                    className="bg-accent2 text-white"
                    variant="light"
                    onPress={CancelButton.onClick}
                  >
                    {CancelButton.label}
                  </Button>
                )}
                {ConfirmButton && (
                  <Button
                    className="bg-accent1 text-white"
                    type={ConfirmButton.type}
                    form={ConfirmButton.form}
                    variant="light"
                    onPress={ConfirmButton.onClick}
                  >
                    {ConfirmButton.label}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
