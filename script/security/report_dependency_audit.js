const fs = require("fs");

const report = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
if (report.error) {
  console.error("npm audit failed:", report.error.code || report.error.summary || "unknown error");
  process.exitCode = 1;
} else if (report.advisories) {
  const issues = Object.values(report.advisories).map(a => ({
    id: a.id,
    package: a.module_name,
    severity: a.severity,
    title: a.title,
    vulnerable: a.vulnerable_versions,
    patched: a.patched_versions,
    url: a.url,
    findings: a.findings?.map(f => ({ version: f.version, paths: f.paths?.slice(0, 5) })),
  }));
  console.log(JSON.stringify({
    auditedDependencies: report.metadata?.dependencies?.total,
    reported: report.metadata?.vulnerabilities,
    issues,
  }, null, 2));
} else if (report.vulnerabilities) {
  console.log(JSON.stringify(Object.entries(report.vulnerabilities).map(([name,v])=>({
    package:name, severity:v.severity, range:v.range, fixAvailable:v.fixAvailable,
    via:v.via, effects:v.effects,
    nodes:v.nodes?.slice(0,5)
  })), null, 2));
} else {
  console.error("Unrecognized npm audit JSON schema");
  process.exitCode = 1;
}
