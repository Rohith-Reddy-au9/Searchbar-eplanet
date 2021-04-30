import React, { useState, useRef, useEffect, useMemo } from "react";
import AutoCompleteItem from "./AutoCompleteItem";

const AutoComplete = ({data, onSelect }) => {
    const [isVisbile, setVisiblity] = useState(false); // visibility state
    const [search, setSearch] = useState("");  // searchh text state
    const [cursor, setCursor] = useState(-1);

    const searchContainer = useRef(null);
    const searchResultRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const scrollIntoView = position => {
        searchResultRef.current.parentNode.scrollTo({
            top: position,
            behavior: "smooth"
        });
    };

    // cursor lent less than 0 
    useEffect(() => {
        if (cursor < 0 || cursor > filteredData.length || !searchResultRef) {
            return () => {};
        }

        let listItems = Array.from(searchResultRef.current.children);
        listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
    }, [cursor]);

    //  filtering tye search data
    const filteredData = useMemo(() => {
        if (!search) return data;
        // user search result should be in top postion
        setCursor(-1);
        scrollIntoView(0);
        // search according to id, name....
        return data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toLowerCase().includes(search.toLowerCase()) ||
            item.address.toLowerCase().includes(search.toLowerCase())  ||
            item.pincode.toLowerCase().includes(search.toLowerCase()) 

        );
    }, [data, search]);

    //  if you click on search bar it shows a suggestions if you click outside search bar it hides the data
    //  means Search container should be inside the search continer then only it allows the suggestions 
    //  otherwise ot doesn't shows/hides the search suggestions
    const handleClickOutside = event => {
        if (
            searchContainer.current &&
            !searchContainer.current.contains(event.target)
        ) {
            hideSuggestion();
        }
    };

    const showSuggestion = () => setVisiblity(true);

    const hideSuggestion = () => setVisiblity(false);

    // keydown value should be in suggestions lentgh 
    // keyup value should be greater than zero
    // if you  press the escape key suggestion will hide
    const keyboardNavigation = e => {
        if (e.key === "ArrowDown") {
            isVisbile
                ? setCursor(c => (c < filteredData.length - 1 ? c + 1 : c))
                : showSuggestion();
        }

        if (e.key === "ArrowUp") {
            setCursor(c => (c > 0 ? c - 1 : 0));
        }
        // hide the suggestions
        if (e.key === "Escape") {
            hideSuggestion();
        }

        // cursor and keydown both placed in same place on
        // pres Enter key you will get the data
        if (e.key === "Enter" && cursor > 0) {
            setSearch(filteredData[cursor].name);
            hideSuggestion();
            onSelect(filteredData[cursor]);
        }
    };

    return (
        <div style={{ height: "100%" }} ref={searchContainer}>
            <input
                type="text"
                name="search"
                className="search-bar1"
                placeholder="Search.. Id, name, address"
                autoComplete="off"
                value={search}
                onClick={showSuggestion}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => keyboardNavigation(e)}
                
            />

            <div
                className={`search-result ${
                    isVisbile ? "visible" : "invisible"
                }`}
            >
                <ul className="list-group" ref={searchResultRef}>
                    {filteredData.map((item, idx) => (
                        <AutoCompleteItem
                            key={item.key}
                            onSelectItem={() => {
                                hideSuggestion();
                                setSearch(item.key);
                                onSelect(item);
                            }}
                            isHighlighted={cursor === idx ? true : false}
                            {...item}
                        />
                    ))}
                    
                </ul>
            </div>
        </div>
    );
};

export default AutoComplete;