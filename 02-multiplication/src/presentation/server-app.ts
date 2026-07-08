import * as fs from 'node:fs';
import * as path from 'node:path';
import { CreateTable } from '../domain/use-cases/create-table.use-case';

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    destination: string;
}

export class ServerApp {

    static run({ base, limit, showTable} : RunOptions){
        console.log('ServerApp running...');

        const table = new CreateTable().execute({base, limit});
        if(showTable) console.log(table);
    }
}
