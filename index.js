// Wir importieren unsere Table-Klasse
const Table = require('./src/Table');

// Wir erstellen unsere Columns
const columns = 
[
    {
        key: 'id',
        title: '#',
        width: 10
    },
    {
        key: 'name',
        title: 'Name',
        width: 25
    },
    {
        key: 'group',
        title: 'Gruppe',
        width: 15
    },
    {
        key: 'role',
        title: 'Rolle',
        width: 50
    },
];

// Wir erstellen unsere Rows

const rows = 
[
    {
        id: 1,
        name: 'Jana',
        group: 'Klasse',
        role: 'Schüler'
    },
    {
        id: 2,
        name: 'Paul',
        group: 'Management',
        role: 'Class Manager'
    },
    {
        id: 3,
        name: 'Mandy',
        group: 'Klasse',
        role: 'Assistant'
    }
];


//Wir erstellen eine Instanz von Table 
const table = new Table({
    title: "Unsere Tabelle",
    width: 100,
    columns,
    rows
    // shortcode, statt columns = columns; nimmt die Variable die genauso heißt und packt sie da drauf! 

});

// Wir erwarten, dass die Table-Klasse ausgegeben wird
// console.log(table);

// Wir erwarten, dass der Ttitel in der Mitte ausgegeben wird
// console.log(table.createTitle());

// Wir erwarten, dass uns eine Spalte ausgegeben wird
/* console.log(table.createColumn('Hallo Welt', 35));
console.log(table.createColumn('Hallo Klasse', 35)); */

// Wir erwarten, dass uns eine ganze Zeile ausgegeben wird
// console.log(table.createRow(rows[0]));

// console.log("=".repeat(process.stdout.columns));


table.showTable();
