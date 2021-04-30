import React from "react";

const AutoCompleteItem = ({
    name,
    id,
    items,
    address,
    pincode,
    onSelectItem,
    isHighlighted
}) => {
    return (
        
            <li
                className={`list-group-item ${
                    isHighlighted ? "active highlighted" : ""
                }`}
                onClick={onSelectItem}
            >
                <div className="row">
                    <div className="col text-left">
                        <p className="mb-0 font-weight-bold line-height-1">
                            {name}{" "}
                        </p>
                        <p className="badge" id = "id">{id}</p>
                        <p className="badge" id = "items">{items}</p>
                        <p className="badge" id = "pincode">{pincode}</p>
                        <p className="badge" id = "address">{address}</p>
                    </div>
                </div>
            </li>
        
    );
};

export default AutoCompleteItem;

