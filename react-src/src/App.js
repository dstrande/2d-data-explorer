import React, { useEffect } from 'react';


function Plot() {
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('File uploaded successfully');
            // Handle the response as needed
        } else {
            console.error('Failed to upload file');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

return (
    <div>
        <div id="myplot"></div>
        <input type="file" onChange={handleFileChange} />
    </div>
);
}

export default Plot;
