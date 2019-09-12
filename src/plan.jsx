import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

export default function Plan() {
  //Solution trouvée sur le net pour palier au fait que l'icone par défaut de posistion ne s'affiche pas
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  });
  //fin de solution

  //j'enregistre la position centrale du parcours
  const [getPosition, setPosition] = useState({ lat: "50.471066", lng: "4.468738", zoom: "17" });
  const position = [getPosition.lat, getPosition.lng];

  //position du user
  const [getUserPosition, setuserPosition] = useState();

  const userposition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // Get la position de l'utilisateur.
        setuserPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        console.log(position);
      });
    } else {
      alert("Vous devez accepter la géolocalisation pour que l'app fonctionne !");
    }
  };

  return (
    <Map style={{ height: "100vh", width: "100vw" }} center={position} zoom={getPosition.zoom}>
      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
}

//A REGARDER POUR ESSAYER DE TRIGGER LA POSITION DU USER
// componentDidMount() {
//     const { region } = this.state;

//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//           this.setState({position});
//         },
//         (error) => alert(JSON.stringify(error)),
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );

//     this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
//         var { distanceTotal, record } = this.state;
//         this.setState({lastPosition});
//         if(record) {
//             var newLatLng = {latitude:lastPosition.coords.latitude, longitude: lastPosition.coords.longitude};

//             this.setState({ track: this.state.track.concat([newLatLng]) });
//             this.setState({ distanceTotal: (distanceTotal + this.calcDistance(newLatLng)) });
//             this.setState({ prevLatLng: newLatLng });
//         }
//     },
//     (error) => alert(JSON.stringify(error)),
//     {enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 10});
// }
