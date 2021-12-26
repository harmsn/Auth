# Getting Started with App

Live URL: https://authenticationbas.herokuapp.com/

1.Steps to install on the local :

  1. clone the repo<br/>
  2. cd  directory<br/>
  3. npm install<br/>
  4. npm start<br/>



2. Structure of directory<br/>
  1. src<br/>
      1.index.js // Root<br/>
      2.Routes.js //Handles all the routing<br/>
      3.Components<br/>
        3.1.Authenticated<br/>
          3.1.1.Profile<br/>
          3.1.2 ... Can be added more based on the requiremnt.<br/>
        
        3.2 Unauthentiated<br/>
          3.2.1 Login<br/>
          3.2.2 Signup__
          3.2.3 Can be added more based on the need.__ 

        3.3 Reusable Components__
          3.3.1 InputField //Global input field to be used everywhere to maintain consistency__
          3.3.2 ... Can be added more__
          
        3.4 Service // Services for the functinaities.
          3.4.1   Authentication //handle all the authentication based requests.
          3.4.2   ...Can be added more
          
        3.5 Store //Global store
          3.5.1 Actions //Handles the actions
          3.5.2 Reducers //Handles the global state   

        3.6 Utils //Utility functions common for the portal
          3.6.1 Validations //Validation patterns for email, ...
          3.6.2 Reusable Functions // Debouncing, Error, Success
