import random
from django.conf import settings
from .models import User, OneTimePassword
from django.contrib.sites.shortcuts import get_current_site


import smtplib
from email.mime.text import MIMEText
from django.core.mail import EmailMessage


def send_generated_otp_to_email(user_email: str, request):
    subject = "One time passcode for Email verification"
    otp = random.randint(1000, 9999)
    current_site = get_current_site(request).domain
    user = User.objects.get(email=user_email)
    user = User.objects.get(email=user_email)
    email_body = (f"Hi {user.first_name}, thanks for signing up on {current_site}.\n"
                  f"Please verify your email with the \n one time passcode {otp}")
    otp_obj = OneTimePassword.objects.create(user=user, otp=otp)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        msg = MIMEText(email_body, 'plain')
        msg['Subject'] = subject
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = user.email
        server.sendmail(settings.EMAIL_HOST_USER, user.email, msg.as_string())


def send_normal_email2(data):
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        to=[data['to_email']]
    )
    email.send()


def send_normal_email(data):
    subject = "Reset password"
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        msg = MIMEText(data['email_body'], 'plain')
        msg['Subject'] = data['email_subject']
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] =data['to_email']
        server.sendmail(settings.EMAIL_HOST_USER, data['to_email'], msg.as_string())