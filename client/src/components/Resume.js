import React from "react";
import ErrorPage from "./ErrorPage";

const resume = ({result}) => { 
   if (JSON.stringfy(result) === "{}") { 
      return <ErrorPage/>;
   }

   const handlePrint = () => alert("Print Successful !");
   return ( 
      <>
      <button onClick={handlePrint}>Print Page</button>
      <main className="container">
         <p>Hello !</p>
      </main>
      </>
   );
};

export default resume;