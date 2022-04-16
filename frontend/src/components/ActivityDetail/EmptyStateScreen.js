import styled from '@emotion/styled'

const EmptyStateScreen = () => {	
  return (
		<Wrapper>
      Select activity!
		</Wrapper>	
	)
}

const Wrapper = styled.div`	
	display: flex;
  padding-top: 50px;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px){    
    display: none;
  }
`


export default EmptyStateScreen