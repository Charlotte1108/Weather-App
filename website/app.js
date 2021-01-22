/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=fcfdfa82f8686ceb0128bc65842c4eb1&units=metric'; 
const url = 'http://localhost:8890';

document.getElementById('generate').addEventListener('click', performAction); 

function performAction(e){
    const newZip = document.getElementById('zip').value; 
    const feelings = document.getElementById('feelings').value;
    
    getWeather(baseUrl,newZip,key)
    
     .then(function (data){
          console.log(data);
          postData('/projectData', {temperature: data.main.temp, date: newDate, content: feelings})
    
    .then(function() { 
        updateUI()
        })
    })
}

const getWeather = async (baseUrl, newZip, key) => {
    const res = await fetch(baseUrl + newZip + key)
    try {
        const data = await res.json();
        console.log(data);
        return data; 
    }
    catch(error) {
    }
}

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        date: data.date,
        temperature: data.temperature,
        content: data.content
    }),        
  });

  try {
    const newData = await req.json();
    return newData;
  }catch(error) {
  }
};

const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json()
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
    }    
 }