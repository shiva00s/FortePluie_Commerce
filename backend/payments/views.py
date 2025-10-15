# payments/views.py
import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Initialize Razorpay client from settings
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class CreateRazorpayOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Amount must be an integer (e.g., 50000 for ₹500.00)
        amount = int(float(request.data.get('amount')) * 100) 

        try:
            razorpay_order = client.order.create({
                "amount": amount,
                "currency": "INR",
                "payment_capture": "1" # Auto capture the payment
            })
            return Response(razorpay_order, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class VerifyPaymentView(APIView):
    def post(self, request, *args, **kwargs):
        params_dict = {
            'razorpay_order_id': request.data.get('razorpay_order_id'),
            'razorpay_payment_id': request.data.get('razorpay_payment_id'),
            'razorpay_signature': request.data.get('razorpay_signature')
        }

        try:
            # This will raise an exception if the signature is invalid
            client.utility.verify_payment_signature(params_dict)
            # If verification is successful, you can update your order here
            return Response({'status': 'Payment Successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Payment Verification Failed'}, status=status.HTTP_400_BAD_REQUEST)