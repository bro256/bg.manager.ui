# React based password manager for Password manager API

## About
Project is still in progress!

Frontend application for Password manager API.

- This project is React based Password manager frontend.
- Backend application is made with Java Spring : [Link](https://github.com/bro256/bg.manager)

## Cryptography
### Key derivation function
- PBKDF2 (PBKDF2WithHmacSHA256)
- Iterations: 600 000 (2023 OWASP recommendation)
- Salt: 128 bits (US National Institute of Standards and Technology (NIST) recommendation)
- Generated key length: 256 bits
- Implemented in accordance with official: [java.security package documentation](https://docs.oracle.com/javase/8/docs/api/java/security/package-summary.html) and [javax.crypto package documentation](https://docs.oracle.com/javase/8/docs/api/javax/crypto/package-summary.html)
