import { useState } from 'react';

const AddActivity = ({ storeActivity }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const saveActivity = () => {    
    storeActivity({ title, description })
  }

  return (
    <section className="AddActivity">
      <h2>Activity title</h2>
      <input type="text" onChange={e => setTitle(e.target.value)} />
      <h2>Activity description</h2>
      <textarea name="" id="" cols="30" rows="5" onChange={e => setDescription(e.target.value)}></textarea>
      <button onClick={saveActivity}>Uložit</button>
    </section>
  )
}

export default AddActivity