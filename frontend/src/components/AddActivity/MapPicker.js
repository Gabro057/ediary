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
		
		L.marker([location.lat || lat, location.lng || lng]).addTo(mapInstance)
			.addTo(mapInstance)
			.bindPopup('Lokace aktivity')
			.openPopup();

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
    console.info("componentDidMount")
		initMap(location, setLocation)

		return () => {
			console.log('componentUnmount')
			mapInstance.off()
			mapInstance.remove()
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