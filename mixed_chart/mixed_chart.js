 // new Chart(document.getElementById("mixed-chart"), {

 async function setup() {

     const data = await getData();
     const ctx = document.getElementById('mixed-chart').getContext('2d');
     const myChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: data.month,
             datasets: [{
                 label: "Unemployment",
                 type: "line",
                 borderColor: "#8e5ea2",
                 data: data.unemployed,
                 fill: false

             }, {
                 label: "Covid Cases",
                 type: "bar",
                 backgroundColor: "rgba(0,0,0,0.2)",
                 data: data.covids,

             }]
         },
         options: {
             title: {
                 display: true,
                 text: 'NJ Covid Cases vs. Unemployment Rates for 2020'
             },
             legend: { display: false }
         }
     });

     async function getData() {
         // const response = await fetch('testdata.csv');
         //const xs = []
         //const ys = []

         const response = await fetch('mixed_chart_df_final.csv');
         const data = await response.text();


         const month = [];
         const covids = [];
         const unemployed = [];

         const table = data.split('\n').slice(1);
         table.forEach(row => {
             const columns = row.split(',');
             const month = columns[0];
             month.push(month);
             const covids = columns[1];
             covids.push(covids);
             const unemployed = columns[2]
             unemployed.push(unemployed);
         });
         return { month, covids, unemployed };
     }
 }