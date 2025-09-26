const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // formun default davranışını bloklayır

    const formData = new FormData(paymentForm);
    const data = {
        cardNumber: formData.get('cardNumber'),
        expiry: formData.get('expiry'),
        cvv: formData.get('cvv')
    };

    try {
        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        result.success
            ? alert('Payment successful!')
            : alert('Payment failed!');
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
});