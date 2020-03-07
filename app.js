//Harjoitus: Fanuc robot HTTP client. Luetaan robotilta nivelarvot ja tulostetaan konsoliin
//tarvitaan axios-moduuli, jolla voi tehdä HTTP-kyselyjä 
const axios = require('axios'); 

function clientFunktio(){
    const start_time_stamp = new Date();
    axios.get('https://fanuc-robot-http-server.herokuapp.com/').then((res) => {
    //joint-tietojen poimiminen regular expression -lauseella
    //const regexp = /((Joint)\s+(\d\:)\s+(\-?\d+\.\d+))/g;
    const regexp = /(Joint\s+\d\:\s+(\-?\d+\.\d+))/g;
    let joints = [];
    //let rivit =[];      
    let matches = res.data.matchAll(regexp);         
    let count = 0;             
    for (const match of matches) {                 
        count++;
        if (count > 6) break;                
        const value = parseFloat(match[2]);     //otetaan haetusta rivistä numeroarvo
        //const teksti = match[0];               //koko haettu rivi                    
        joints.push(value);                      //numeroarvo taulukkoon
        //rivit.push(teksti);              
    }
    /*for (const rivi of rivit){               //rivien tulostus
        console.log(rivi);
      }
    console.log(joints); */                   //arvojen tulostus
    //console.log(start_time_stamp)
    const time_stamp = new Date(); 
    const delta = time_stamp - start_time_stamp;
    console.log(time_stamp + " [ " + joints + " ] " + delta + " ms");  
}); 
}
 
//funktio lukee robotin lähettämät arvot 3000 ms välein looppina
function Tulosta() {            //Tulosta(times), jos kierroksia lasketaan
    /*if(times < 1) {            //jos kierroksia, tehdään tämä 
      return;
    }*/
    setTimeout(function() {
        clientFunktio();         //kutsutaan funktiota
        Tulosta();              //Tulosta(times-1), jos kierroksia
    }, 3000);
  }

Tulosta();                     //Tulosta(10), jos esim. 10 kierrosta


 