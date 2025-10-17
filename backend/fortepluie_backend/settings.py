import os
import dj_database_url
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Securely load the secret key from environment variables
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'a-default-secret-key-for-local-dev')

# DEBUG will be False on Render (production), but True when you run locally
DEBUG = 'RENDER' not in os.environ

# Configure allowed hosts for production and local development
ALLOWED_HOSTS = ['31.97.61.12', 'fortepluie.com', 'www.fortepluie.com','127.0.0.1', 'localhost']
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic', # For serving static files in development
    'django.contrib.staticfiles',
    
    # 3rd Party Apps (NO DUPLICATES)
    'rest_framework',
    'django_filters',
    'corsheaders',
    'django_rest_passwordreset',

    # Local Apps
    'apps.products',
    'apps.orders',
    'apps.users',
    'apps.admin_portal',
    'payments',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Correct position
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # Correct position
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'fortepluie_backend.urls'
WSGI_APPLICATION = 'fortepluie_backend.wsgi.application'

# Database configuration (uses PostgreSQL on Render, SQLite locally)
DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600,
    )
}

# Database configuration (reads from your .env file)
#DATABASES = {
 #   'default': {
  #      'ENGINE': 'django.db.backends.postgresql',
   #     'NAME': 'fortepluie_db',
    #    'USER': 'fortepluie_user',
     #   'PASSWORD': os.getenv('Shiva@Saara@74482'), # Make sure to add this to your .env
      #  'HOST': 'localhost',
       # 'PORT': '5432',
 #}
#}

# Static and Media files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# --- Custom Settings ---
CORS_ALLOW_ALL_ORIGINS = True # Change to CORS_ALLOWED_ORIGINS in production for better security

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework_simplejwt.authentication.JWTAuthentication',],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination', 'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend', 'rest_framework.filters.SearchFilter'],
}

# --- Email Settings ---
# For local development, use the console backend to print emails to your terminal
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# For production, use the SMTP backend with your secure credentials
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')

# --- Razorpay Settings ---
RAZORPAY_KEY_ID = os.getenv('RAZORPAY_KEY_ID')
RAZORPAY_KEY_SECRET = os.getenv('RAZORPAY_KEY_SECRET')

# --- Default Django Settings (keep at the bottom) ---
TEMPLATES = [ { 'BACKEND': 'django.template.backends.django.DjangoTemplates', 'DIRS': [os.path.join(BASE_DIR, 'templates')], 'APP_DIRS': True, 'OPTIONS': { 'context_processors': [ 'django.template.context_processors.debug', 'django.template.context_processors.request', 'django.contrib.auth.context_processors.auth', 'django.contrib.messages.context_processors.messages', ], }, }, ]
AUTH_PASSWORD_VALIDATORS = [ { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', }, { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', }, { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', }, { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', }, ]
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'