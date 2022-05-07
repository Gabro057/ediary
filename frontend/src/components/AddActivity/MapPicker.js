import { useEffect } from 'react';
import L from 'leaflet'
import styled from '@emotion/styled'
import '../../styles/leaflet.css';

var mapInstance = null

const initMap = (lat, lng, setLat, setLng) => {
	mapInstance = L.map('mapid')

	window.navigator.geolocation.getCurrentPosition(position => {
		if (!mapInstance) return
		
		let lat = position.coords.latitude
		let lng = position.coords.longitude
		
		mapInstance = mapInstance.setView([lat, lng], 13);
		
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

		L.marker([lat, lng], { icon: myIcon }).addTo(mapInstance)
			
			/*
				L.marker([location.lat || lat, location.lng || lng], { icon: myIcon }).addTo(mapInstance)
			.addTo(mapInstance)
			.bindPopup('Lokace aktivity')
			.openPopup();
			*/

			mapInstance.on('click', e => {
				//console.log(e.latlng)
				setLat(e.latlng.lat)
				setLng(e.latlng.lng)

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

const MapPicker = ({ lat, lng, setLat, setLng }) => {
	useEffect(() => {    
		initMap(lat, lng, setLat, setLng)

		return () => {			
			if(!mapInstance) return
			mapInstance.off()
			mapInstance.remove()
		}
  }, [lat, lng, setLat, setLng])

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