import React from "react";

class LazyBackground extends React.Component {
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
      return <div>
                <img className={this.props.className} src={this.state.src || this.props.placeholder}
                    width="350px" height="300px" 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "http://vinbdi.org/img/vinbdi-logo.png"
                     }}
                />
            </div>
          ;
    }
  }
  export default LazyBackground;