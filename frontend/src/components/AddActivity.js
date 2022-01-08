import { useState } from 'react';
import MapPicker from './AddActivity/MapPicker'

const AddActivity = ({ storeActivity, initActivities, setScreen, setActivities }) => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState({})
  const [description, setDescription] = useState('')

  const addActivity = async () => {    
    await storeActivity({ title, location, description })
    let act = await initActivities()    
    setActivities(act)
    setScreen('activities')
  }

  return (
    <section className="AddActivity">
      <h2>Activity title</h2>
      <input type="text" onChange={e => setTitle(e.target.value)} />
      <MapPicker location={location} setLocation={setLocation} />
      <h2>Activity description</h2>
      <textarea name="" id="" cols="30" rows="5" onChange={e => setDescription(e.target.value)}></textarea>
      <button onClick={addActivity}>Uložit</button>
    </section>
  )
}

export default AddActivity