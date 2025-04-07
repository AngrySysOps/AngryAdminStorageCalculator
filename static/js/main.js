document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div style='padding: 2rem; background: #0f172a; color: white; font-family: sans-serif;'>
      <h1 style='color:#38bdf8; text-align:center;'>💾 Angry Admin Storage Calculator</h1>
      <p style='text-align:center; margin-bottom:1rem;'>Enter your storage specs below</p>
      <label>Number of Hosts: <input id='hosts' type='number' value='10'/></label><br/>
      <label>Disks per Host: <input id='disks' type='number' value='10'/></label><br/>
      <label>Disk Size (TB): <input id='size' type='number' value='1'/></label><br/>
      <label>Cost per Disk ($): <input id='cost' type='number' value='100'/></label><br/>
      <label>Replication Factor: <input id='replication' type='number' value='2'/></label><br/>
      <button onclick='calculate()' style='margin-top:1rem;'>Calculate</button>
      <div id='results' style='margin-top:2rem;'></div>
    </div>
  `;

  window.calculate = function () {
    const hosts = +document.getElementById('hosts').value;
    const disks = +document.getElementById('disks').value;
    const size = +document.getElementById('size').value;
    const cost = +document.getElementById('cost').value;
    const replication = +document.getElementById('replication').value;

    const totalDisks = hosts * disks;
    const raw = totalDisks * size;
    const usable = raw / replication;
    const totalCost = totalDisks * cost;

    const html = `
      <p><strong>Total Disks:</strong> ${totalDisks}</p>
      <p><strong>Total Raw Capacity:</strong> ${raw} TB</p>
      <p><strong>Usable Capacity:</strong> ${usable.toFixed(2)} TB</p>
      <p><strong>Total Cost:</strong> $${totalCost}</p>
    `;
    document.getElementById('results').innerHTML = html;
  };
});