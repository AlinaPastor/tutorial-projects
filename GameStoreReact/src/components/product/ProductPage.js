import React from 'react';  
import PropTypes from 'prop-types'
import AlertSimple from '../controls/AlertSimple';
import ProductForm from './ProductForm';
import productApi from '../../api/ProductsApi';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      product: {},
      isnew: false
    };

    this.updateProductState = this.updateProductState.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const pId = this.props.match.params.id;
    let isnew = pId == null;
    let product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};

    this.setState({isnew: isnew});    
    this.setState({product: product});

    if (pId) {
      productApi.getProduct(pId).then(product => {
        this.setState({product: product});
      }).catch(error => {
        this.handleError(error);
      });
    }
  }

  render() {
    console.log('ProductEdit.render');
    let alert = '';
    if (this.state.hasError) {
      alert = <AlertSimple error={this.state.error}/>;
    }
    let pageTitle = 'Edit Product';
    if (this.state.isnew) {
      pageTitle = 'Create New Product';
    }
    return(
      <div className="container">
        <h2>{pageTitle}</h2>
        {alert}
        <ProductForm 
          product={this.state.product} 
          isnew={this.state.isnew}
          onChange={this.updateProductState}
          onImageChange={this.handleImageChange}
          onSave={this.handleSave}
          onError={this.handleError}/> 
      </div>
    );
  }

  updateProductState(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = event.target.value;
    return this.setState({product: product});
  }

  handleImageChange(image) {
    this.state.product['image'] = image;
    return this.setState({product: this.state.product});
  }
  
  handleSave(event) {
    event.preventDefault();
    let product = this.state.product;
    console.log(product);
    if (this.state.isnew) {
      productApi.createProduct(product).then(response => {
        this.props.history.push('/products')
      }).catch(error => {
        this.handleError(error);
      });
    } else {
      productApi.updateProduct(product).then(response => {
        this.props.history.push('/products')
      }).catch(error => {
        this.handleError(error);
      });
    }
  }
  
  handleError(error) {
    console.log(error);
    this.setState({ hasError: true });
    this.setState({ error: error });
  }
}

export default ProductPage