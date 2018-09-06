import React, { Component } from 'react';

import CurrentLocation from './CurrentLocation';
import MapContainer from './MapContainer';

class App extends Component {
  constructor(props) {
    super(props);

    console.log('App constructor');

    this.state = {
      currentAddress: 'QA Manchester',
      mapCoordinates: {
        lat: 53.475586,
        lng: -2.241402
      }
    }
  }

  componentDidMount() {
    console.log('App componentDidMount');
  }

  componentDidUpdate() {
    console.log('App componentDidUpdate');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('App getDerivedStateFromProps');
    console.dir(props);
    console.dir(state);
    return state;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('App getSnapshotBeforeUpdate');
    console.dir(prevProps);
    console.dir(prevState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App shouldComponentUpdate');
    console.dir(nextProps);
    console.dir(nextState);
    console.log(`should App update: ${!(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state))}`);
    return !(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state));
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount');
  }

  render() { 
    console.log('App render');
    return (
      <div>
        <h1>{this.props.title}</h1>
        <MapContainer coords={this.state.mapCoordinates} />
        <CurrentLocation address={this.state.currentAddress}/>
      </div>
    );
  }
}
 
export default App;