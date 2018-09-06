import React from "react";
import Map from "./Map.jsx"
export default class MapContainer extends React.Component{
constructor(props){
    super(props);
    console.log("MapContainer constructor");
    this.state = {};
}
componentDidMount(){
    console.log("MapContainer Component did mount");
}
componentDidUpdate(){
    console.log("MapContainer Component did update");
}
static getDerivedStateFromProps(props,state){
    console.log("MapContainer getDerivedStateFromProps");
    console.log(props);
    console.log(state);
    return state;
}
getSnapshotBeforeUpdate(prevProps, prevState){
    console.log("MapContainer getSnapshotBeforeUpdate");
    console.log(prevProps);
    console.log(prevState);
	return prevState;
}
shouldComponentUpdate(nextProps,nextState){
    console.log("MapContainer shouldComponentUpdate");
    console.log(nextProps);
    console.log(nextState);
	console.log(`should MapContainer update: ${nextProps.coords.lat !== this.props.coords.lat && nextProps.coords.lng !== this.props.coords.lng}`);
    return (nextProps.coords.lat !== this.props.coords.lat &&
        nextProps.coords.lng !== this.props.coords.lng);
}
componentWillUnmount(){
    console.log("MapContainer ComponentWillInmount");
}

render(){
    console.log("MapContainder render");
    return(
        <div className = "map-overlay">
        <div id = "map">
        <Map
isMarkerShown
googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
loadingElement={<div style={{ height: `100%` }} />}
containerElement={<div style={{ height: `350px` }} />}
mapElement={<div style={{ height: `100%`, maxWidth: `500px`,
margin: `auto 0` }} />}
coords={this.props.coords}
/>
        </div>
        </div>
    );
}
}
