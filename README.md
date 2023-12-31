Overview

The Blog_platform project is a simple platform which provides interactive user interface to Read blogs Added by admin, built with Django and Django Rest Framework.
Getting Started

Follow the instructions below to set up and run the project locally.
Prerequisites

Make sure you have the following installed on your system:

    Python (3.x)
    Django
    Django Rest Framework

Installation

    Clone the repository:

    https://github.com/Bhupendra560/Blog_Platform.git
    Navigate to the project directory : cd Blog_Platform/personal_blog
    
    Create a virtual environment : python -m venv venv

Activate the virtual environment:

    On Windows: venv\Scripts\activate
    On macOS/Linux : source venv/bin/activate

Install dependencies:

    pip install -r requirements.txt

Apply database migrations:

    python manage.py makemigrations
    python manage.py migrate

Run the development server:

    python manage.py runserver
    The application should now be running at http://127.0.0.1:8000/.

Usage:

    Access the Django Admin interface at http://127.0.0.1:8000/admin/ to manage blogs.
