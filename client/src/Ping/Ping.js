import React, { Component } from 'react';
import axios from 'axios';


class Ping extends Component {

  securedPing() {
    const { getAccessToken } = this.props.auth;
    const API_URL = 'http://localhost:3000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedScopedPing() {
      const { getAccessToken } = this.props.auth;
      const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
      axios.get(`${API_URL}/private-scoped`, { headers })
        .then(response => this.setState({ message: response.data.message }))
        .catch(error => this.setState({ message: error.message }));
  }
}

export default Ping;