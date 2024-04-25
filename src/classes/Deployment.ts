type Deployment = {
    owner?: string;
    deployment?: [{
        name?: string;
        address?: string;
        deployHash?: string;
        blockNumber?: number;
        abi?: [];
        bytecode?: string;
    },]
}