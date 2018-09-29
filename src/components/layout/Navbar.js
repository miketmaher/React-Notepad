import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
      <h3 className="my-0 mr-md-auto">Notes</h3>
      <a className="btn btn-outline-primary" to="/">
        <i className="fa fa-plus" /> Create
      </a>
    </nav>
  );
};
