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
    </div>
  );
};

export default Home;