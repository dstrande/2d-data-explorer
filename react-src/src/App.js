import React, { useEffect } from 'react';

function Plot() {
  useEffect(() => {
      fetch('http://localhost:5000/plot')
          .then(function(response) { return response.json() })
          .then(function(item) { return Bokeh.embed.embed_item(item) })
          .catch(error => console.error('Error loading the plot:', error))
  }, []);

  return <div id="myplot"></div>;
}

export default Plot;


// import React, { useEffect } from 'react';

// function Plot() {
//   useEffect(() => {
//       fetch('http://localhost:5000/plot')
//           .then(response => response.json())
//           .then(data => {
//               console.log(data);
//               data = JSON.parse(data);
//               Bokeh.embed.embed_item(data); //, "myplot"
//           })
//           .catch(error => console.error('Error loading the plot:', error));
//   }, []);

//   return <div id="myplot"></div>;
// }

// export default Plot;