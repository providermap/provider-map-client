import React, { PureComponent } from "react";

class ErrorBoundary extends PureComponent {

  // Initial hasError state
  state = { error: null, info: null }

  // Component life cycle method to catch application errors
  componentDidCatch(error, info) {
    this.setState({ error: error, info: info });
  }

  render() {

    // State values
    const { error, info } = this.state;

    // Props
    const { children } = this.props;

    // If there is no error, return the children
    if (!error) return children;

    // If there is an error, show error boundary page
    return (
      <div>
        <h1>Error Boundary Hit</h1>
        <p>Error: {error}</p>
        <br />
        <p>Details: {info}</p>
      </div>
    );
  }
}

export default ErrorBoundary;