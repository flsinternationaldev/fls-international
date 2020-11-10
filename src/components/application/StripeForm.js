import React, { Fragment } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function () {
	const stripe = useStripe();
	const elements = useElements();

	return <CardElement className="fls__base-input fls__base-input--payment" />;
}
