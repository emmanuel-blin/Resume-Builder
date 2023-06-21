import React from "react";
import { useState } from "react";
import Loading from "./Loading";


const Home = () => {
   const [fullName, setFullName] = useState("");
   const [currentPosition, setCurrentPosition] = useState("");
   const [currentLength, setCurrentLength] = useState("");
   const [currentTechnologies, setCurrentTechnologies] = useState("");
   const [headshot, setHeadshot] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleFormSubmit = (e) => { 
      e.preventDefault();
      console.log({
         fullName,
         currentPosition,
         currentLength,
         currentTechnologies,
         headshot
      });
      setLoading(true);
   }



if (loading) {
   return <Loading />
}



return ( 
   <div className="app">
      <h1>Resume Builder</h1>
      <p>Generate a resume with ChatGPT in a few seconds</p>
      <form 
         onSubmit={handleFormSubmit}
         method="POST" 
         encType="multipart/form-data"
      >
         <label htmlFor="fullName">Enter your full name *</label>
            <input 
                  type="text"
                  required
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
            />

            <div className="nestedContainer">
               <div>
                  <label htmlFor="currentPosition">Current position *</label>
                  <input
                        className="currentInput"
                        type="text"
                        required
                        name="currentPosition"
                        value={currentPosition}
                        onChange={(e) => setCurrentPosition(e.target.value)}
                     />
               </div>

               <div>
               <label htmlFor="currentLenght">For how long ? (year) *</label>
               <input
                     className="currentImput"
                     type="number"
                     required
                     name="currentLength"
                     value={currentLength}
                     onChange={(e) => setCurrentLength(e.target.value)}
               />
               </div>

               <div>
                  <label htmlFor="currentTechnologie">Technoligie used *</label>
                  <input
                        className="currentTechnologies"
                        type="text"
                        required
                        name="currentTechnologies"
                        value={currentTechnologies}
                        onChange={(e) => setCurrentTechnologies(e.target.value)}
                  />
               </div>
            </div>

               <div>
                  <label htmlFor="photo">Upload your headshot image *</label>
                  <input
                        type="file"
                        name="photo"
                        required
                        id="photo"
                        accept="image/x-png,image/jpeg"
                        onChange={(e) => setHeadshot(e.target.value)}
                  />
               </div>

               <button>Create Resume</button>

      </form>

      <em className="requiredInfos"> * = required</em>
   </div>
)

}




export default Home;
