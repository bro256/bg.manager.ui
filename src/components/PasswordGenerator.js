import React, { useState } from 'react';
import {
  calculatePasswordStrength,
  generateRandomPassword,
  getColorForPasswordStrength,
} from '../utils/passwordUtils';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('None');
    const [length, setLength] = useState(20);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
  
    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword(
          length,
          includeLowercase,
          includeUppercase,
          includeNumbers,
          includeSymbols
        );
        const newStrength = calculatePasswordStrength(newPassword);
        setPassword(newPassword);
        setStrength(newStrength);
      };
    
      const handleStrengthCheck = (e) => {
        const newPassword = e.target.value;
        const newStrength = calculatePasswordStrength(newPassword);
        setPassword(newPassword);
        setStrength(newStrength);
      };
    
      const handleLengthChange = (e) => {
        setLength(e.target.value);
      };
    
      const handleCheckboxChange = (e, setter) => {
        setter(e.target.checked);
      };

      const toggleTextVisibility = () => {
        const passwordField = document.getElementById('password-field');
        if (passwordField) {
          passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
        }
      };
    
      const passwordToClipboard = () => {
        const passwordField = document.getElementById('password-field');
    
        if (passwordField) {
          navigator.clipboard.writeText(passwordField.value).then(
            () => {
              console.log('Password copied to clipboard');
            },
            (err) => {
              console.error('Unable to copy password to clipboard', err);
            }
          );
        }
      };
  
    return (
        <div className="container">
          <div className="col-md-6">
            <div>
              <label htmlFor="password">Generated Password</label>
            </div>
            <div>
              <input
                className="form-control"
                type="text"
                id="password-field"
                readOnly
                value={password}
                onChange={handleStrengthCheck}
              />
            </div>




            <div className="mb-3">
              <span>Strength: </span>
              <span id="password-strength">{strength}</span>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary"
                id="generate-button"
                onClick={handleGeneratePassword}
              >
                Generate Password
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => toggleTextVisibility()}
              >
                Show
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => passwordToClipboard()}
              >
                Copy
              </button>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="length">
                  Password Length
                </label>
                <output className="form-range-output" htmlFor="length">
                  {length}
                </output>
              </div>
              <div className="col-md-6">
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="60"
                  value={length}
                  id="length"
                  onChange={handleLengthChange}
                />
              </div>
            </div>
            {/* Include Lowercase Letters */}
            <div className="d-flex align-items-center mb-3">
              <label className="col-md-6" htmlFor="lowercase">
                Include Lowercase Letters
              </label>
              <div className="form-check form-switch col-md-6 d-flex justify-content-center">
                <input
                  className="form-check-input form-check form-switch md-2"
                  type="checkbox"
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={(e) => handleCheckboxChange(e, setIncludeLowercase)}
                />
              </div>
            </div>


            {/* Include Uppercase Letters */}
            <div className="d-flex align-items-center mb-3">
              <label className="col-md-6" htmlFor="uppercase">
                Include Uppercase Letters
              </label>
              <div className="form-check form-switch col-md-6 d-flex justify-content-center">
                <input
                  className="form-check-input form-check form-switch md-2"
                  type="checkbox"
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={(e) => handleCheckboxChange(e, setIncludeUppercase)}
                />
              </div>
            </div>
            
            {/* Include Numbers */}
            <div className="d-flex align-items-center mb-3">
              <label className="col-md-6" htmlFor="numbers">
                Include Numbers
              </label>
              <div className="form-check form-switch col-md-6 d-flex justify-content-center">
                <input
                  className="form-check-input form-check form-switch md-2"
                  type="checkbox"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={(e) => handleCheckboxChange(e, setIncludeNumbers)}
                />
              </div>
            </div>
            {/* Include Symbols */}
            <div className="d-flex align-items-center mb-3">
              <label className="col-md-6" htmlFor="symbols">
                Include Symbols
              </label>
              <div className="form-check form-switch col-md-6 d-flex justify-content-center">
                <input
                  className="form-check-input form-check form-switch md-2"
                  type="checkbox"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={(e) => handleCheckboxChange(e, setIncludeSymbols)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    };
  
  export default PasswordGenerator;
  