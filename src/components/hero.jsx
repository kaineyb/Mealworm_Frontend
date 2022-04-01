import React, { Component } from "react";
import config from "../services/config.json";

class Hero extends Component {
  render() {
    return (
      <section>
        <header>
          <h1>{config.siteName}</h1>
          <h2>Welcome to the Site!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta
            congue imperdiet. Nunc tincidunt, velit in commodo congue, nisi mi
            laoreet tellus, et rhoncus ex urna eu mauris. Aliquam pulvinar massa
            est, id suscipit elit ornare non.
          </p>
        </header>
      </section>
    );
  }
}

export default Hero;
