import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const EditOrderModal = ({ isOpen, onClose, order, onEditOrder }) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm();
  const toast = useToast();

  useEffect(() => {
    if (order) {
      reset(order);
    }
  }, [order, reset]);

  const onSubmit = (values) => {
    // Mock API call
    onEditOrder(values);
    toast({
      title: "Order updated.",
      description: "The order has been updated successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.customer_name}>
              <FormLabel>Customer Name</FormLabel>
              <Input
                placeholder="Customer Name"
                {...register('customer_name', { required: true })}
              />
              {errors.customer_name && <span>This field is required</span>}
            </FormControl>
            <FormControl isInvalid={errors.price} mt={4}>
              <FormLabel>Price (₹)</FormLabel>
              <Input
                placeholder="Price"
                type="number"
                {...register('price', { required: true })}
              />
              {errors.price && <span>This field is required</span>}
            </FormControl>
            <FormControl isInvalid={errors.invoice_date} mt={4}>
              <FormLabel>Invoice Date</FormLabel>
              <Input
                type="date"
                {...register('invoice_date', { required: true })}
              />
              {errors.invoice_date && <span>This field is required</span>}
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
