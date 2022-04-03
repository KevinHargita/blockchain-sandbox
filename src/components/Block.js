import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hashAction, mineBlockAction } from '../actions';
import { Card, CardContent, CardHeader, TextField, Chip } from '@mui/material';
import styled from '@emotion/styled'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';


const CardOuter = styled.div`
    margin: 0px auto;
    padding: 50px 0px;
    width: 400px;
`;

function Block(props) {
    const dispatch = useDispatch();

    const data = useSelector((state) => {
        return state.hashReducer[props.blockNumber]
    });

    const [state, setState] = useState({
        data: data.data,
        hash: data.hash
    });

    useEffect(() => {
        dispatch(hashAction({
            data: state.data,
            blockNumber: props.blockNumber
        }))
    },[state.data]);
    

    return (
        <ThemeProvider theme={theme}>
            <CardOuter>
                <Card>
                    <CardHeader 
                        title={props.blockName}
                        sx={{
                            color: 'text.main',
                            backgroundColor: 'primary.main'
                        }}
                    />
                    <CardContent>
                        <TextField 
                            label='Payload'
                            multiline={true}
                            minRows='2'
                            margin='dense'
                            fullWidth
                            value={data.data}
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    data: e.target.value
                                });
                            }}
                        />
                        <TextField
                            label='Hash'
                            value={data.hash}
                            margin='dense'
                            minRows='2'
                            multiline={true}
                            fullWidth
                        />
                        <Chip 
                            color={data.hash.substring(0, 4) === '0000' ? 'success' : 'error'}
                            label={data.nonce}
                            onClick={() => {
                                dispatch(mineBlockAction(props.blockNumber));
                            }} 
                        >
                        </Chip>
                    </CardContent>
                </Card> 
            </CardOuter>     
        </ThemeProvider>
    );
}

export default Block;