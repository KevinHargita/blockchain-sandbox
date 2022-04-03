import Block from './Block';
import { Button, Box, AppBar, Toolbar, Container, Typography, ThemeProvider } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useSelector, useDispatch } from 'react-redux';
import { createBlockAction } from '../actions';
import { theme } from '../theme';

function App() {

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.hashReducer;
  });

  const renderNewBlockButton = () => {
    if (state.length <= 10) {
      return (
        <Box 
          textAlign='center'  
        >
          <Button 
            variant='contained'
            color='primary'
            onClick={() => {
              dispatch(createBlockAction());
            }}
          >
            Add Block
          </Button>
        </Box>
      )
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              Blockchain Sandbox
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          {state.map((block, i) => {
            if (i === (state.length - 1)){
              return  (
                <Block 
                  blockName={block.blockName}
                  blockNumber={i}
                />
              )
            }
            else{
              return  (
                <>
                  <Block 
                    blockName={block.blockName}
                    blockNumber={i}
                  />
                  <Box 
                    textAlign='center'
                  >
                    <KeyboardDoubleArrowDownIcon
                      color='primary'
                      fontSize='large'
                    />
                  </Box>
                </>
              )
            }
          })}

          {renderNewBlockButton()}
          
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
