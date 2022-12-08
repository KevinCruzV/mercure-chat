// Identical imports for both Registration & Login
import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';

class Registration extends Component {
    constructor(props){
        
      this.registerUser = this.registerUser.bind(this);
    }
  
    registerUser() {
      const { email, password, password_confirmation } = this.state;
  
      this.setState({ error: '', loading: true });
    }

  }