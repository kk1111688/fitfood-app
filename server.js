const http = require("http"), fs = require("fs"), path = require("path");
const PORT = 3480;
const TYPES = {".html":"text/html;charset=utf-8",".css":"text/css;charset=utf-8",".js":"application/javascript;charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".ico":"image/x-icon"};
const ROOT = __dirname;

http.createServer((req, res) => {
  let url = new URL(req.url, "http://l:" + PORT).pathname;
  if (url === "/") url = "/index.html";
  const fp = path.join(ROOT, url);
  const ext = path.extname(fp);
  
  // Security: prevent directory traversal
  if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
}).listen(PORT, "0.0.0.0", () => {
  console.log("\n🔥 燃脂食堂 已启动");
  console.log("手机连接同WiFi后访问:");
  
  // Find local IP
  const os = require("os");
  const nets = os.networkInterfaces();
  let ip = "localhost";
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal && name !== "Loopback Pseudo-Interface 1") {
        ip = net.address;
        break;
      }
    }
    if (ip !== "localhost") break;
  }
  console.log("http://" + ip + ":" + PORT);
  console.log("\n在手机上用浏览器打开后，点「添加到主屏幕」即可安装\n");
});
