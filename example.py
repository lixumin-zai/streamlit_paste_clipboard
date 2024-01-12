import streamlit as st
from streamlit_paste_clipboard import paste_clipboard
from PIL import Image


paste_data = paste_clipboard()
if paste_data:
    if isinstance(paste_data, Image.Image):
        st.image(paste_data)
    else:
        st.text(paste_data)

