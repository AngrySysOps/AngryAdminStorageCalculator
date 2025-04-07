document.addEventListener("DOMContentLoaded", () => {
  const erasureToggle = document.getElementById("erasure");
  const vsanToggle = document.getElementById("vsan");
  const zfsToggle = document.getElementById("zfs");

  erasureToggle.addEventListener("change", () => {
    document.getElementById("erasureFields").classList.toggle("hidden", !erasureToggle.checked);
    if (erasureToggle.checked) {
      vsanToggle.checked = false;
      zfsToggle.checked = false;
    }
  });

  vsanToggle.addEventListener("change", () => {
    if (vsanToggle.checked) {
      erasureToggle.checked = false;
      zfsToggle.checked = false;
      document.getElementById("erasureFields").classList.add("hidden");
    }
  });

  zfsToggle.addEventListener("change", () => {
    if (zfsToggle.checked) {
      erasureToggle.checked = false;
      vsanToggle.checked = false;
      document.getElementById("erasureFields").classList.add("hidden");
    }
  });
});

function calculate() {
  const hosts = +document.getElementById("hosts").value;
  const disks = +document.getElementById("disks").value;
  const size = +document.getElementById("size").value;
  const cost = +document.getElementById("cost").value;
  const replication = +document.getElementById("replication").value;

  const useErasure = document.getElementById("erasure").checked;
  const useVSAN = document.getElementById("vsan").checked;
  const useZFS = document.getElementById("zfs").checked;

  const totalDisks = hosts * disks;
  const raw = totalDisks * size;
  const totalCost = totalDisks * cost;

  let usable = 0;
  let tolerance = 0;

  if (useErasure) {
    const k = +document.getElementById("dataChunks").value;
    const m = +document.getElementById("parityChunks").value;
    usable = (raw * k) / (k + m);
    tolerance = m;
  } else if (useVSAN) {
    usable = raw / replication;
    tolerance = replication - 1;
  } else if (useZFS) {
    usable = raw * 0.8;
    tolerance = 2;
  } else {
    usable = raw / replication;
    tolerance = replication - 1;
  }

  document.getElementById("results").innerHTML = `
    <h2>📊 Results</h2>
    <ul>
      <li><strong>Total Disks:</strong> ${totalDisks}</li>
      <li><strong>Total Raw Capacity:</strong> ${raw} TB</li>
      <li><strong>Usable Capacity:</strong> ${usable.toFixed(2)} TB</li>
      <li><strong>Total Cost:</strong> $${totalCost}</li>
      <li><strong>Disk Failure Tolerance:</strong> ${tolerance}</li>
    </ul>
  `;

  document.getElementById("actions").classList.remove("hidden");
}

function exportCSV() {
  const lines = Array.from(document.querySelectorAll("#results li")).map(li => {
    const [label, value] = li.innerText.split(": ");
    return [label, value];
  });

  const csv = ["Metric,Value", ...lines.map(([l, v]) => `${l},${v}`)].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "angry_admin_storage_results.csv";
  link.click();
}
