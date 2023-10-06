from django.core.mail import send_mail
from django.conf import settings
import random
from django.contrib.auth.models import User


def send_otp_via_email(email):
        subject = 'OTP Verification'
        otp = random.randint(100000, 999999)
        message = f'Your OTP is: {otp}'
        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from, [email])
        user_obj = User.objects.get(email = email)
        user_obj.otp = otp
        user_obj.save()