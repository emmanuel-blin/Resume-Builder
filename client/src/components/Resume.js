import {useReactToPrint} from "react-to-print";
import React, {useRef} from "react";
import ErrorPage from "./ErrorPage";

const Resume = ({result}) => {
   const componentRef = useRef();

   const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `${result.fullName} Resume`,
		onAfterPrint: () => alert("Print Successful!"),
	});


   if (JSON.stringfy(result) === "{}") {
      return <ErrorPage/>;
   }
   
   const replaceWithBr = (string) => {
      return string.replace(/\n/g, "<br />");
   };

   return (
      <>
      <button onClick={handlePrint}>Print Page</button>
      <main className="container" ref={componentRef}>
         <header className="header">

            <div>
               <h1>{result.fullName}</h1>
               <p className="resumeTitle headerTitle">
                  {result.currentPosition} ({result.currentTechnologie })
               </p>
               <p className="resumeTitle">
                  {result.currentLength}year(s) work experience
               </p>
            </div>

            <div>
               <img
                  src={result.image_url}
                  alt={result.fullName}
                  className="resumeImage"
               />
            </div>

         </header>
         <div className="resumeBody">
            <div>
               <h2 className="resumeBodyTitle"> Profile Summary</h2>
               <p
							dangerouslySetInnerHTML={{
								__html: replaceWithBr(result.objective),
							}}
							className='resumeBodyContent'
						/>
            </div>

            <div>
               <h2 className="resumeBodyTitle">Work History</h2>
               {result.workHistory.map((work) => ( 
                  <p className="resumeBodyContent" key={work.name}>
                     <span style={{fontWeight: "bold"}}>{work.name}</span> - {" "}{work.position}
                  </p>
               ))}
            </div>

            <div>
               <h2 className="resumeBodyTitle">Job Profile</h2>
               <p
                  dangerouslySetInnerHTML={
                     {__html: replaceWithBr(result.jobResponsabilities),}
                  }
                  className="resumeBodyContent"
               >
               </p>
            </div>

            <div>
               <h2 className="resumeBodyTitle">Job Responsabilities</h2>
               <p
                        dangerouslySetInnerHTML={{
                          __html: replaceWithBr(result.keypoints),
                       }}
                        className="resumeBodyContent"
               />
            </div>
         </div>
      </main>
      </>
   );
};

export default Resume;