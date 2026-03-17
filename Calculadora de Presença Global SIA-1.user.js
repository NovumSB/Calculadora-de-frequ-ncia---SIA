// ==UserScript==
// @name        Calculadora de Presença Global SIA
// @description Calcula presença global (duh)
// @version 1
// @match        https://sia.ifrs.edu.br/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function calculate() {
        let text = document.body.innerText;

        let matches = Array.from(text.matchAll(/(\d+)\s*de\s*(\d+)/g));

        let attended = matches.reduce((s, m) => s + Number(m[1]), 0);
        let total = matches.reduce((s, m) => s + Number(m[2]), 0);

        if (total === 0) return "no data";

        return (attended / total * 100).toFixed(2) + "%";
    }

    // auto-run after load
    window.addEventListener("load", () => {
        let result = calculate();
        if (result !== "no data") {
            console.log("Attendance:", result);
        }
    });

    // manual trigger with F8
    document.addEventListener("keydown", (e) => {
        if (e.key === "F8") {
            let result = calculate();
            alert(result);
        }
    });

})();