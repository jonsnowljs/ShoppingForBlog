import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductsDetails, updateProduct } from 'actions/productAction';
import { PRODUCT_UPDATE_RESET } from 'constants/productConstants';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from 'components/canvasUtils';
import RangeSlider from 'react-bootstrap-range-slider';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // image is the base64 string of the image. It will be used to upload the image to the server .
  const [image, setImage] = useState('');

  // upload cropper state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setCountInStock(product.countInStock);
      }
    }
  }, [history, productId, product, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
      })
    );
  };
  function base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (
      var offset = 0, len = byteChars.length;
      offset < len;
      offset += sliceSize
    ) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }

  const uploadFileHandler = async (e) => {
    if (rotation || croppedAreaPixels) {
      const imageData = await getCroppedImg(image, croppedAreaPixels, rotation);
      // if it's setImage(imageData), imageData will be previous data. the updated data will not be saved.
      setImage(() => imageData);
    }

    const formData = new FormData();
    formData.append('image', image);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log(image);
      const jpegFile64 = image.replace(/^data:image\/(png|jpeg);base64,/, '');
      const file = base64ToBlob(jpegFile64, 'image/jpeg');
      console.log(file);

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
      setShowCropper(true);
    } catch (errors) {
      setUploading(false);
    }
  };

  const cropperCloseHandler = () => {
    setShowCropper(false);
  };
  const cropperOpenHandler = async (e) => {
    const file = e.target.files[0];
    const imageData = await readFile(file);
    setImage(imageData);
    setShowCropper(true);
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <div>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    label="Choose File"
                    onChange={cropperOpenHandler}
                    className="d-flex align-items-center"
                  />
                  {/* TODO add Loader inside the form */}
                  {uploading && <Loader />}
                </div>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                UPDATE
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
      {image && (
        <Modal
          show={showCropper}
          onHide={cropperCloseHandler}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Crop Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="img-container" style={{ height: '600px' }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <RangeSlider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
              size={'lg'}
              className="lg"
            />
            <Button variant="secondary" onClick={cropperCloseHandler}>
              Close
            </Button>
            <Button variant="primary" onClick={uploadFileHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <img src={image} alt="product" />
    </>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default ProductEditScreen;
