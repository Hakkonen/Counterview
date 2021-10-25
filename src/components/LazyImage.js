import React, { Component } from "react"

class LazyImage extends React.Component {
    state = { src: null };

    componentDidMount() {
    const { src } = this.props;

    const imageLoader = new Image();
    imageLoader.src = src;

    imageLoader.onload = () => {
        this.setState({ src });
    };
    }

    render() {
    return <img src={this.state.src || this.props.placeholder} />;
    }
}

export default LazyImage