import { useState } from 'react';
import { navigate } from '@reach/router'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import MapPicker from './MapPicker'
import DatePicker from './DatePicker'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import xss from 'xss'

const AddActivity = ({ comingFromHomepage, storeActivity, reloadActivities }) => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState({})
  const [datetime, setDatetime] = useState(new Date())
  const [description, setDescription] = useState('')

  const addActivity = async () => { 
    if(!title){
      alert("Please enter title")
      return
    }

    console.info("addActivity description", description)  
    const sanitizedDescription = xss(description)
    const sanitizedTitle = xss(title)
    console.info("sanitizedDescription", sanitizedDescription)  

    await storeActivity({ title: sanitizedTitle, location, description: sanitizedDescription, datetime })    
    reloadActivities()
    navigate('/activities')
  }

  const changeDescription = value => { 
    console.info("changeDescription value", value)
    setDescription(value)
    console.info("description", description)
  }

  return (
    <Section className="AddActivity">
      <BtnWrapper>
        {comingFromHomepage ? '' :
          <button className="secondary" onClick={() => navigate('/activities')}>Back</button>
        }
        <button onClick={addActivity}>Save activity</button>
      </BtnWrapper>
      <TopBlock>        
        <InputBlock>
          <Input type="text" onChange={e => setTitle(e.target.value)} placeholder="Enter the activity name"/>
          <DatePicker datetime={datetime} setDatetime={setDatetime} />
        </InputBlock>

        <MapPicker location={location} setLocation={setLocation} />
      </TopBlock>
      <DescriptionBlock>
        <ReactQuill value={description} onChange={changeDescription} />       
      </DescriptionBlock>
      
    </Section>
  )
}
//onchange={value => changeDescription(value)}  
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
const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Section = styled.section`
  display: grid;
  //grid-template-rows: 400px 300px auto auto;
  grid-template-rows: auto minmax(250px, 25vh) minmax(350px, 40vh);
  flex-direction: row;
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px 50px;
  //gap: 1rem;
  @media (max-width: 800px){    
    grid-template-rows: auto minmax(450px, 45vh) minmax(350px, 40vh);
  }
`

const TopBlock = styled.section`
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 2rem;
  //gap: 1rem;
  @media (max-width: 800px){    
    grid-template-columns: 100%;    
  }
`

const InputBlock = styled.section`
  //display: grid;

`

const DescriptionBlock = styled.section`
  //display: grid;
  //grid-template-columns: 50% 50%;
  /*.quill {
    height: max(35vh, 300px);
  }*/
  
  .ql-editor {
    min-height: max(30vh, 20rem);
  }

  .ql-formats button {
    margin-top: 0;
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

export default AddActivity