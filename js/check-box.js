const checkBox = [
    {
        label: "Code Wrap",
        onChange: "wordWrap()"
    }
];

const createCheckBoxElement = async () => {

    let rawElement = checkBox.map(item => `
    <label for="${item["label"]}">${item["label"]}</label>
    <input
      id="${item["label"]}"
      title="${item["label"]}"
      type="checkbox"
      onchange="${item["onChange"]}"
    />
    `).join(' ')

    let checkBoxContainer = document.getElementById("checkBoxContainer");
    checkBoxContainer.innerHTML = rawElement;

    const yourCheckbox = document.getElementById('Code Wrap');

    let temp = localStorage.getItem("editorWrap");
    if (temp) {
        let isTrueSet = (temp === 'true');
        if (isTrueSet) {
            yourCheckbox.checked = true;
            editor.session.setUseWrapMode(true);
        }else{
            yourCheckbox.checked = false;
            editor.session.setUseWrapMode(false);
        }
    }
};
createCheckBoxElement()