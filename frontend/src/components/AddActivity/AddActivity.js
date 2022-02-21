import { useState } from 'react';
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import MapPicker from './MapPicker'
import DatePicker from './DatePicker'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const AddActivity = ({ storeActivity, initActivities, setScreen, setActivities }) => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState({})
  const [datetime, setDatetime] = useState(new Date())
  const [description, setDescription] = useState('')

  const addActivity = async () => {    
    await storeActivity({ title, location, description, datetime })
    let act = await initActivities()    
    setActivities(act)
    setScreen('activities')
  }

  return (
    <Section className="AddActivity">
      <BackWrapper>
        <button onClick={addActivity}>Save activity</button>
      </BackWrapper>
      <TopBlock>        
        <InputBlock>
          <Input type="text" onChange={e => setTitle(e.target.value)} placeholder="Enter the activity name" />
          <DatePicker datetime={datetime} setDatetime={setDatetime} />
        </InputBlock>

        <MapPicker location={location} setLocation={setLocation} />
      </TopBlock>
      <DescriptionBlock>
        <ReactQuill value={description} onchange={value => setDescription(value)} />        
      </DescriptionBlock>
      
    </Section>
  )
}

/*
  <SaveWrapper>
    <button onClick={addActivity}>Save</button>
  </SaveWrapper>
*/

const borderStyle = () =>
css`	
	border: 1px solid #111111;
  border-radius: 5px;
`
const BackWrapper = styled.div`
  display: flex;
  justify-content: end;
`
const SaveWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`

const Section = styled.section`
  display: grid;
  //grid-template-rows: 400px 300px auto auto;
  grid-template-rows: auto minmax(250px, 25vh) minmax(350px, 40vh);
  flex-direction: row;
  max-width: 1000px;
  margin: 0 auto;
  //gap: 1rem;
`

const TopBlock = styled.section`
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 2rem;
  //gap: 1rem;
`

const InputBlock = styled.section`
  //display: grid;

`

const DescriptionBlock = styled.section`
  //display: grid;
  //grid-template-columns: 50% 50%;
  .quill {
    height: max(35vh, 300px);
  }
`

const Input = styled.input`	
  width: 400px;
  height: 60px;  
  padding: 0 5px;
  line-height: 1;
  font-size: 1.8rem;
  ${borderStyle}
`

const Text = styled.textarea`	
  width: 75%;
  min-height: 200px;
  height: 30vh;
  ${borderStyle}
  padding: 5px;
`

export default AddActivity