import React from "react";

import classes from "./BillingAddress.module.css";

const BillingAddress = ({ initialData, change }) => {
  return (
    <div className={classes.flex1}>
      <h3 className={classes.billingAddress}>Billing Address</h3>
      {Object.keys(initialData).map(
        (igkey, index) =>
          igkey !== "orderDate" && (
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
      <h3>Order Date</h3>
      <input
        className={
          classes.fields + " " + (!initialData.orderDate && classes.error)
        }
        type="date"
        value={initialData.orderDate}
        onChange={e => change("orderDate", e.target.value)}
      />
      {!initialData.orderDate && (
        <p className={classes.errorText}>Field Required</p>
      )}
    </div>
  );
};

export default BillingAddress;
