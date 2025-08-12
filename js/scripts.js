function invertText() {
    const text = document.getElementById("input-invert").value;
    const invertedText = text.split('').reverse().join('');
    document.getElementById("result-invert").textContent = invertedText;
}

function upperCaseInitial() {
    const textArea = document.getElementById("input-initUC");
    const result = document.getElementById("result-initUC");

    textArea.addEventListener('input', () => {
        const text = textArea.value.toLowerCase();
        const capitalized = text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        result.textContent = capitalized;
    });
}

function upperCaseTotalText() {
    const field = document.getElementById("input-totalUC")
    const upperCaseField = field.value.toUpperCase();
    document.getElementById("result-totalUC").textContent = upperCaseField
}

 function generateCSV() {
      const text = document.getElementById("input-CSV").value.trim();

      // Quebrar por linha
      const lines = text.split("\n");

      const result = [];

      for (let line of lines) {
        // Substituir múltiplos espaços ou tabs por 1 tab
        line = line.replace(/\s{2,}|\t+/g, '\t').trim();

        // Separar por tab
        const parts = line.split("\t");

        // Remover "Mostrar"
        if (parts[parts.length - 1].toLowerCase() === "mostrar") {
          parts.pop();
        }

        // Arredondar percentuais
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].includes("%")) {
            const num = parseFloat(parts[i].replace("%", ""));
            if (!isNaN(num)) {
              parts[i] = num.toFixed(2) + "%";
            }
          }
        }

        result.push(parts);
      }

      // Mostrar saída formatada
      document.getElementById("result-CSV").textContent = result.map(l => l.join("\t")).join("\n");

      // Gerar CSV
      const csv = result.map(row => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "result.csv");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }