# Password Manager app for Password Manager API

## About
Project is still in progress!

Frontend application for Password manager API.

- This project is React based Password manager frontend.
- Backend application is made with Java Spring : [Link](https://github.com/bro256/bg.manager)

## Zero-Knowledge Password Management

This password manager operates on the principle of zero-knowledge, ensuring that all sensitive cryptographic operations take place exclusively on the user's side. This means that we, as the service provider, have no access to your plaintext passwords or any confidential information. Your data remains fully encrypted and private, and only you have the keys to unlock it.

### How It Works

- **Client-Side Encryption:** All cryptographic processes, including encryption and decryption of your passwords, occur locally on your device. Your plaintext data is transformed into its encrypted form before it ever leaves your device, ensuring that only encrypted data is transmitted to server.
- **Zero-Knowledge Architecture:** We employ a zero-knowledge architecture, meaning that even if our servers were compromised, the encrypted data stored there would be meaningless without your unique encryption keys. Your key is never transmitted or stored on server.
- **End-to-End Security:** Your password and encryption keys are known only to you, and they are never shared with or stored in server side. This ensures that your sensitive information remains confidential and secure.

## API
- This project is Java Spring backend API.
- Database used in project: MySQL. 
- Frontend application is made with JavaScript and React : [Link](https://github.com/bro256/bg.manager.ui)

## Features
- **User Registration and Authentication.** Allows users to create an account and authenticate themselves securely.
- **Password Storage and Organization.** Provides the ability for users to store and organize their passwords securely in the password manager.
- **Password Generation.** Offers an advanced password generation feature that generates strong and unique passwords for users.
- **Password Generation.** Offers an advanced password generation feature that generates strong and unique passwords for users.
- **Encryption and Data Security.** Encrypts stored passwords to protect them from unauthorized access.
- **Cross-Platform Access.** Lets access passwords from desktops, laptops, and mobile devices.
- **Search.** Enables users to search their password entries.
-  **Export passwords** Allows users to export their data in CSV format to be transferred to other password managers.

## Cryptography

### Authentication
- **Password-hashing function:** bcrypt
- 

### Key derivation function
- **PBKDF2 (PBKDF2WithHmacSHA256)**
- **Iterations:** 100 000
- **Salt:** 128 bits (US National Institute of Standards and Technology (NIST) recommendation)
- **Generated key length:** 256 bits
- Implemented in accordance with official Crypto-js package

### Symmetric encryption
- **Algorithm:** AES-256
- **Key length:** 256 bits
- **Mode:** CBC (Cipher Block Chaining)
- **Block size:** 128 bits
- **Initialization vector (IV):** 128 bits, random, different for every record
- Implemented in accordance with official Crypto-js package

## Installation

Follow these steps to set up and run the project locally:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/bro256/bg.manager.ui.git

2. Navigate to the project directory:
   ```bash
   cd your-repo

3. Install dependencies:
   ```bash
   npm install

4. Start the application:
   ```bash
    npm start

5. Open your browser:
Visit http://localhost:3000 to view the app.

## Contributing
Thank you for considering contributing to our project! We welcome contributions from the community to make our project better. To contribute, please follow these guidelines:
- Fork the repository and clone it locally.
- Create a new branch for your contribution:
```
git checkout -b feature/your-feature-name
```
- Make your desired changes, additions, or bug fixes.
- Commit your changes with clear and descriptive commit messages:
```
git commit -m "Add feature: your feature description"
```
- Push your changes to your forked repository:
```
git push origin feature/your-feature-name
```
- Open a pull request (PR) against the main branch of the original repository.
- Ensure your PR includes a clear description of the changes made, along with any necessary documentation or steps to test the changes.
- We review your contribution, provide feedback, and work with you to address any necessary changes.
- Once approved, your changes will be merged into the main repository. Congratulations on your contribution!

We appreciate your valuable contributions and look forward to working together to improve our project!
