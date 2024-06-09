export function getCallerStack() {
  const stack = new Error().stack!.split("\n");

  const result: any = [];

  for (let i = 0; i < stack.length; i++) {
    const item = stack[i].trim().split(" ")[1] || "";

    // this makes the caller stack easier to read and debug,
    // for example ['Sidebar', 'DashboardLayout', 'App', 'render'];
    if (item.startsWith("RSComponent-")) {
      result.push(item.replace("RSComponent-", ""));
    } else if (item.startsWith("ReactDOM.")) {
      result.push(item.replace("ReactDOM.", ""));
    }
  }

  return result;
}
