document.getElementById('colorBrand').addEventListener('change', function() {
    document.documentElement.style.setProperty('--color-brand', this.value);
});

document.getElementById('colorBrandBg').addEventListener('change', function() {
    document.documentElement.style.setProperty('--color-brand-bg', this.value);
});

document.getElementById('colorBrandDark').addEventListener('change', function() {
    document.documentElement.style.setProperty('--color-brand-dark', this.value);
});

document.getElementById('headerText').addEventListener('input', function() {
    document.querySelector('header h1').innerText = this.value; // Ensure the selector targets the right element
});

document.getElementById('introHeading').addEventListener('input', function() {
    document.querySelector('.intro h2').innerText = this.value; // Ensure the selector targets the right element
});

document.getElementById('introText').addEventListener('input', function() {
    document.querySelector('.intro h2 + p').innerText = this.value; // Ensure the selector targets the right element
});

document.getElementById('introButton').addEventListener('input', function() {
    document.querySelector('.intro .btn').innerText = this.value; // Ensure the selector targets the right element
});

document.getElementById('missionText1').addEventListener('input', function() {
    document.querySelector('.statement p:first-of-type').innerText = this.value; // Ensure the selector targets the right element
});

document.getElementById('missionText2').addEventListener('input', function() {
    document.querySelector('.statement p:last-of-type').innerText = this.value; // Ensure the selector targets the right element
});


document.getElementById("export-button").addEventListener("click", function () {
    // Prepare the entire page HTML with embedded styles and scripts
    const docClone = document.cloneNode(true); // Clone the current document
    const styleSheets = document.querySelectorAll("link[rel='stylesheet']");
    let styles = '';

    // Inline all linked CSS
    styleSheets.forEach(sheet => {
        const cssText = sheet.sheet ? Array.from(sheet.sheet.cssRules).map(rule => rule.cssText).join("\n") : '';
        styles += `<style>${cssText}</style>`;
    });

    // Include all internal styles
    const internalStyles = document.querySelectorAll("style");
    internalStyles.forEach(style => {
        styles += `<style>${style.innerHTML}</style>`;
    });

    // Update clone's head with styles
    const headContent = docClone.head.innerHTML;
    docClone.head.innerHTML = `${styles}${headContent}`;

    // Embed scripts
    const scripts = document.querySelectorAll("script");
    let scriptsContent = '';
    scripts.forEach(script => {
        scriptsContent += `<script>${script.innerHTML}</script>`;
    });

    // Replace body's end with scripts
    docClone.body.innerHTML += scriptsContent;

    // Create a Blob for download
    const htmlContent = docClone.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_page.html";
    link.click();
});

