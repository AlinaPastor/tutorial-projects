import React from 'react';  
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, FieldGroup, Button, Image, Label} from 'react-bootstrap';
import HtmlInput from '../controls/HtmlInput';
import HtmlFile from '../controls/HtmlFile';
import {connect} from 'react-redux';  
import * as productactions from '../../actions/productActions'
import * as fileactions from '../../actions/fileActions'

class ProductEdit extends React.Component {
//const ProductEdit = ({product, filename}) => {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      id: this.props.id,
      productName: this.props.productName,
      price: this.props.price,
      image: this.props.image,
      isnew: this.props.isnew,
      filename: this.props.filename,
      file: null
    };
    console.log("this.state")
    console.log(this.state);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({id: nextProps.id});
    this.setState({productName: nextProps.productName});
    this.setState({price: nextProps.price});
    this.setState({image: nextProps.image});
    this.setState({isnew: nextProps.isnew});
    this.setState({filename: nextProps.filename});
    this.setState({file: nextProps.file});
  }

  render() {
    console.log('reader');
    //console.log(this.state.product);

    return(
      <div className="container">
      <h2  >Create New Product</h2>
      <h2 >Edit Product</h2>
      <Form horizontal>
        <FormGroup controlId="id">
          <Col componentClass={ControlLabel} sm={2}>Product ID:</Col>
          <Col sm={10}><FormControl type="text" value={this.state.id +""} disabled onChange={(e) => this.handleIdChange(e)}/></Col>
        </FormGroup>
        <FormGroup controlId="productName">
          <Col componentClass={ControlLabel} sm={2}>Product Name:</Col>
          <Col sm={10}><FormControl type="text" placeholder="Enter product name" value={this.state.productName +""} onChange={(e) => this.handleNameChange(e)}/></Col>
        </FormGroup>
        <FormGroup controlId="price">
          <Col componentClass={ControlLabel} sm={2}>Price:</Col>
          <Col sm={10}><FormControl type="text" placeholder="Enter price" value={this.state.price +""} onChange={(e) => this.handlePriceChange(e)}/></Col>
        </FormGroup>
        <FormGroup controlId="image">
          <Col componentClass={ControlLabel} sm={2}>Image:</Col>
          <Col sm={10}><Image src={this.state.image} thumbnail width="80" height="80" />&nbsp;
          <ControlLabel className="btn btn-success" htmlFor="fileSelector">
            <FormControl id="fileSelector" type="file" style={{display: 'none'}} onChange={(e) => this.handleFileChange(e)}/>Choose Image
          </ControlLabel>&nbsp;
          <Label bsStyle="info">{this.state.filename}</Label>&nbsp;
          <Button bsStyle="primary" type="button" onClick={(e) => this.uploadFile(e)}>Upload</Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="button" onClick={(e) => this.saveProduct(e)}>Save</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    );
  }

  handleIdChange(event) {
    // empty
  }

  handleNameChange(event) {
    this.setState({productName: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleFileChange(event) {
    const filename = event.target.files[0].name;
    this.setState({filename: filename});
    this.setState({file: event.target.files[0]});
    console.log(this.state.file);
  }

  handleImageChange(event) {
    this.setState({image: event.target.value});
  }

  uploadFile(event) {
    //console.log(this.state.file);
    let response = this.props.fileactions.getTest();
    console.log(response);
  }
  saveProduct(event) {
    console.log("saveProduct");
    event.preventDefault();
    //this.setState({saving: true});
    console.log(this.state);
    let product = {id: this.state.id, productName: this.state.productName, price: this.state.price, image: this.state.image};
    console.log(product);
    if (this.state.isnew) {
      this.props.productactions.createProduct(product);      
    } else {
      this.props.productactions.updateProduct(product);      
    }
  } 
};

ProductEdit.propTypes = {
  //product: PropTypes.object.isRequired
  //filename: PropTypes.string.isRequired
  //onChange: PropTypes.func.isRequired,
};



function getProductById(products, id) {
  let product = products.find(product => product.id == id)
  return Object.assign({}, product)
}

function mapStateToProps(state, ownProps) {
  const pId = ownProps.match.params.id;
  let product = {id: '0', productName: '', price: '', image: ''};
  let filename = "xbox.jpg";
  let file = null;
  let isnew = pId == null;
  product.image = process.env.API_HOST+"/images/default.png";
  //console.log(ownProps);
  if (pId) {
    product = getProductById(state.products, pId);
  }
  //console.log(product);
  return {
    id: product.id,
    productName: product.productName,
    price: product.price,
    image: product.image,
    isnew: isnew,
    filename: filename
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    productactions: bindActionCreators(productactions, dispatch),
    fileactions: bindActionCreators(fileactions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);  