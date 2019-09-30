import React from "react";
import classes from "./ShippingAddress.module.css";

const ShippingAddress = ({ initialData, change }) => (
  <div className={classes.flex1}>
    <h3>Shipping Address</h3>
    {Object.keys(initialData).map(
      (igkey, index) =>
        igkey !== "expectedDelivery" && (
          <>
            <input
              className={
                classes.fields + " " + (!initialData[igkey] && classes.error)
              }
              key={igkey + index}
              value={initialData[igkey]}
              onChange={e => change(igkey, e.target.value)}
            />
            {!initialData[igkey] && (
              <p className={classes.errorText}>Field Required</p>
            )}
          </>
        )
    )}
    <h3>Expected Delivery</h3>
    <input
      className={
        classes.fields + " " + (!initialData.expectedDelivery && classes.error)
      }
      type="date"
      value={initialData.expectedDelivery}
      onChange={e => change("expectedDelivery", e.target.value)}
    />
    {!initialData.expectedDelivery && (
      <p className={classes.errorText}>Field Required</p>
    )}
  </div>
);

export default ShippingAddress;
