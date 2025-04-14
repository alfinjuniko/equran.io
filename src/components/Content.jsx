import React from "react";

const Content = ({ children }) => {
     return (
          <>
               {/* Main Content */}
               <div className="p-4">
                    <div>{children}</div>
               </div>
          </>
     );
};

export default Content;
