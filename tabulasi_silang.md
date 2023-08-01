# Pembuatan Tabulasi Silang Data Tentang Penyebab serta Jumlah Kematian per-Tahun di Indonesia

## Instruksi

1. Buka Google Sheets menggunakan link berikut: [Data Kematian di Indonesia](https://docs.google.com/spreadsheets/d/1qrKm91qsGDLg6CyhL4qR8j2uG7qLzw-QU8kdi1bbvyA/edit?usp=sharing)

2. Klik pada menu "Extensions" dan pilih "Apps Script".

3. Salin dan tempelkan kode berikut ke dalam editor skrip di Apps Script:

```javascript
function typeAndYear() {
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName('Data');
  let numberRows = sheet.getDataRange().getNumRows();
  let numberCols = sheet.getLastColumn();

  let data = sheet.getRange(2, 1, numberRows - 1, numberCols).getValues();

  // Dapatkan tahun dan tipe yang unik
  let years = [];
  let types = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i][2];
    let type = data[i][1];
    if (years.indexOf(year) == -1) years.push(year);
    if (types.indexOf(type) == -1) types.push(type);
  }

  // Urutkan tahun secara ascending
  years.sort((a, b) => a - b);

  // Buat lembar baru
  let newSheet = ss.insertSheet('Kematian Berdasarkan Tahun dan Tipe');
  newSheet.getRange('A1').setValue('Tipe');
  for (let i = 0; i < years.length; i++) {
    newSheet.getRange(1, i + 2).setValue(years[i]);
  }

  // Hitung total dan tambahkan ke lembar baru
  for (let i = 0; i < types.length; i++) {
    let type = types[i];
    newSheet.getRange(i + 2, 1).setValue(type);
    for (let j = 0; j < years.length; j++) {
      let year = years[j];
      let totalKematian = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k][2] == year && data[k][1] == type) {
          totalKematian += Number(data[k][4]);
        }
      }
      newSheet.getRange(i + 2, j + 2).setValue(totalKematian);
    }
  }
}
```
4. Simpan skrip dengan mengklik ikon disket atau menggunakan kombinasi tombol Ctrl + S.

5. Klik pada ikon play (▶️) untuk menjalankan fungsi typeAndYear(). Anda akan diminta untuk memberikan izin akses ke skrip. Berikan izin yang diperlukan.

6. Setelah fungsi selesai berjalan, akan dibuatkan sheet baru dengan nama "Kematian Berdasarkan Tahun dan Tipe" yang berisi tabulasi silang data tentang jumlah kematian di Indonesia berdasarkan tahun dan tipe.

7. Maka akan didapatkan data hasil dari tabulasi silang tentang penyebab serta jumlah kematian per-tahun di Indonesia
| Type | 2000 | 2001 | 2002 | 2003 | 2004 | 2005 | 2006 | 2007 | 2008 | 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 |
| ----------- | :---------: | :----------: | :-----------: | :---------: | :----------: | :-----------: | :---------: | :----------: | :-----------: | :---------: | :----------: | :-----------: | :---------: | :----------: | :-----------: | :---------: | :----------: | :-----------: | :---------: | :----------: | :-----------: | :---------: | ----------: | 
| Bencana Alam | 0 | 0 | 0 | 0 | 166698 | 1973 | 6960 | 562 | 262 | 1447 | 1306 | 172 | 174 | 0 | 0 | 215 | 442 | 169 | 3739 | 352 | 236 | 583 | 0 |
| Bencana Non Alam dan Penyakit | 339 | 324 | 435 | 633 | 54046 | 121063 | 120104 | 88713 | 106035 | 31661 | 37922 | 1967 | 1595 | 1145 | 1199 | 2096 | 2156 | 875 | 1212 | 14338 | 37823 | 138519 | 12876 |
| Bencana Sosial | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 16 | 33 | 34 | 65 | 0 | 0 | 45 | 26 | 0 | 25 | 7 | 4 | 4 | 0 |