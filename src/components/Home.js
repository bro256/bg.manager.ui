import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="mb-3">Password Manager</h1>
      </div>
      <h4 className="mb-3">Welcome to Password Manager</h4>
      <div className="mb-3">
        <h3>About</h3>
        <p>&#128274; Password Manager is designed to help you keep your online accounts safe and easily accessible.</p>
        <p>Securely manage and protect your passwords online with our Password Manager. Our platform offers a convenient and reliable solution for storing, generating, and organizing your passwords in one secure location. With state-of-the-art encryption, your sensitive data remains safe from unauthorized access. </p>
        <p>
          The source code of Password Manager API back end is open source and available on{' '}
          <a href="https://github.com/bro256/bg.manager" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
        <p>
          The source code of Password Manager front end React app is open source and available on{' '}
          <a href="https://github.com/bro256/bg.manager.ui" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          . Feel free to explore the code, contribute to the project, or report any issues you encounter.
        </p>
      </div>
      <h3>Features</h3>
    <div className="mb-5">
        <p>
            <strong>&#9989; User Registration and Authentication. </strong>
            Allows users to create an account and authenticate themselves securely.
        </p>
        <p>
            <strong>&#9989; Password Storage and Organization. </strong>
            Provides the ability for users to store and organize their passwords securely in the password manager.
        </p>
        <p>
            <strong>&#9989; Password Generation. </strong>
            Offers an advanced password generation feature that generates strong and unique passwords for users.
        </p>
        <p>
            <strong>&#9989; Encryption and Data Security. </strong>
            Encrypts stored passwords to protect them from unauthorized access.
        </p>
        <p>
            <strong>&#9989; Cross-Platform Access. </strong>
            Lets access passwords from desktops, laptops, and mobile devices.
        </p>
        <p>
            <strong>&#9989; Search. </strong>
            Enables users to search their password entries.
        </p>
        <p>
            <strong>&#9989; Export passwords. </strong>
            Allows users to export their data in CSV format to be transferred to other password managers.
        </p>
    </div>
    </div>
  );
};

export default Home;