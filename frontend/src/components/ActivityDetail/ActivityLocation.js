import { useEffect } from 'react';
import L from 'leaflet'
import styled from '@emotion/styled'
import '../../styles/leaflet.css';

let mapInstance = null

const initMap = location => {	
	if(!location || !location.lat || !location.lng) {
		mapInstance = null
		
		return (
			<div></div>
		)
	}
	
	mapInstance = L.map('mapid', { 
		closePopupOnClick: false,
		boxZoom: false,
		doubleClickZoom: false,
		dragging: false,
		zoomControl: false
	}).setView([location.lat || 51.505, location.lng || -0.09], 13);

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

	L.marker([location.lat, location.lng], { icon: myIcon }).addTo(mapInstance)

	/*L.marker([location.lat, location.lng]).addTo(mapInstance)
		.addTo(mapInstance)
		.bindPopup('Lokace aktivity')
		.openPopup();*/
}

const ActivityLocation = ({ location }) => {
	useEffect(() => {    
		initMap(location)

		return () => {
			if(!mapInstance) return
			mapInstance.off()
			mapInstance.remove()
		}
  }, [location])

  return (
		<>
			<h2>MAP</h2>
			<Map id="mapid" className="MapPicker"></Map>
		</>
  )
}

const Map = styled.div`	
	margin: 0 auto;
	width: 20vw;
	height: 20vh;	
`

export default ActivityLocation