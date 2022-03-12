import styled from '@emotion/styled'

const EmptyStateScreen = ({  }) => {	
  return (
		<Wrapper>
      Select activity!
		</Wrapper>	
	)
}

const Wrapper = styled.div`	
	display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px){    
    display: none;
  }
`


export default EmptyStateScreen