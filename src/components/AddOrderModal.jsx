import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/react';

const AddOrderModal = ({ onAddOrder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newOrder = {
      id: Math.floor(Math.random() * 10000),
      customer_id: data.customer_id,
      customer_profile: {
        id: data.customer_id,
        name: data.customer_name,
        color: [182, 73, 99],
        email: "",
        pincode: "",
        location_name: "",
        type: "C",
        profile_pic: null,
        gst: ""
      },
      items: [{
        sku_id: data.sku_id,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity, 10)
      }],
      paid: false,
      invoice_no: data.invoice_no,
      invoice_date: data.invoice_date,
      updated_on: new Date().toISOString(),
      adding_date: new Date().toISOString()
    };

    onAddOrder(newOrder);
    reset();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme='teal' mb={4}>+ Sale Order</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel>Customer ID</FormLabel>
                <Input {...register('customer_id')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input {...register('customer_name')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>SKU ID</FormLabel>
                <Input {...register('sku_id')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input type="number" {...register('price')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input type="number" {...register('quantity')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Invoice No</FormLabel>
                <Input {...register('invoice_no')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Invoice Date</FormLabel>
                <Input type="date" {...register('invoice_date')} />
              </FormControl>
              <Button type='submit' colorScheme='teal' mt={4}>
                Add Order
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

AddOrderModal.propTypes = {
  onAddOrder: PropTypes.func.isRequired
};

export default AddOrderModal;
