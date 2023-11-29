import {CommunicationProtocolEnum, DaprClient, LogLevel} from '@dapr/dapr';

class StoreItem<T> {
    constructor(public key: string, public value: T) {
    }
}

class StoreRequest<T> {
    constructor(public items: StoreItem<T>[]) {
    }
}

export class StateStore {
    private readonly _storename = 'statestore';
    private readonly _client: DaprClient;
    constructor() {
        this._client = new DaprClient({
            communicationProtocol: CommunicationProtocolEnum.GRPC,
            daprHost: process.env.DAPR_HOST || 'localhost',
            daprPort: process.env.DAPR_PORT || '3601',
            logger: {
                level: LogLevel.Verbose
            }
        });
    }

    public async store<T>(storeRequest: StoreRequest<T>) {
        return this._client.state.save(this._storename, storeRequest.items);
    }
}
