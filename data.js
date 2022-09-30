import csvjson from 'csvjson';
import fs from 'fs';

fs.readFile('./f1scrapingdata.json', 'utf-8', (err, fileContent) => {
    if(err){
        console.log(err)
        throw new Error(err)
    }

    //convert json to csv

    const csvData = csvjson.toCSV(fileContent, {
        headers : 'key'
    });

    fs.writeFile('./f1driverdata.csv',csvData,(err) => {
        if(err){
            console.log(err)
            throw new Error(err)
        }
        console.log("Converted Sucessfully")
    });
})