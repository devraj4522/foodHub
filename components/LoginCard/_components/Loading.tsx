import React from 'react';
import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardBody } from "@nextui-org/card";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
const Loading: React.FC = () => {

  return (
    <Modal
      isOpen={true}
      isDismissable={false}
      closeButton={false}
      className="max-w-sm mx-auto relative rounded-lg p-4 md:p-6"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-8 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg mt-2">
            <div className="h-6 rounded-lg bg-default-200"></div>
          </Skeleton>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Skeleton className="w-full rounded-lg">
            <div className="h-12 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-12 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-10 rounded-lg bg-default-300"></div>
          </Skeleton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Loading;
