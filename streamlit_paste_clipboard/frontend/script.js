
// Borrowed minimalistic Streamlit API from Thiago
// https://discuss.streamlit.io/t/code-snippet-create-components-without-any-frontend-tooling-no-react-babel-webpack-etc/13064
function sendMessageToStreamlitClient(type, data) {
    // console.log(type, data)
    const outData = Object.assign({
        isStreamlitMessage: true,
        type: type,
    }, data);
    window.parent.postMessage(outData, "*");
  }
  
const Streamlit = {
    setComponentReady: function() {
        sendMessageToStreamlitClient("streamlit:componentReady", {apiVersion: 1});
    },
    setFrameHeight: function(height) {
        sendMessageToStreamlitClient("streamlit:setFrameHeight", {height: height});
    },
    setComponentValue: function(value) {
        sendMessageToStreamlitClient("streamlit:setComponentValue", {value: value});
    },
    RENDER_EVENT: "streamlit:render",
    events: {
        addEventListener: function(type, callback) {
            window.addEventListener("message", function(event) {
                if (event.data.type === type) {
                    event.detail = event.data
                    callback(event);
                }
            });
        }
    }
}

function sendValue(value) {
    Streamlit.setComponentValue(value);
  }

function onRender(event) {

    if (!window.rendered) {
        document.addEventListener('paste', (event) => {
            var items = (event.clipboardData || event.originalEvent.clipboardData).items;
            // console.log(JSON.stringify(items)); // 输出剪切板内容
        
            var imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = ''; // 清除容器中现有的所有内容
            for (let index in items) {
                var item = items[index];
                
                if (item.kind === 'file') {
                    // 处理图片文件
                    var blob = item.getAsFile();
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        // console.log(event.target.result); // 数据url
                        var img = document.createElement("img"); // 创建新的图片元素
                        img.src = event.target.result;
                        imageContainer.appendChild(img);
                        sendValue(img.src)
                    }; 
                    reader.readAsDataURL(blob);
                } else if (item.kind === 'string') {
                    // 处理文本
                    item.getAsString(function(string){
                        // console.log(string); // 文本内容
                        if (string){
                            imageContainer.textContent = string; // 显示文本
                            sendValue(string)
                        } else {
                            imageContainer.textContent = '剪切板没有内容';
                            sendValue('剪切板没有内容')
                        }
                    });
                }
            }
        });
    window.rendered = true;
  }
}
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
Streamlit.setComponentReady();
Streamlit.setFrameHeight(320);


