# payments/urls.py
from django.urls import path
from .views import CreateRazorpayOrderView, VerifyPaymentView

urlpatterns = [
    path('payments/razorpay/create/', CreateRazorpayOrderView.as_view(), name='razorpay-create-order'),
    path('payments/razorpay/verify/', VerifyPaymentView.as_view(), name='razorpay-verify-payment'),
]