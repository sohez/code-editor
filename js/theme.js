const listTheme =
  [
    {
      "group": "Bright",
      "options": [
        { "value": "ace/theme/chrome", "label": "Chrome", "selected": true },
        { "value": "ace/theme/clouds", "label": "Clouds" },
        { "value": "ace/theme/crimson_editor", "label": "Crimson Editor" },
        { "value": "ace/theme/dawn", "label": "Dawn" },
        { "value": "ace/theme/dreamweaver", "label": "Dreamweaver" },
        { "value": "ace/theme/eclipse", "label": "Eclipse" },
        { "value": "ace/theme/github", "label": "GitHub" },
        { "value": "ace/theme/iplastic", "label": "IPlastic" },
        { "value": "ace/theme/solarized_light", "label": "Solarized Light" },
        { "value": "ace/theme/textmate", "label": "TextMate" },
        { "value": "ace/theme/tomorrow", "label": "Tomorrow" },
        { "value": "ace/theme/xcode", "label": "XCode" },
        { "value": "ace/theme/kuroir", "label": "Kuroir" },
        { "value": "ace/theme/katzenmilch", "label": "KatzenMilch" },
        { "value": "ace/theme/sqlserver", "label": "SQL Server" },
        { "value": "ace/theme/cloud_editor", "label": "CloudEditor" }
      ]
    },
    {
      "group": "Dark",
      "options": [
        { "value": "ace/theme/ambiance", "label": "Ambiance" },
        { "value": "ace/theme/chaos", "label": "Chaos" },
        { "value": "ace/theme/clouds_midnight", "label": "Clouds Midnight" },
        { "value": "ace/theme/dracula", "label": "Dracula" },
        { "value": "ace/theme/cobalt", "label": "Cobalt" },
        { "value": "ace/theme/gruvbox", "label": "Gruvbox" },
        { "value": "ace/theme/gob", "label": "Green on Black" },
        { "value": "ace/theme/idle_fingers", "label": "idle Fingers" },
        { "value": "ace/theme/kr_theme", "label": "krTheme" },
        { "value": "ace/theme/merbivore", "label": "Merbivore" },
        { "value": "ace/theme/merbivore_soft", "label": "Merbivore Soft" },
        { "value": "ace/theme/mono_industrial", "label": "Mono Industrial" },
        { "value": "ace/theme/monokai", "label": "Monokai" },
        { "value": "ace/theme/nord_dark", "label": "Nord Dark" },
        { "value": "ace/theme/one_dark", "label": "One Dark" },
        { "value": "ace/theme/pastel_on_dark", "label": "Pastel on dark" },
        { "value": "ace/theme/solarized_dark", "label": "Solarized Dark" },
        { "value": "ace/theme/terminal", "label": "Terminal" },
        { "value": "ace/theme/tomorrow_night", "label": "Tomorrow Night" },
        { "value": "ace/theme/tomorrow_night_blue", "label": "Tomorrow Night Blue" },
        { "value": "ace/theme/tomorrow_night_bright", "label": "Tomorrow Night Bright" },
        { "value": "ace/theme/tomorrow_night_eighties", "label": "Tomorrow Night 80s" },
        { "value": "ace/theme/twilight", "label": "Twilight" },
        { "value": "ace/theme/vibrant_ink", "label": "Vibrant Ink" },
        { "value": "ace/theme/github_dark", "label": "GitHub Dark" },
        { "value": "ace/theme/cloud_editor_dark", "label": "CloudEditor Dark" }
      ]
    }
  ];
const THEME_LOCALSTROAGE_KEY = "editorThemeObject";

const createThemeElement = async () => {

  const lightTheme = listTheme[0]['options']
  const darkTheme = listTheme[1]['options']
  const settingsElement = document.getElementById("themeContainer");
  let divTheme = "";
  let defaultThemeName = "";

  const createThemeInputs = (themeArray, header) => {
    divTheme += `<b>${header}</b>`;
    const inputs = themeArray.map(element => `
    <li theme-name="${element["label"]}" theme-value="${element["value"]}">${element["label"]}</li>
    `);
    divTheme += inputs.join('');
  };

  await createThemeInputs(darkTheme, "Dark Theme's");
  await createThemeInputs(lightTheme, "Bright Theme's");

  if (localStorage.getItem(THEME_LOCALSTROAGE_KEY)) {
    let localTheme = localStorage.getItem(THEME_LOCALSTROAGE_KEY);
    localTheme = JSON.parse(localTheme);
    editor.setTheme(localTheme["value"]);
    defaultThemeName = localTheme["label"];
  } else {
    const item = {
      value: "ace/theme/monokai",
      label: "Monokai"
    }
    localStorage.setItem(THEME_LOCALSTROAGE_KEY, JSON.stringify(item));
    editor.setTheme(item["value"]);
    defaultThemeName = item["label"];
  }

  settingsElement.innerHTML = `
        <b class="setting_title">Editor Theme</b>
        <br/>
        <div class="custom-dropdown" id="theme-dropdown">
        <div class="selected-option" id="theme-selected-option">${defaultThemeName}</div>
        <ul class="options" id="theme-options">
        ${divTheme}
        </ul>
        </div>
        <br/>
`;
};
createThemeElement()

document.addEventListener('DOMContentLoaded', function () {
  let dropdown = document.getElementById('theme-dropdown');
  let selectedOption = dropdown.querySelector('#theme-selected-option');
  let optionsList = dropdown.querySelector('#theme-options');

  selectedOption.addEventListener('click', function () {
    optionsList.style.display = (optionsList.style.display === 'block') ? 'none' : 'block';
  });

  //this call if the li element clicked.
  optionsList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {

      //set the name to row of select
      selectedOption.textContent = event.target.textContent;

      //hide the Option list Div after item selected.
      optionsList.style.display = 'none';

      // You can handle the selected value here
      let thenmeName = event.target.getAttribute('theme-name');
      let themeValue = event.target.getAttribute('theme-value');
      const item = {
        value: themeValue,
        label: thenmeName
      }
      // console.log(JSON.stringify(item))
      localStorage.setItem(THEME_LOCALSTROAGE_KEY, JSON.stringify(item));
      editor.setTheme(item["value"]);
    }
  });
});

