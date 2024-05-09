import React, { useEffect } from 'react';

function Plottest() {
  useEffect(() => {
    console.log("rendered");  
      async function fetchPlot() {
          try {
              const response = await fetch('http://localhost:5000/plot');
              let item;
              if (response.headers.get("content-type").includes("application/json")) {
                  item = await response.json();
              } else {
                  const text = await response.text();
                  item = JSON.parse(text);
              }

              Bokeh.embed.embed_item(item, "myplot");
          } catch (error) {
              console.error('Error loading the plot:', error);
          }
      }

      fetchPlot();
  }, []);

  return <div id="myplot"></div>;
}

export default Plottest;
