document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  root.innerHTML = `
    <div style='padding: 2rem; background: #0f172a; color: white; font-family: sans-serif; max-width: 600px; margin: auto; border-radius: 1rem;'>
      <h1 style='color:#38bdf8; text-align:center;'>💾 Angry Admin Storage Calculator</h1>
      <p style='text-align:center; margin-bottom:1.5rem;'>Plan your storage like a pro with VMware vSAN, Proxmox ZFS, or Erasure Coding</p>

      <label>Number of Hosts:<br/><input id='hosts' type='number' value='10' /></label><br/>
      <label>Disks per Host:<br/><input id='disks' type='number' value='10' /></label><br/>
      <label>Disk Size (TB):<br/><input id='size' type='number' value='1' /></label><br/>
      <label>Cost per Disk ($):<br/><input id='cost' type='number' value='100' /></label><br/>
      <label>Replication Factor:<br/><input id='replication' type='number' value='2' /></label><br/>

      <button onclick='calculate()' style='margin-top: 1rem;'>Calculate Usable Storage</button>

      <div id='results' style='margin-top: 2rem; font-size: 1.1rem;'></div>
    </div>
  `;

  window.calculate = function () {
    const hosts = +document.getElementById('hosts').value;
    const disks = +document.getElementById('disks').value;
    const size = +document.getElementById('size').value;
    const cost = +document.getElementById('cost').value;
    const replication = +document.getElementById('replication').value;

    const totalDisks = hosts * disks;
    const totalRaw = totalDisks * size;
    const usable = totalRaw / replication;
    const totalCost = totalDisks * cost;

    document.getElementById('results').innerHTML = `
      <hr style="margin: 1.5rem 0;" />
      <p><strong>Total Disks:</strong> ${totalDisks}</p>
      <p><strong>Total Raw Capacity:</strong> ${totalRaw} TB</p>
      <p><strong>Usable Capacity:</strong> ${usable.toFixed(2)} TB</p>
      <p><strong>Total Cost:</strong> $${totalCost}</p>
      <p><em>Assumes linear replication model for demonstration</em></p>
    `;
  };
});
