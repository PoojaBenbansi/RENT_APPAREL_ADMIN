import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <div class="sidenav">
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              <i class="fas fa-tachometer-alt"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="active">
              {' '}
              <i class="fas fa-users"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" activeClassName="active">
              <i class="fa fa-list-alt"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/brands" activeClassName="active">
              <i class="fa fa-list-alt"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/vendors" activeClassName="active">
              {' '}
              <i class="fas fa-store"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName="active">
              {' '}
              <i class="fa fa-list" aria-hidden="true"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/setting" activeClassName="active">
              {' '}
              <i class="fas fa-cog"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
