import { TsWorkerState } from './constants';
import { TsWorkerJob } from './ts-worker-job';
import Worker from 'web-worker';

export class TsWorker {
    private readonly blobURL: string;
    private worker: Worker;

    private status: TsWorkerState = TsWorkerState.INITIALIZED;

    constructor() {
        // creates a worker that runs a job
        this.blobURL = URL.createObjectURL(new Blob([
                this.getWorkerScript()
            ],
            {
                type: 'application/javascript'
            }
        ));
        this.worker = new Worker(this.blobURL);
    }

    public run = (job: TsWorkerJob): Promise<any> => {
        return new Promise<any>(
            (resolve, reject) => {
                this.worker.onmessage = (ev: MessageEvent) => {
                    job.statistics.ended = Date.now();
                    this.status = ev.data.status;
                    ev.data.statistics = job.statistics;
                    resolve(ev.data);
                };

                this.worker.onerror = (err) => {
                    job.statistics.ended = Date.now();
                    this.status = TsWorkerState.FAILED;

                    reject({
                        status: TsWorkerState.FAILED,
                        message: err,
                        statistics: job.statistics
                    });
                };

                job.statistics.started = Date.now();
                this.worker.postMessage({
                    command: 'run',
                    args: [this.convertJobToObj(job)]
                });
            }
        );
    }

    private convertJobToObj(job: TsWorkerJob) {
        return {
            id: job.id,
            args: job.args,
            doFunction: job.doFunction.toString()
        };
    }

    /**
     * destroys the Taskmanager if not needed anymore.
     */
    public destroy() {
        URL.revokeObjectURL(this.blobURL);
    }

    private getWorkerScript(): string {
        return `var job = null;
var base = self;
onmessage = function (msg) {
    var data = msg.data;
    var command = data.command;
    var args = data.args;
    switch (command) {
        case("run"):
            base.job = args[0];
            var func = new Function("return " + base.job.doFunction)();
            func(base.job.args).then(function (result) {
                base.postMessage({
                    status: "finished",
                    result: result
                });
            }).catch(function (error) {
                base.postMessage({
                    type: "failed",
                    message: error
                });
            });
            break;
        default:
            base.postMessage({
                status: "failed",
                message: "invalid command"
            });
            break;
    }
}`;
    }
}