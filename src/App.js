import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "./react-query-client";
import FormulaInput from "./components/FormulaInput";

function App() {
  const containerStyle = {
    margin: "20px 100px", // Center the container
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={containerStyle}>
          <FormulaInput />
          {/* Any other components */}
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
