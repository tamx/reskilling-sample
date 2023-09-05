function parseCSV(body) {
    // 配列を定義
    let csvArray = [];

    // 改行ごとに配列化
    let lines = body.split(/\r\n|\n/);

    // 1行ごとに処理
    for (let i = 0; i < lines.length; ++i) {
        let cells = lines[i].split(",");
        csvArray.push(cells);
    }

    return csvArray;
}

function makeHTML(csvArray) {
    let result = '<ul>';
    for (let index in csvArray) {
        if (index === '0') {
            continue;
        }
        const book = csvArray[index];
        result += '<li>' + book[0] + '(' + book[1] + ')</li>';
    }
    result += '</ul>';
    const element = document.getElementById('result');
    element.innerHTML = result;
}

const f = document.getElementById('myfile');
f.addEventListener('change', evt => {
    const input = evt.target;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        // 読み出し結果の表示
        console.log(reader.result);
        const csvArray = parseCSV(reader.result);
        makeHTML(csvArray);
    };
    reader.readAsText(file); // 読み込み開始
});
