import React, { useState } from "react";
import Autocomplete from "../AutoComplete";
import Userlist from "../Data/user.json"
import "./index.css";

const AutocompletePage = () => {
    const [name, setName] = useState("");
    return (
        <>
            <div className="text-heading">
            <h3>Building An Auto complete Search bar </h3>
            <p>You can search by <i>Name, Id, Pincode</i></p>
            </div>
            
            <div className="row">
                <div className="col text-center">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="search-bar-container1">
                            <Autocomplete
                                data={Userlist}
                                onSelect={data => setName(data)}
                            />
                        </div>
                    </div>

                    {name && (
                        <pre className="text-left">
                            {JSON.stringify(name, 0, 2)}
                            {Userlist.name}
                        </pre>
                    )}
                </div>
            </div>
        </>
    );
};

export default AutocompletePage;


