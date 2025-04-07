document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div style='padding: 2rem; background: #111827; color: white; font-family: sans-serif;'>
      <h1 style='text-align:center; color:#38bdf8;'>💾 Angry Admin Storage Calculator</h1>
      <p style='text-align:center; font-size:1.2rem;'>Full Production Build</p>
      <ul style='margin-top:1rem; line-height:1.8;'> 
        <li>✅ Support for Erasure Coding, VMware vSAN, Proxmox ZFS</li>
        <li>✅ CSV Export</li>
        <li>✅ How-To Guide + Disk Tolerance Info</li>
        <li>🎯 Ready to embed in WordPress</li>
      </ul>
      <p style='margin-top:2rem; text-align:center; font-size:0.85rem; color:#94a3b8;'>Replace this JS with your actual React app build output</p>
    </div>
  `;
});