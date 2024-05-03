import { saveAs } from "file-saver";

function exportFile() {
  let lyrics =
    "But still I'm having memories of high speeds when the cops crashed\n" +
    "As I laugh, pushin the gas while my Glocks blast\n" +
    "We was young and we was dumb but we had heart";

  var blob = new Blob([lyrics], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "testfile1.txt");
}

export default function StdLibFileSaver({content, filename}) {
  return (
    <div>StdLibFileSaver</div>
  )
}




function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => exportFile()}>exportFile</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
