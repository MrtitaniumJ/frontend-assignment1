import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Table, Tbody, Tr, Th, Td, Button, Thead, Icon, Text, Flex } from '@chakra-ui/react';
import { fetchActiveOrders, fetchCompletedOrders } from '../api';
import EditOrderModal from '../components/EditOrderModal';
import AddOrderModal from '../components/AddOrderModal';
import { FaUser } from 'react-icons/fa';

const Orders = () => {
  const { data: activeOrders, isLoading: isLoadingActive } = useQuery({
    queryKey: ['activeOrders'],
    queryFn: fetchActiveOrders,
  });
  const { data: completedOrders, isLoading: isLoadingCompleted } = useQuery({
    queryKey: ['completedOrders'],
    queryFn: fetchCompletedOrders,
  });

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleAddOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  if (isLoadingActive || isLoadingCompleted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box p={4}>
        <AddOrderModal onAddOrder={handleAddOrder} />
      </Box>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price (₹)</Th>
                  <Th>Last Modified</Th>
                  <Th>Edit/View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeOrders.map(order => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>
                      <Flex align="center">
                        <Icon as={FaUser} mr={2} />
                        {order.name}
                        <Text ml={2} p={1} bg="gray.400" borderRadius="md">
                          {order.id}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>₹{order.price}</Td>
                    <Td>{order.lastModified}</Td>
                    <Td>
                      <Button onClick={() => handleEditClick(order)}>...</Button>
                    </Td>
                  </Tr>
                ))}
                {/* Temporary orders */}
                {orders.map(order => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>
                      <Flex align="center">
                        <Icon as={FaUser} mr={2} />
                        {order.customer_profile.name}
                        <Text ml={2} p={1} bg="gray.400" borderRadius="md">
                          {order.customer_profile.id}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>₹{order.items[0].price}</Td>
                    <Td>{order.updated_on}</Td>
                    <Td>
                      <Button onClick={() => handleEditClick(order)}>...</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price (₹)</Th>
                  <Th>Last Modified</Th>
                  <Th>Edit/View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completedOrders.map(order => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>
                      <Flex align="center">
                        <Icon as={FaUser} mr={2} />
                        {order.name}
                        <Text ml={2} p={1} bg="gray.400" borderRadius="md">
                          {order.id}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>₹{order.price}</Td>
                    <Td>{order.lastModified}</Td>
                    <Td>
                      <Button onClick={() => handleEditClick(order)}>...</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        order={selectedOrder}
        readOnly={false}
      />
    </>
  );
};

export default Orders;
