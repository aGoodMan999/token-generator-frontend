type Deployment = {
    owner?: string;
    deployment?: [{
        network?: {
            chainId?: number | null;
            name?: string | null;
        }
        name?: string;
        address?: string;
        deployHash?: string;
        blockNumber?: number;
        timeStamp?: number;
        abi?: [];
        bytecode?: string;
    },]
}