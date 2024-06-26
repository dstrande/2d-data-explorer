from flask import Flask, request, flash, redirect
import json
from bokeh.plotting import figure
from bokeh.embed import json_item
from bokeh.palettes import Inferno256
from bokeh.models import FixedTicker, ColorBar, LinearColorMapper
from flask_cors import CORS
import numpy as np


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


ALLOWED_EXTENSIONS = {"txt", "h5"}
app = Flask(__name__)
CORS(app)


@app.route("/plot")
def plot():
    x, y, z = data()

    p = figure(width=1000, height=800, x_range=(0, 3), y_range=(0, 2))
    levels = np.linspace(-1, 1, 9)
    p.contour(x, y, z, levels, fill_color=Inferno256, line_color="black")

    p.xaxis.axis_label_text_font_size = "40pt"
    p.yaxis.axis_label_text_font_size = "30pt"

    color_mapper = LinearColorMapper(palette="Inferno256", low=-1, high=1)
    color_bar = ColorBar(
        color_mapper=color_mapper,
        ticker=FixedTicker(ticks=[-1, 0, 1]),
    )
    p.add_layout(color_bar, "right")

    model = json.dumps(json_item(p, "myplot"))

    # Return the plot as json
    return model


@app.route("/upload", methods=["POST"])
def data():
    x, y = np.meshgrid(np.linspace(0, 3, 40), np.linspace(0, 2, 30))
    z = 1.3 * np.exp(-2.5 * ((x - 1.3) ** 2 + (y - 0.8) ** 2)) - 1.2 * np.exp(
        -2 * ((x - 1.8) ** 2 + (y - 1.3) ** 2)
    )

    if request.method == "POST":
        # check if the post request has the file part
        app.logger.info("POST Flask")
        if "file" not in request.files:
            flash("No file part")
            return redirect(request.url)
        file = request.files["file"]

        # TODO use file for data

    return x, y, z


if __name__ == "__main__":
    app.run(debug=True)
