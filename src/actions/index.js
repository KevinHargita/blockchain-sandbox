export const hashAction = (payload) => {
    return {
        type: 'CALCULATE_BLOCK_HASH',
        payload: {
            data: payload.data,
            blockNumber: payload.blockNumber
        }
    }
}

export const createBlockAction = () => {
    return {
        type: 'CREATE_BLOCK'
    }
}

export const mineBlockAction = (blockNumber) => {
    return {
        type: 'MINE_BLOCK',
        payload: {
            blockNumber: blockNumber
        }
    }
}