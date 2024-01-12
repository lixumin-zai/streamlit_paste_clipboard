# streamlit_paste_clipboard

Paste clipboard image

## Installation instructions

```sh
pip install git+https://github.com/lixumin-zai/streamlit_paste_clipboard.git

streamlit run streamlit_paste_clipboard/example.py args --server.fileWatcherType none
```

## Usage instructions

```python
import streamlit as st

from streamlit_paste_clipboard import paste_clipboard

image = paste_clipboard()
if image:
    st.Image(image)
```