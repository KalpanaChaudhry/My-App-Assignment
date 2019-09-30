import React from "react";

import ShippingAddress from "../../components/ShippingAddress/ShippingAddress";
import BillingAddress from "../../components/BillingAddress/BillingAddress";
import Products from "../../components/Products/Products";
import classes from "./Billing.module.css";
import response from "../../api/response.json";

class Billing extends React.Component {
  state = {
    initialData: response,
    disable: false
  };

  onSaveHandler = () => {
    if (
      !this.state.initialData.billingAddress.firstName ||
      !this.state.initialData.billingAddress.lastName ||
      !this.state.initialData.billingAddress.addressLine1 ||
      !this.state.initialData.billingAddress.addressLine2 ||
      !this.state.initialData.billingAddress.city ||
      !this.state.initialData.billingAddress.State ||
      !this.state.initialData.billingAddress.zipCode ||
      this.state.initialData.billingAddress.zipCode == 0 ||
      !this.state.initialData.billingAddress.country ||
      !this.state.initialData.billingAddress.orderDate
    ) {
      this.setState({ disable: true });
      alert("all fields are mandatory except notes");
    }

    console.log(this.state.initialData);
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
