import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav className="d-flex flex-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
      <button
        className="navbar-toggler d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#side-nav"
        aria-controls="side-nav"
        aria-expanded="false"
        aria-label="Toggle docs navigation"
      >
        <i className="fa fa-bars" />
      </button>
      <h3 className="my-0 mr-auto">Notes</h3>
      <Link className="btn btn-outline-primary" to="/">
        <i className="fa fa-plus" /> Create
      </Link>
    </nav>
  );
};
