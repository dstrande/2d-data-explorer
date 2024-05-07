from flask import Flask, jsonify
import json
from bokeh.plotting import figure
from bokeh.embed import json_item
from flask_cors import cross_origin

app = Flask(__name__)


@app.route("/plot")
@cross_origin(origin="localhost")  # Allow only localhost:3000 to access
def plot():
    # Create a new plot with a title and axis labels
    p = figure()  # title="Simple Line Example", x_axis_label="x", y_axis_label="y")

    # Add a line renderer with legend and line thickness
    p.line([1, 2, 3], [1, 4, 9], line_width=2)  # , legend_label="Temp."

    model = json.dumps(json_item(p, "myplot"))
    # print(model, flush=True)

    # Return the plot as json
    return model  # jsonify(json_item(p, "myplot"))


if __name__ == "__main__":
    app.run(debug=True)
