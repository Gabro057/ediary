import { useState } from 'react';

const AddActivity = ({ storeActivity, initActivities, setScreen, setActivities }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const addActivity = async () => {    
    await storeActivity({ title, description })
    let act = await initActivities()    
    setActivities(act)
    setScreen('activities')
  }

  return (
    <section className="AddActivity">
      <h2>Activity title</h2>
      <input type="text" onChange={e => setTitle(e.target.value)} />
      <h2>Activity description</h2>
      <textarea name="" id="" cols="30" rows="5" onChange={e => setDescription(e.target.value)}></textarea>
      <button onClick={addActivity}>Uložit</button>
    </section>
  )
}

export default AddActivity