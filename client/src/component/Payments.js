import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    // this component requires some configuration such as #1 amount, which is in cents so 500 is 5 dollars
    // #2 token -> there will be a callback function with a token that we received from Stripe after succesful payment
    // #3 Stripe Key
    // #4 you can customize the look by name and description
    return (
      <StripeCheckout
        name="Survery System"
        description="5 dollars for 5 email credits "
        amount={500}
        // dispatching to action creator called handleToken
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {/* // we are using a children element to make it look better */}
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
