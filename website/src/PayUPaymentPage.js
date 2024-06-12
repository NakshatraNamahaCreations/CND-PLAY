import React from "react";
import { merchantKey } from "./livecredential";
export default function PayUPaymentPage({
  setToggle,
  form,
  transactionId,
  hash,
}) {
  return (
    <div>
      <h4>Details</h4>
      <div>
        <span>Product Name: Test Product</span>
        <span>Name: {form.name}</span>
        <span>Number: {form.number}</span>
        <span>Amount: {form.amount}</span>
      </div>

      <form action="https://secure.payu.in/_payment" method="post">
        <input type="hidden" name="key" value={merchantKey} />
        <input type="hidden" name="txnid" value={transactionId} />
        <input type="hidden" name="amount" value={form.amount} />
        <input type="hidden" name="productinfo" value="Live Product" />
        <input type="hidden" name="firstname" value={form.name} />{" "}
        <input type="hidden" name="email" value={form.email} />
        <input type="hidden" name="phone" value={form.number} />
        <input type="hidden" name="ufw1" value={"details1"} />
        <input type="hidden" name="ufw2" value={"details2"} />
        <input type="hidden" name="ufw3" value={"details3"} />
        <input type="hidden" name="ufw4" value={"details4"} />
        <input type="hidden" name="ufw5" value={"details5"} />
        <input type="hidden" name="hash" value={hash} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
