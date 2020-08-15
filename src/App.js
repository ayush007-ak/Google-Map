import React from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Descriptions } from 'antd';
import './App.css';
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';


Geocode.setApiKey("AIzaSyCsuTVoiry28gOeZVpXFTtV0htkV-dPxJ0")

class App extends  React.Component {

state={
  address:"",
  city:"",
  area:"",
  state:"",
  zoom:15,
  height:500,
  mapPosition:{
    lat:0,
    lng:0,
  },
  markerPosition:{
    lat:0,
    lng:0,
  }
}




//declare honge yaha value
getCity = (addressArray) => {
  let city ='';
  for(let index=0; index < addressArray.length; index++){
    if(addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]){
      city = "Upper Lachin Shire Council";
      return city;
    }
  }
}


getArea = (addressArray) => {
  let area='';
  for (let index = 0; index < addressArray.length; index++){
    if(addressArray[index].types[0]){
      for(let j=0; j< addressArray.length; j++){
        if('sublocality_level_1' === addressArray[index].types[j] || 'locality' === addressArray[index].types[j]){
          area= addressArray[index].long_name;
          return area;
        }
      }
    }
  }
}


getState = (addressArray) => {
  let state = '';
  for (let index=0; index < addressArray.length; index++){
    for(let index=0; index < addressArray.length; index++){
      if (addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]){
        state = addressArray[index].long_name;
        return state;
      }
    }
  }
}


onMarkerDragEnd = (event) => {
let newLat = event.latLng.lat();
let newLng =event.latLng.lng();


Geocode.fromLatLng(newLat, newLng)
.then(response => {
  console.log('response', response)
  const address = response.results[0].formatted_address,
  addressArray = response.results[0].address_components,
  city = this.getCity(addressArray),
  area=this.getArea(addressArray),
  state=this.getState(addressArray)     
  
  
  
                                                                                       //variables banae ha
      this.setState({
        address: (address)? address: "",
        area: (area) ? area: "",
        city: (city) ? city: "",
        state: (state) ? state : "",
        markerPosition: {
          let : newLat,
          lng: newLng

        },

        mapPosition: {
          let : newLat,
          lng: newLng

        },
        
      })                                                                                
})

}


onPlaceSelected= (place) => {
  const address = place.formatted_address,
  addressArray = place.address_components,
  city = this.getCity(addressArray),
  area= this.getArea(addressArray),
  state= this.getState(addressArray),
  newLat = place.geometry.location.lat(),
  newLng=place.geometry.location.lng();



  this.setState({
    address: (address)? address: "",
    area: (area) ? area: "",
    city: (city) ? city: "",
    state: (state) ? state : "",
    markerPosition: {
      let : newLat,
      lng: newLng

    },

    mapPosition: {
      let : newLat,
      lng: newLng

    },
    
  })           
}


  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
        draggable={true}
        onDragEnd={this.onMarkerDragEnd}    //location wala marker ke leye jisse vo move ho sake drag and drop wala location
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }} >

         <InfoWindow>
           <div>find places</div>
         </InfoWindow>


          </Marker>



       <AutoComplete  
       style={{ width: "100%", height:'40px', paddingLeft:16, marginTop:2, marginBottom: '2rem'}}
       types= {['(regions)']}
       onPlaceSelected={this.onPlaceSelected}
       />

       

                
      </GoogleMap>
    ));


    return (
      <>
    <div style={{padding:'1rem', margun: '0 auto', maxwidth: 1000}}>

     
      <h1>Google Map Basic</h1>
    <Descriptions  bordered>
    <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
    <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
    <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
    </Descriptions>
   
    
<MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsuTVoiry28gOeZVpXFTtV0htkV-dPxJ0&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
</div>
</>

    
      );
  }
 
}

export default App;
