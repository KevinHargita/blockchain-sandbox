import sha256 from '@cryptography/sha256'

const initialState = [{
    blockName: 'Genesis Block',
    data: 'Hello World',
    hash: sha256(`${0}Hello World${0}`, 'hex'),
    nonce: 0
}];

const hashReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CALCULATE_BLOCK_HASH': {
            let newState = [...state]
            newState[action.payload.blockNumber] = {
                ...newState[action.payload.blockNumber],
                data: action.payload.data
            };
            newState.forEach((block, i) => {
                const previousHash = i > 0 ? newState[i - 1].hash : '0';
                newState[i] = {
                    ...block,
                    hash: sha256(`${previousHash}${block.data}${block.nonce}`, 'hex')
                }
            });
            return newState;
        }
        case 'CREATE_BLOCK': {
            return [
                ...state,
                {
                    blockName: `Block #${state.length}`,
                    data: 'New Block',
                    hash: '',
                    nonce: 0
                }
            ].map((block, i) => {
                const previousHash = i > 0 ? state[i - 1].hash : '0';
                return {
                    ...block,
                    hash: sha256(`${previousHash}${block.data}${block.nonce}`, 'hex')
                }
            });
        }   
        case 'MINE_BLOCK': {
            const blockNumber = action.payload.blockNumber;
            const previousHash = blockNumber > 0 ? state[blockNumber - 1].hash : '0';
            const data = state[blockNumber].data;
            let hash = state[blockNumber].hash;
            let nonce = 0;
            while (hash.substring(0, 4) !== '0000'){
                nonce++;
                hash = sha256(`${previousHash}${data}${nonce}`, 'hex');
            }

            let newState = [...state]
            newState[action.payload.blockNumber] = {
                ...newState[action.payload.blockNumber],
                nonce: nonce
            };
            newState.forEach((block, i) => {
                const previousHash = i > 0 ? newState[i - 1].hash : '0';
                newState[i] = {
                    ...block,
                    hash: sha256(`${previousHash}${block.data}${block.nonce}`, 'hex')
                }
            });
            return newState;
        }
        default:
            return state;
    }
}

export default hashReducer;