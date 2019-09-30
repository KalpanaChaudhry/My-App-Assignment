import React from "react";

import ShippingAddress from "../../components/ShippingAddress/ShippingAddress";
import BillingAddress from "../../components/BillingAddress/BillingAddress";
import Products from "../../components/Products/Products";
import classes from "./Billing.module.css";
import response from "../../api/response.json";

class Billing extends React.Component {
  state = {
    initialData: response
  };

  onSaveHandler = () => {
    let valid = true;
    Object.keys(this.state.initialData.billingAddress).forEach(key => {
      if (!this.state.initialData.billingAddress[key]) {
        valid = false;
      }
    });
    Object.keys(this.state.initialData.shippingAddress).forEach(key => {
      if (!this.state.initialData.shippingAddress[key]) {
        valid = false;
      }
    });
    this.state.initialData.products.forEach(obj => {
      if (!obj.productId) {
        valid = false;
      } else if (!obj.name) {
        valid = false;
      } else if (!obj.unitprice) {
        valid = false;
      } else if (!obj.qty) {
        valid = false;
      }
    });

    if (valid) {
      console.log(this.state.initialData);
    } else {
      alert("all fields are required except notes");
    }
  };

  changeHandler = (parent, igkey, value) => {
    const newInitialData = { ...this.state.initialData };
    newInitialData[parent][igkey] = value;
    this.setState({ initialData: newInitialData });
  };

  productsChangeHandler = (i, key, value) => {
    const newProductsInitialData = { ...this.state.initialData };
    newProductsInitialData.products[i][key] = value;
    this.setState({ initialData: newProductsInitialData });
  };

  onRowAddHandler = () => {
    const newItem = {
      productId: null,
      name: "",
      unitprice: "",
      qty: "",
      notes: ""
    };
    const newProducts = { ...this.state.initialData };
    newProducts.products = [...newProducts.products, newItem];

    this.setState({ initialData: newProducts });
  };

  onRowDeleteHandler = i => {
    const newProductList = this.state.initialData.products.filter(
      (pro, inde) => {
        return inde !== i;
      }
    );
    const newProduct = { ...this.state.initialData };
    newProduct.products = newProductList;
    this.setState({ initialData: newProduct });
  };

  render() {
    return (
      <React.Fragment>
        <div className={[classes.container, classes.card].join(" ")}>
          <BillingAddress
            initialData={this.state.initialData.billingAddress}
            change={(key, val) =>
              this.changeHandler("billingAddress", key, val)
            }
          />
          <ShippingAddress
            initialData={this.state.initialData.shippingAddress}
            change={(key, val) =>
              this.changeHandler("shippingAddress", key, val)
            }
          />
        </div>
        <div className={classes.card}>
          <Products
            initialData={this.state.initialData.products}
            change={this.productsChangeHandler}
            onRowDelete={this.onRowDeleteHandler}
            onRowAdd={this.onRowAddHandler}
          />
          <button className={classes.onSave} onClick={this.onSaveHandler}>
            SAVE
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Billing;
