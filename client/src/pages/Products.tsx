import { Button, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import AppLayout from '../containers/Layout/Layout';
import { useAuth } from '../hooks/useAuth';
import ProductsContainer from './../containers/Products/Products';

function Products() {
  const { isAuth, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState(() =>
    new Date().getTime(),
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openNotification = (message: string) => {
    notification.open({
      message: 'Something went wrong!',
      description: message,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/products`,
      );
      const res = await response.json();
      return res;
    };
    fetchProducts()
      .then((res) => setProducts(res))
      .catch((err) => {
        openNotification(err.err);
      });
  }, [updateProduct]);

  return (
    <AppLayout>
      <h1>Products page</h1>

      {isAuth ? (
        <>
          <Button type="primary" onClick={showModal}>
            Add New Product
          </Button>
          <Modal
            title="Add New Product"
            visible={isModalVisible}
            onCancel={closeModal}
            footer={null}
          >
            <ProductForm
              onProductAdd={() => {
                setUpdateProduct(new Date().getTime());
                setIsModalVisible(false);
              }}
              token={token}
            />
          </Modal>
        </>
      ) : (
        <></>
      )}
      <ProductsContainer products={products} />
    </AppLayout>
  );
}

export default Products;
