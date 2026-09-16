(() => {
    const secret = "demo";
    let buffer = "";

    window.addEventListener("keydown", (event) => {
        if (event.ctrlKey || event.altKey || event.metaKey || event.key.length !== 1) {
            return;
        }

        buffer = (buffer + event.key.toLowerCase()).slice(-secret.length);

        if (buffer === secret) {
            window.location.assign("/demo/");
        }
    });
})();
