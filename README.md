# SecureVault: Password Generator & Encrypted Vault (MVP)

A fast, simple, and privacy-first web application for generating strong passwords and storing them in a secure, client-side encrypted vault. The server never has access to your plaintext secrets.

------------------------------------------------------------------------------------


# About The Project

This project is a Minimum Viable Product (MVP) assignment to build a secure password manager. The core architectural requirement is **client-side encryption**, ensuring that the server only ever stores encrypted blobs of data, making it impossible for server administrators or attackers to access user passwords.

This approach guarantees user privacy and data security.

-------------------------------------------------------------------------------------

# Tech Stack

This project is a monorepo with a separate frontend and backend.

**Frontend (Client):**
*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API
*   **API Communication:** Axios

**Backend (Server):**
*   **Framework:** Node.js with Express
*   **Language:** TypeScript
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing

**Security:**
*   **Encryption:** `crypto-js` library for client-side AES encryption.
*   **Key Derivation:** PBKDF2 is used to derive a strong encryption key from the user's master password.

----------------------------------------------------------------------------------------------------------------------


# Features

*   **Strong Password Generator:** Customizable length, with options to include numbers/symbols and exclude look-alike characters.
*   **Secure Vault:** Save, view, edit, and delete vault items (title, username, password, URL, notes).
*   **Client-Side Encryption:** All vault data is encrypted in the browser using the user's master password before being sent      to the server. **The server never sees plaintext data.**
*   **Simple Authentication:** Secure user registration and login (email + master password).
*   **Copy to Clipboard:** Easily copy passwords with an auto-clear feature for security.
*   **Search/Filter:** Instantly search through your vault items.
*   **Responsive UI:** A clean and modern dark-mode interface that works on all devices.

---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------