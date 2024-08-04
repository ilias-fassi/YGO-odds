// d : deck size
// h : hand size
// c : card pool size
// n : min cards wanted among card pool

// calc n! recursively : n! = n*(n-1)!
function fact (n){
    if (n<0) {alert("error : calc of fact("+n+"), argument can't be negative"); return false;}
    if (n==1 || n==0) return 1;
    return n*fact(n-1);
}

// calc k among n : k among n = n!/(k!*(n-k)!)
function comb (k, n){
    if (k>n) {alert("error : in calc of combination("+k+","+n+"), "+k+">"+n+" "); return 0;}
    return fact(n)/(fact(k)*fact(n-k));
}

// calc odd to open EXACTLY n cards among c in a h cards hand in a d cards deck
function odd_exactly (d,h,c,n) {
    if (n > c) return 0 // open 4 among 3 is impossible
    return comb(n,c)*comb(h-n,d-c)/comb(h,d);
}

// calc odd to open AT LEAST n cards among c in a h cards hand in a d cards deck
function odd_atLeast (d,h,c,n) {
    if (c > d) {alert("Card pool size ("+c+") can't be greater than deck size ("+d+")"); return "Error : card pool size > deck size";}
    if (h > d) {alert("Hand size ("+h+") can't be greater than deck size ("+d+")");return "Error : hand size > deck size";}
    if (n > c) return 0;
    
    let res = 0;
    for (k = n; k < h+1; k++){ // k=1<6, k=2<6, k=3, .., k=5<6 ..
        res+= odd_exactly(d,h,c,k);
    }
    return (100*res).toFixed(2)+"%";
}

// display odd in % from user user form infos
function result (){
    d = Number(document.getElementById("d").value); // Valid
    h = Number(document.getElementById("h").value); // Valid
    c = Number(document.getElementById("c").value); // Valid
    n = Number(document.getElementById("n").value); // Valid
    document.getElementById("res").innerHTML=odd_atLeast(d,h,c,n);
}

// create a 2D array based on number of rows wanted
function Create2DArray(rows) {
    arr = [];
    for (i=0;i<rows;i++) {
       arr[i] = [];
    }
  
    return arr;
  }

let T51 = Create2DArray(30); // h=5 n=1
let T52 = Create2DArray(30); // h=5 n=2
let T53 = Create2DArray(30); // h=5 n=3
let T61 = Create2DArray(30); // h=6 n=1
let T62 = Create2DArray(30); // h=6 n=2
let T63 = Create2DArray(30); // h=6 n=3

function fill_tables() {
    let t = Create2DArray(30);
    for (h=5; h<7; h++){
        for (n=1; n<4; n++){
            for (i=0; i<30; i++){
                for (j=0; j<21; j++){
                    t[i][j]=odd_atLeast(j+40,h,i+1,n);
                }
            }
            if (h==5){
                if (n==1) {T51=t;}
                else if (n==2) {T52=t;}
                else if (n==3) {T53=t;}
            }
            else if (h==6) {
                if (n==1) {T61=t;}
                else if (n==2) {T62=t;}
                else if (n==3) {T63=t;}
            }
            t = Create2DArray(30);
        }
    }
}

// create html table containing values in T
// function GenerateTable (Tables) {
//     var res = "";

//     Tables.forEach(T => {
        
//         res += "<table border=1>";

//         for(var i=0; i<T.length; i++) {
//             res += "<tr>";
//             for(var j=0; j<T[i].length; j++){
//                 res += "<td>"+T[i][j]+"</td>";
//             }
//             res += "</tr>";
//         }

//         res += "</table>";
//     });
//     return res;
// }


// create html table containing values in T
function GenerateTable (Tables) {
    var h = 5;
    var n = 1;
    var res = "";
    Tables.forEach(T => { // for each table
        res += "<table border=2>"; // create html table
        res += "<legend>Open : <strong><em>"+n+"+</em></strong><br>Hand : <strong><em>"+h+"</em></strong></legend>" // legend
        res += "<tr><td>Card pool / Deck size</td>"; // 1st row, 1st elt
        for (k=0; k<21; k++) { // 1st row content
            res += "<td>"+(40+k)+"</td>";
        }
        res += "<tr>";
        for(var i=0; i<T.length; i++) { // fill table
            res += "<td>"+(i+1)+"</td>";
            for(var j=0; j<T[i].length; j++){
                res += "<td>"+T[i][j]+"</td>";
            }
            res += "</tr>";
        }
        res += "</table><br>"; // end html table
        if (n==3) {h++; n=1}
        else n++;
    });
    return res;
}

// display html tables
function displayTables (){
    fill_tables();
    var Tables = [T51, T52, T53, T61, T62, T63];
    document.getElementById('table_h5_n1').innerHTML= GenerateTable (Tables);
}
