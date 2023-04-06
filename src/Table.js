// Wir schreiben ein Programm zum anzeigen von Tabellen in der Konsole.


// Wir benötigen eine Klasse, die die komplette Applikation beinhaltet.
/**
 * @class Table
 * @description Ein Programm zum erstellen von Tabellen in der Konsole
 * @example
 * const table = new Table();
 */
class Table 
{
    // Wir nennen die Klasse Table, da wir eine Tabelle damit erstellen wollen, und das der sinnvollste Name (laut Konvention) ist.
    tableTitle;
    tableWidth;
    tableColumns;
    tableRows;

    /**
     * @constructor
     */
    constructor({ title, width, columns, rows } = {})
    {
        // Die Klasse sollte ein Konfigurationsobjekt in den Constructor bekommen, um dynamisch einstellbar zu sein.
        // Wir brauchen eine Property, die den Namen der Tabelle angibt, denn wir wollen diesen über der Tabelle stehen haben. 
        // Wir brauchen eine Property, die die Breite der Tabellen angibt, der defaultwert sollte die Breite der Konsole sein.
        // Wir brauchen eine Property, die alle Columns der Tabelle und dessen Werte beinhaltet.
        // Wir brauchen eine Property, die alle Rows der Tabelle beinhaltet. 
        this.tableTitle = title || "Default Table";
        this.tableWidth = width || process.stdout.columns; // der Default gibt uns die Breite des Terminals in Zeichen zurück
        this.tableColumns = columns || [];
        this.tableRows = rows || [];
    }
    // Die Klasse sollte getter und setter haben, um diese Einstellungen ggf. ändern zu können.
        // Wir brauchen getter/ setter für den Tabellentitel
        // Wir brauchen getter / setter für die Tabellenbreite
        // Wir brauchen getter / setter für die Columns
        // Wir brauchen getter / setter für die Rows
//  getTitle = () => this.tableTitle;
//  getWidth = () => this.tableWidth;
//  getColumns = () => this.tableColumns;
//  getRows = () => this.tableRows;

    get title() { return this.tableTitle }
    get width() { return this.tableWidth }
    get columns() { return this.tableColumns }
    get rows() { return this.tableRows }

    set title(input) { this.tableTitle = input }
    set width(input) { this.tableWidth = input }
    set columns(input) { this.tableColumns = input }
    set rows(input) { this.tableRows = input }

    // Die Klasse sollte Methoden haben, um einige Berechnungen zu machen. 
        // Wir brauchen eine Methode, die den Titel anzeigt, und dafür sorgt, das dieser horizontal zentriert über der Tabelle steht. 
    /**
     * @method createTitle
     * @description Erstellt den zentrierten Titel über der Tabelle
     * @return { string }
     */
    createTitle = () => 
    {
        const padding = Math.round((this.width - this.title.length) / 2);

        // Wir erwarten das Padding eine Zahl ausgibt, diese Zahl sollte die Hälfte der Breite des Terminals minus die Hälfte der Länge des Titels sein.
        // console.log(padding);

        return `\n${ ' '.repeat(padding) }${ this.title }${ ' '.repeat(padding) }`;
    }
        // Wir brauchen eine Methode, die eine Spalte erstellt
        /**
         * @method createColumn
         * @description Erstellt eine Spalte in der angegebenen Breite mit dem Text, der in der Spalte stehen soll
         * @param { string } text 
         * @param { number } width
         * @return { return } 
         */
    createColumn = (text, width) => 
    {
        // Wir erstellen eine Berechnung, um die Spaltenbreite dadurch zu bekommen, das wir die angegebene Spaltenbreite minus dem Inhalt der Spalte rechnen
        const columnWidth = width - text.toString().length;

        /* console.log(columnWidth); */

        // AAAAAAAAAAAAAAA = width
        // AAAAAAAAA       = width - textLänge
        // AAAAAA          = width - textLänge - 3
        // HALLO WELT      = text
        //   HALLO WELTA   = ergebnis
        return ' ' + text.toString() + ' '.repeat(columnWidth - 3) + '|';
    }

        // Wir brauchen eine Methode, die eine Zeile erstellt, und die jeweiligen Spalten dort einfügt.

    /**
     * @method createRow
     * @description erstellt eine Zeile, die die jeweiligen Spalten nebeneinander darstellt
     * @param { object } rows
     * @returns { string }
     */
    createRow = (rows) =>
    {
        // Wir erstellen eine Variable, in die wir die Inhalte der Zeile speichern und beginnen sie mit der linken Pipe. 
        let tempString = '|';
      // let width = this.width;

        for(let row in rows)
        {
            // row = Schlüssel
            // rows = die Sammlung
            // rows[row] = Schlüssel von Sammlung = Value
            let width = this.width;

            this.columns.forEach((column, i) => 
            {
                if(column.key === row)
                {
                    // die ersten Spalten
                    if(this.columns.length === i + 1)
                    {
                        tempString += this.createColumn(rows[row], width + 2);
                    }
                    // die letzte Spalte
                    else 
                    {
                        tempString += this.createColumn(rows[row], column.width);
                    }
                }
                width -= column.width;
            });
        }

        return tempString;
    }
        // Wir brauchen eine Methode, die den Tabellenheader erstellt, also die Schlüssel über dem Spalteninhalt
        /**
         * @method createHeader
         * @description erstellt den Header
         * @returns { string }
         */
        createHeader = () => 
        {
            let tempString = '|';
            let width = this.width

            this.columns.forEach((column, i) => {

                if(this.columns.length === i + 1)
                {
                    tempString += this.createColumn(column.title, width + 2);
                }
                else 
                {
                    tempString += this.createColumn(column.title, column.width);
                }

                width -= column.width;

            });

            return tempString;
        }

        // Wir brauchen eine Methode, die den divider erstellt
        /**
         * @method createDivider
         * @description erstellt den Divider, mit den definierten der Spalten
         * @returns { string }
         */
        createDivider = () => 
        {
            let tempString = '|';
            let width = this.width;

            this.columns.forEach((column, i) =>
            {
                if(this.columns.length === i + 1)
                {
                    tempString += '-'.repeat(width) + '|';
                }
                else 
                {
                    tempString += '-'.repeat(column.width - 2) + '|';
                }
                width -= column.width;

            }); 
            return tempString;
        }

        // Wir brauchen eine Methode, die die Tabelle anzeigt.
    /**
     * @method showTable
     * @description fügt alles zusammen und gibt es im Terminal aus
     */
    showTable = () => 
    {
        // Wir geben den Titel der Tabelle aus
        console.log(this.createTitle());

        // Wir geben die Headerzeile aus
        console.log(this.createHeader());

        // wir geben den Divider aus
        console.log(this.createDivider());

        // Wir geben jede Zeile der Tabelle aus
        this.rows.forEach((row, i) =>
        {
            console.log(this.createRow(row));
        });

        // am Ende fügen wir noch eine leere Zeile ein
        console.log();
    }
}

// Wir müssen die Klasse exportieren, um an ihre Inhalte zu kommen, und das Programm zu starten. 
module.exports = Table;

