import React from 'react';
import { useEffect } from 'react';
import L from 'leaflet'
import styled from '@emotion/styled'
import '../../styles/leaflet.css';

let mapInstance = null

const initMap = (lat, lng) => {	
	if(!lat || !lng) {
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
		zoomControl: false,
		scrollWheelZoom: false
	}).setView([lat || 51.505, lng || -0.09], 13);

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
}

const ActivityLocation = ({ lat, lng }) => {
	useEffect(() => {    
		initMap(lat, lng)

		return () => {
			if(!mapInstance) return
			mapInstance.off()
		}
  }, [lat, lng])

	if(lat == null) return (<></>)
	else {
		return (				
			<Map id="mapid" className="MapPicker"></Map>
		)
	}
}

const Map = styled.div`	
	margin-left: 50px;
	max-width: 55vw;
	width: 850px;
	max-height: 30vh;	
	height: 400px;
`

export default ActivityLocation