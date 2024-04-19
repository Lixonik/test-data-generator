export class TsWorkerJob {
    get statistics(): { ended: number; started: number } {
        return this._statistics;
    }

    set statistics(value: { ended: number; started: number }) {
        this._statistics = value;
    }

    get args(): any[] {
        return this._args;
    }

    get id(): number {
        return this._id;
    }

    private static jobIDCounter = 0;
    private _id: number;
    private _args: any[] = [];

    private _statistics = {
        started: -1,
        ended: -1
    };

    constructor(doFunction: (args: any[]) => Promise<any>, args: any[]) {
        this._id = ++TsWorkerJob.jobIDCounter;
        this.doFunction = doFunction;
        this._args = args;
    }

    doFunction = (args: any[]) => {
        return new Promise<any>((resolve, reject) => {
            reject('not implemented');
        });
    }
}