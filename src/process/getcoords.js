import Papa from 'papaparse';

async function GetData(csv) {
    const data = Papa.parse(await fetchCsv(csv));
    console.log(data);
    return data;
}

async function fetchCsv(csvs) {
    // const response = await fetch('data/mycsv.csv');
    // the csv files are in the public folder
    const response = await fetch(csvs);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}

export default GetData;