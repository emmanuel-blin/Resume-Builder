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
   const [companyInfo, setCompanyInfo] = useState([{name:"", position:""}]);

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

   // Updates the states of companies with user's input
   const handleAddCompany = () =>
   setCompanyInfo([...companyInfo, {name:"", position:""}]);

   // Removes a selected item from the list of companies
   const handleRemoveCompany = (index) => {
      const list = [...companyInfo];
      list.splice(index, 1);
      setCompanyInfo(list);
   };

   // Updates an item within the the list of companies
   const handleUpdateCompany = (e, index) => {
      const { name, value } = e.target;
      const list = [...companyInfo];
      list[index][name] = value;
      setCompanyInfo(list);
    };


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
               <h3>Companies you've worked at</h3>
               {companyInfo.map((company, index) => (

                  <div className="nestedContainer" key={index}>

                     <div className="companies">
                        <label htmlFor="name">Company name</label>
                        <input
                              type="text"
                              name="name"
                              required
                              onChange={(e) => handleUpdateCompany(e, index)}
                        />
                     </div>

                     <div className="companies">
                        <label htmlFor="position">Position held</label>
                        <input
                              type="text"
                              name="position"
                              required
                              onChange={(e) => handleUpdateCompany(e, index)}
                        />
                     </div>

                     <div className="btn__group">
                        {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                           <button id="addBtn" >Add</button>
                        )}
                        {companyInfo.length > 1 && (
                           <button id="deleteBtn">Del</button>
                        )}
                     </div>
                  </div>

               ))}

               <button>Create Resume</button>

      </form>

      <em className="requiredInfos"> * = required</em>
   </div>
)

}




export default Home;
