import { TsWorkerState } from './constants';

export type TsWorkerEvent = {
    status: TsWorkerState;
    result: any;
    statistics?: {
        started: number;
        ended: number;
    };
    message?: string;
}