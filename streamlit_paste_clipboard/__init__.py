from pathlib import Path
import io
import base64
import re

import streamlit.components.v1 as components
from PIL import Image

frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
    "my_component", path=str(frontend_dir)
)

def _data_url_to_image(data_url: str) -> Image:
    """Convert base64 data string an Pillow Image"""
    _, _data_url = data_url.split(";base64,")
    return Image.open(io.BytesIO(base64.b64decode(_data_url)))

def paste_clipboard():
    component_value = _component_func()
    if component_value is None:
        return None
    if "data:image/png;base64," in component_value:
        return _data_url_to_image(component_value)
    else:
        return None