import React from "react";

import classes from "./Products.module.css";
const Products = ({ initialData, change, onRowDelete, onRowAdd }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>QTY</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Notes</th>
            <th>*</th>
          </tr>
        </thead>
        <tbody>
          {initialData &&
            initialData.length > 0 &&
            initialData.map((igkey, index) => (
              <tr key={igkey + index}>
                <td>
                  <input
                    className={
                      classes.fields +
                      " " +
                      ((!igkey.productId || igkey.productId === 0) &&
                        classes.error)
                    }
                    type="number"
                    value={igkey.productId || ""}
                    onChange={e => change(index, "productId", e.target.value)}
                  />
                  {(!igkey.productId || igkey.productId == 0) && (
                    <p className={classes.errorText}>Field Required</p>
                  )}
                </td>
                <td>
                  <input
                    className={
                      classes.fields + " " + (!igkey.name && classes.error)
                    }
                    value={igkey.name || ""}
                    onChange={e => change(index, "name", e.target.value)}
                  />
                  {!igkey.name && (
                    <p className={classes.errorText}>Field Required</p>
                  )}
                </td>
                <td>
                  <input
                    className={
                      classes.fields +
                      " " +
                      ((!igkey.qty || igkey.qty === 0) && classes.error)
                    }
                    type="number"
                    value={igkey.qty || ""}
                    onChange={e => change(index, "qty", e.target.value)}
                  />
                  {(!igkey.qty || igkey.qty == 0) && (
                    <p className={classes.errorText}>Field Required</p>
                  )}
                </td>
                <td>
                  <input
                    className={
                      classes.fields +
                      " " +
                      ((!igkey.unitprice || igkey.unitprice === 0) &&
                        classes.error)
                    }
                    type="number"
                    value={igkey.unitprice || ""}
                    onChange={e => change(index, "unitprice", e.target.value)}
                  />
                  {(!igkey.unitprice || igkey.unitprice == 0) && (
                    <p className={classes.errorText}>Field Required</p>
                  )}
                </td>
                <td>
                  <button
                    className={
                      classes.disabledButton +
                      " " +
                      (igkey.qty * igkey.unitprice == 0 && classes.error)
                    }
                    disabled
                  >
                    {igkey.qty * igkey.unitprice}
                  </button>
                  {igkey.qty * igkey.unitprice == 0 && (
                    <p className={classes.errorText}>Field Required</p>
                  )}
                </td>
                <td>
                  <input
                    type="textarea"
                    value={igkey.notes || ""}
                    onChange={e => change(index, "notes", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={classes.onDelete}
                    onClick={() => onRowDelete(index)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className={classes.onSave} onClick={onRowAdd}>
        Add Product
      </button>
    </>
  );
};

export default Products;
