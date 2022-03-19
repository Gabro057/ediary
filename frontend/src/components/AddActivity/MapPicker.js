import { useEffect } from 'react';
import L from 'leaflet'
import styled from '@emotion/styled'
import '../../styles/leaflet.css';

var mapInstance = null

const initMap = (location, setLocation) => {
	mapInstance = L.map('mapid')

	window.navigator.geolocation.getCurrentPosition(position => {
		if (!mapInstance) return
		
		let lat = position.coords.latitude
		let lng = position.coords.longitude
		
		mapInstance = mapInstance.setView([location.lat || lat, location.lng || lng], 13);
		
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(mapInstance);
		
		const myIcon = L.icon({
			iconUrl: '/img/marker-icon-2x.png',
			iconSize: [38, 65],
			iconAnchor: [22, 64]
			//popupAnchor: [-3, -76]
			//shadowUrl: 'my-icon-shadow.png',
			//shadowSize: [68,95],
			//shadowAnchor: [22, 94]
		})

		L.marker([location.lat || lat, location.lng || lng], { icon: myIcon }).addTo(mapInstance)
			
			/*
				L.marker([location.lat || lat, location.lng || lng], { icon: myIcon }).addTo(mapInstance)
			.addTo(mapInstance)
			.bindPopup('Lokace aktivity')
			.openPopup();
			*/

			mapInstance.on('click', e => {
				//console.log(e.latlng)
				setLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
				const popup = L.popup()
				popup	
					.setLatLng(e.latlng)
					.setContent("Umístění aktivity:" + e.latlng.toString())
					.openOn(mapInstance)
			})
	}, error => {
		console.error(error)
	},{

	})	
}

const MapPicker = ({ location, setLocation }) => {
	useEffect(() => {    
		initMap(location, setLocation)

		return () => {			
			mapInstance.off()
			if(mapInstance) mapInstance.remove()
		}
  }, [location, setLocation])

  return (
		<Map id="mapid" className="MapPicker"></Map>		
  )
}

const Map = styled.div`	
	//max-width: 50vw;
	width: 100%;
	//max-height: 30vh;	
	height: 10rem;		
`

export default MapPicker