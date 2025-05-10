import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

class MailService:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        self.GMAIL_USER = os.getenv('GMAIL_USER')
        self.GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD')
        
        if not self.GMAIL_USER or not self.GMAIL_PASSWORD:
            raise ValueError("Las credenciales de Gmail no están configuradas")

    def send_mail(self, to_email: str, subject: str, text_content: str, html_content: str = None) -> bool:
        
        if not all([to_email, subject, text_content]):
            raise ValueError("Faltan parámetros requeridos para enviar el email")
            
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = self.GMAIL_USER
        msg['To'] = to_email
        msg['Reply-To'] = self.GMAIL_USER
        msg['Return-Path'] = self.GMAIL_USER

        # Parte de texto plano
        part1 = MIMEText(text_content, 'plain')
        msg.attach(part1)

        # Parte HTML (opcional)
        if html_content:
            part2 = MIMEText(html_content, 'html')
            msg.attach(part2)

        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(self.GMAIL_USER, self.GMAIL_PASSWORD)
                server.sendmail(self.GMAIL_USER, to_email, msg.as_string())
            return True
        except smtplib.SMTPException as e:
            print(f"Error SMTP al enviar email: {str(e)}")
            return False
        except Exception as e:
            print(f"Error inesperado al enviar email: {str(e)}")
            return False