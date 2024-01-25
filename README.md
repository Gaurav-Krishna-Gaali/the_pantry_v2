# The Pantry v2

Welcome to The Pantry v2 repository! This e-commerce platform provides a seamless shopping experience with advanced features such as Role-Based Access Control (RBAC), user-friendly interfaces, and efficient order management.

## Getting Started

Follow these steps to run the application locally:

1. Set up a virtual environment:

    ```bash
    python -m venv venv
    ```

2. Activate the virtual environment:

    ```bash
    source venv/bin/activate
    ```

3. Install dependencies from the requirements.txt file:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the application:

    ```bash
    python application/main.py
    ```

## Additional Components

To utilize advanced features, such as background tasks and caching, follow these steps:

1. Start Celery worker for background tasks:

    ```bash
    celery -A main:celery_app worker --loglevel INFO
    ```

2. Start Celery beat for periodic tasks:

    ```bash
    celery -A main:celery_app beat --loglevel INFO
    ```

3. Ensure Redis server is running:

    ```bash
    redis-server
    ```

## Contributing

We welcome contributions to enhance The Pantry v2! Please check the [contribution guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as needed.

Happy shopping with The Pantry v2! 🛒✨
