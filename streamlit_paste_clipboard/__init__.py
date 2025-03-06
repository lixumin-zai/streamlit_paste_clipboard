from pathlib import Path
import io
import base64
import re
import requests

import streamlit.components.v1 as components
from PIL import Image

frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
    "streamlit_paste_clipboard", path=str(frontend_dir)
)

def _data_base64_to_image(data_base64: str) -> Image:
    """Convert base64 data string an Pillow Image"""
    _, _data_base64= data_base64.split(";base64,")
    return Image.open(io.BytesIO(base64.b64decode(_data_base64)))

def _data_url_to_image(data_url: str) -> Image:
    """Convert base64 data string an Pillow Image"""
    image_bytes = requests.get(data_url, timeout=10).content
    return Image.open(io.BytesIO(image_bytes))

def paste_clipboard():
    component_value = _component_func()
    if component_value is None:
        return None
    if ";base64," in component_value:
        return _data_base64_to_image(component_value)
    if "http" in component_value:
        return _data_url_to_image(component_value)
    else:
        return None