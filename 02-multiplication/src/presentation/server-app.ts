import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

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

        const wasCreated = new SaveFile().
        execute({
            fileContent: table, 
            fileName: `${base}`,
            fileDestination: `${'outputs'}/${base}`
        });

        if(wasCreated) console.log('File created!');
        else console.log('Error creating file!');
    }
}
