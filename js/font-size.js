const objFontSize =
    [
        {
            value: 12,
            label: "Small"
        },
        {
            value: 14,
            label: "Medium"
        },
        {
            value: 16,
            label: "Large"
        },
        {
            value: 18,
            label: "X Large"
        }
    ];
const FONTSIZE_LOCAL_STORAGE_KEY = "editorFontSize";

const createFontElement = async () => {

    const settingsElement = document.getElementById("fontSizeContainer");
    let defaultFontSizeName = "";
    const inputs = objFontSize.map(element => `
    <li font-size="${element["value"]}" font-size-name="${element["label"]}">${element["label"]}</li>
    `).join(' ');

    if (localStorage.getItem(FONTSIZE_LOCAL_STORAGE_KEY)) {
        let localFontSize = localStorage.getItem(FONTSIZE_LOCAL_STORAGE_KEY);
        localFontSize = JSON.parse(localFontSize);
        document.getElementById('editor').style.fontSize = localFontSize["size"] + 'px';
        defaultFontSizeName = localFontSize["label"];
      } else {
        const item = {
            size: 12,
            label: "Small"
          };
          localStorage.setItem(FONTSIZE_LOCAL_STORAGE_KEY, JSON.stringify(item));
          document.getElementById('editor').style.fontSize = item["size"] + 'px';
          defaultFontSizeName = item["label"];
      }

    settingsElement.innerHTML = `
        <b class="setting_title">Font Size</b>
        <br/>
        <div class="custom-dropdown" id="font-dropdown">
        <div class="selected-option" id="font-selected-option">${defaultFontSizeName}</div>
        <ul class="options" id="font-options">
        ${inputs}
        </ul>
        </div>
        <br/>
`;
};
createFontElement()

document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.querySelector('#font-dropdown');
    var selectedOption = dropdown.querySelector('#font-selected-option');
    var optionsList = dropdown.querySelector('#font-options');

    selectedOption.addEventListener('click', function () {
        optionsList.style.display = (optionsList.style.display === 'block') ? 'none' : 'block';
    });

    optionsList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            selectedOption.textContent = event.target.textContent;

            optionsList.style.display = 'none';
            // You can handle the selected value here
            let fontSize = event.target.getAttribute('font-size');
            let fontSizeName = event.target.getAttribute('font-size-name');
            const item = {
                size: fontSize,
                label: fontSizeName
              };
              localStorage.setItem(FONTSIZE_LOCAL_STORAGE_KEY, JSON.stringify(item));
              document.getElementById('editor').style.fontSize = item["size"] + 'px';
        }
    });
});
