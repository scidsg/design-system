function updateElement(id, value) {
    document.getElementById(id).textContent = value;
}

document.getElementById("header-h1").addEventListener("input", function (e) {
    updateElement("main-h1", e.target.value);
});

document.getElementById("header-button").addEventListener("input", function (e) {
    updateElement("main-header-button", e.target.value);
});

document.getElementById("intro-h2").addEventListener("input", function (e) {
    updateElement("main-h2", e.target.value);
});

document.getElementById("intro-paragraph").addEventListener("input", function (e) {
    updateElement("main-paragraph", e.target.value);
});

document.getElementById("intro-button").addEventListener("input", function (e) {
    updateElement("main-intro-button", e.target.value);
});

document.getElementById("feature-1-h3").addEventListener("input", function (e) {
    updateElement("h3-feature-1", e.target.value);
});

document.getElementById("feature-1-paragraph").addEventListener("input", function (e) {
    updateElement("paragraph-feature-1", e.target.value);
});

document.getElementById("feature-2-h3").addEventListener("input", function (e) {
    updateElement("h3-feature-2", e.target.value);
});

document.getElementById("feature-2-paragraph").addEventListener("input", function (e) {
    updateElement("paragraph-feature-2", e.target.value);
});

document.getElementById("primary-color").addEventListener("input", function (e) {
    updatePrimaryColor(e.target.value);
});

document.getElementById("heading-font").addEventListener("change", function (e) {
  updateHeadingFontFamily(e.target.value);
});

document.getElementById("footer-paragraph").addEventListener("input", function (e) {
    updateElement("paragraph-footer", e.target.value);
});

document.getElementById("highlight-h3").addEventListener("input", function (e) {
    updateElement("h3-highlight", e.target.value);
});

document.getElementById("highlight-paragraph").addEventListener("input", function (e) {
    updateElement("paragraph-highlight", e.target.value);
});

document.getElementById("highlight-button").addEventListener("input", function (e) {
    updateElement("button-highlight", e.target.value);
});

let selectedPrimaryColor = "#333"; // default primary color
let selectedHeadingFontFamily = "Helvetica, Arial, sans-serif"; // default font family

function updateElement(id, value) {
  const element = document.getElementById(id);
  element.textContent = value;

  // Check if the element is a button and hide or show it based on the input value
  if (element.tagName.toLowerCase() === "button") {
    if (value.trim() === "") {
      element.style.display = "none";
    } else {
      element.style.display = "inline-block";
    }
  }
}

function updatePrimaryColor(color) {
    selectedPrimaryColor = color;

    const primaryButtons = document.querySelectorAll(".main-page-element.primary");
    const nonPrimaryButtons = document.querySelectorAll(".main-page-element:not(.primary)");

    primaryButtons.forEach((button) => {
        button.style.backgroundColor = color;
    });

    nonPrimaryButtons.forEach((button) => {
        button.style.color = color;
    });

    // Add other elements you want to change the color of here, for example:
    // document.getElementById("some-element").style.color = color;
}

function updateHeadingFontFamily(fontFamily) {
  selectedHeadingFontFamily = fontFamily;
  const headings = document.querySelectorAll(".main-page h1, .main-page h2, .main-page h3");
  headings.forEach((heading) => {
    heading.style.fontFamily = fontFamily;
  });
}


// Initialize the content of the elements with the default values.
updateElement("main-h1", document.getElementById("header-h1").value);
updateElement("main-header-button", document.getElementById("header-button").value);
updateElement("main-h2", document.getElementById("intro-h2").value);
updateElement("main-paragraph", document.getElementById("intro-paragraph").value);
updateElement("main-intro-button", document.getElementById("intro-button").value);
updateElement("h3-feature-1", document.getElementById("feature-1-h3").value);
updateElement("paragraph-feature-1", document.getElementById("feature-1-paragraph").value);
updateElement("h3-feature-2", document.getElementById("feature-2-h3").value);
updateElement("paragraph-feature-2", document.getElementById("feature-2-paragraph").value);
updateElement("paragraph-footer", document.getElementById("footer-paragraph").value);
updatePrimaryColor("#333"); // set the selected primary color to the default value
updateHeadingFontFamily(document.getElementById("heading-font").value);
updateElement("h3-feature-3", document.getElementById("feature-3-h3").value);
updateElement("paragraph-feature-3", document.getElementById("feature-3-paragraph").value);
updateElement("h3-highlight", document.getElementById("highlight-h3").value);
updateElement("paragraph-highlight", document.getElementById("highlight-paragraph").value);
updateElement("button-highlight", document.getElementById("highlight-button").value);

document.getElementById("export-button").addEventListener("click", function () {
    const mainPage = document.querySelector(".main-page").outerHTML;
    const css = `
        <style>
            body {
                font-family: Helvetica, Arial, sans-serif;
                display: flex;
                justify-content: space-around;
                margin: 0;
                box-sizing: border-box;
                height: 100vh;
                overflow-x: hidden;
                color: #333;
            }

            h1 {
                font-size: 1.125rem;
            }

            h2 {
                font-size: 1.5rem;
            }

            p {
                max-width: 640px;
                width: 100%;
            }

            h1, h2, h3 {
                font-family: ${selectedHeadingFontFamily};
            }

            .intro-section h2 {
                font-size: 3.5rem;
                margin: 0;
                width: 85%;
                line-height: 1.2;
            }

            .main-page {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                box-sizing: border-box;
                overflow-y: auto;
                position: relative;
            }

            .wrapper {
                max-width: 1280px;
                width: 100%;
                margin: 0 auto;
                padding: 0 2rem;
                box-sizing: border-box;
            }

            header {
                position: fixed;
                top: 0;
                padding: 1rem 0;
                left: 0;
                right: 0;
                background-color: white;
            }

            header .wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
            }

            header button {
                margin: 0;
            }

            .intro-section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 100vh;
            }

            .intro-section button {
                margin: 1rem 0 0 0;
            }

            button {
                border: 1px solid rgba(0,0,0,0.15);
                background-color: white;
                color: #333;
                padding: .75rem 1.125rem;
                border-radius: .25rem;
                cursor: pointer;
                width: max-content;
                margin: 1rem 0;
                font-weight: bold;
                font-size: .875rem;
            }

            button.primary {
                background-color: #333;
                color: white;
                border: none;
            }

            button.primary.main-page-element {
                background-color: ${selectedPrimaryColor};
            }

            .description {
                display: flex;
                flex-direction: column;
                width: 50%;
                justify-content: center;
            }

            .description h3 {
                margin: 0 0 .5rem 0;
                font-size: 2rem;
            }

            .description p {
                margin: .5rem 0;
            }

            .card:first-of-type {
                padding-top: 0;
            }

            .card {
                display: flex;
                flex-direction: row;
                padding: 3rem 0;
            }

            .feature-section svg {
                width: 50%;
                max-width: 768px;
                margin: 0 0 0 2rem;
                border-radius: .25rem;
            }

            .flip {
                order: 2;
            }

            .flip + svg {
                margin: 0 2rem 0 0;
            }

            .highlight-section .card {
                flex-direction: column;
                align-items: center;
                padding: 3rem 0;
            }

            .highlight-section .description {
                width: 100%;
                align-items: center;
                text-align: center;
            }

            .highlight-section svg {
                max-width: 768px;
                width: 100%;
                margin: 1rem 0 0 0;
                border-radius: .25rem;
            }

            .feature-section, .highlight-section {
                margin-bottom: 2rem;
            }

            footer p {
                font-size: .75rem;
            }

            @media only screen and (max-width: 960px) {
                .intro-section h2 {
                    font-size: 3rem;
                    width: 95%;
                }
            }

            @media only screen and (max-width: 768px) {
                .intro-section h2 {
                    font-size: 2.5rem;
                    width: 100%;
                }

                .flip {
                    order: 0;
                }

                .card {
                    flex-direction: column;
                }

                .description {
                    width: 100%;
                }

                .feature-section svg {
                    width: 100%;
                }
            }
        </style>
        `;

const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Exported Page</title>
            ${css}
        </head>
        <body>
            ${mainPage}
        </body>
        </html>
            `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


