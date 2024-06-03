# GetMeACoffee

GetMeACoffee is a web application designed to help creators receive support through donations. This project is built using Next.js, Tailwind CSS, MongoDB, and NextAuth for authentication with various providers. Razorpay is integrated for secure payment processing.

## Features

- User authentication with multiple providers using NextAuth
- Secure payment processing with Razorpay
- Responsive design with Tailwind CSS
- Server-side rendering and static site generation with Next.js
- Data storage and management with MongoDB
- Creator dashboard for managing supporters and tracking earnings

## Tech Stack

- **Next.js**: Server-side rendering and static site generation
- **Tailwind CSS**: Responsive and modern UI design
- **MongoDB**: NoSQL database for data storage
- **NextAuth**: Authentication with various providers
- **Razorpay**: Secure payment processing

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/prachisamuel/Get-Me-A-Coffee.git
    cd get-me-a-coffee
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add the following environment variables:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret

    MONGODB_URI=your_mongodb_connection_string

    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret

    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- Sign up or log in using your preferred authentication provider (GitHub)
- Set up your profile and customize your support options
- Share your GetMeACoffee page with your audience
- Supporters can make donations using Razorpay

## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

