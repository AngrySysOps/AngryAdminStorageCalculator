document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div class="container">
      <h1>💾 Angry Admin Storage Calculator</h1>
      <p>Plan your storage like a pro with VMware vSAN, Proxmox ZFS, or Erasure Coding</p>

      <label>Number of Hosts:<input id="hosts" type="number" value="10" /></label>
      <label>Disks per Host:<input id="disks" type="number" value="10" /></label>
      <label>Disk Size (TB):<input id="size" type="number" value="1" /></label>
      <label>Cost per Disk ($):<input id="cost" type="number" value="100" /></label>
      <label>Replication Factor:<input id="replication" type="number" value="2" /></label>

      <div class="toggles">
        <label><input type="checkbox" id="erasure" /> Use Erasure Coding</label>
        <label><input type="checkbox" id="vsan" /> Use VMware vSAN</label>
        <label><input type="checkbox" id="zfs" /> Use Proxmox ZFS</label>
      </div>

      <div id="erasureFields" class="hidden">
        <label>Data Chunks (k):<input id="dataChunks" type="number" value="4" /></label>
        <label>Parity Chunks (m):<input id="parityChunks" type="number" value="2" /></label>
      </div>

      <button onclick="calculate()">Calculate Usable Storage</button>

      <div id="results" class="results"></div>

      <div id="actions" class="actions hidden">
        <button onclick="exportCSV()">📤 Export CSV</button>
        <button onclick="print()">🖨️ Print</button>
        <button onclick="savePDF()">🧾 Save PDF</button>
      </div>
    </div>
  `;

  document.getElementById('erasure').addEventListener('change', (e) => {
    document.getElementById('erasureFields').classList.toggle('hidden', !e.target.checked);
  });

  window.calculate = function () {
    const hosts = +document.getElementById("hosts").value;
    const disks = +document.getElementById("disks").value;
    const size = +document.getElementById("size").value;
    const cost = +document.getElementById("cost").value;
    const replication = +document.getElementById("replication").value;
    const useErasure = document.getElementById("erasure").checked;
    const useVSAN = document.getElementById("vsan").checked;
    const useZFS = document.getElementById("zfs").checked;

    const totalDisks = hosts * disks;
    const totalRaw = totalDisks * size;
    const totalCost = totalDisks * cost;
    let usable = 0;
    let tolerance = 0;

    if (useErasure) {
      const k = +document.getElementById("dataChunks").value;
      const m = +document.getElementById("parityChunks").value;
      usable = (totalRaw * k) / (k + m);
      tolerance = m;
    } else if (useVSAN) {
      usable = totalRaw / replication;
      tolerance = replication - 1;
    } else if (useZFS) {
      usable = totalRaw * 0.8;
      tolerance = 2;
    } else {
      usable = totalRaw / replication;
      tolerance = replication - 1;
    }

    const html = `
      <h2>📊 Results</h2>
      <ul>
        <li><strong>Total Disks:</strong> ${totalDisks}</li>
        <li><strong>Total Raw Capacity:</strong> ${totalRaw} TB</li>
        <li><strong>Usable Capacity:</strong> ${usable.toFixed(2)} TB</li>
        <li><strong>Total Cost:</strong> $${totalCost}</li>
        <li><strong>Disk Failure Tolerance:</strong> ${tolerance}</li>
      </ul>
    `;
    document.getElementById("results").innerHTML = html;
    document.getElementById("actions").classList.remove("hidden");
  };

  window.exportCSV = function () {
    const rows = [
      ["Metric", "Value"],
      ["Total Disks", document.querySelector("#results li:nth-child(1)").innerText.split(": ")[1]],
      ["Total Raw Capacity (TB)", document.querySelector("#results li:nth-child(2)").innerText.split(": ")[1]],
      ["Usable Capacity (TB)", document.querySelector("#results li:nth-child(3)").innerText.split(": ")[1]],
      ["Total Cost ($)", document.querySelector("#results li:nth-child(4)").innerText.split(": ")[1]],
      ["Failure Tolerance", document.querySelector("#results li:nth-child(5)").innerText.split(": ")[1]],
    ];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "angry_admin_storage_results.csv";
    link.click();
  };

  window.savePDF = function () {
    window.print(); // for simplicity; use jsPDF for actual downloadable PDF
  };
});
