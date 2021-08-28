import React from 'react';
import { Form } from 'react-bootstrap';


const Auto = (searchInput, setSearchInput
) => {

    const SuggestionsList = (props) => {
        const {
            suggestions,
            searchInput,
            onSelectSuggestion,
            displaySuggestions,
            selectedSuggestion,
        } = props;

        if (searchInput && displaySuggestions) {
            if (suggestions.length > 0) {
                return (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => {
                            const isSelected = selectedSuggestion === index;
                            const classname = `suggestion ${isSelected ? "selected" : ""}`;
                            return (
                                <li
                                    key={index}
                                    className={classname}
                                    onClick={() => onSelectSuggestion(index)}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return <div>No suggestions available...</div>;
            }
        }
        return <></>;
    };

    const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);
    const [displaySuggestions, setDisplaySuggestions] = React.useState(false);

    const suggestions = [
        "Los Angeles, CA",
        "Austin, TX",
        "New York City, NY",
        "Des Moines, IA",
        "Seattle, WA",
        "Phoenix, AZ",
        "Boulder, CO",
    ];

    const onChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);

        const filteredSuggestions = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredSuggestions(filteredSuggestions);
        setDisplaySuggestions(true);
    };

    const onSelectSuggestion = (index) => {
        setSelectedSuggestion(index);
        setSearchInput(filteredSuggestions[index]);
        setFilteredSuggestions([]);
        setDisplaySuggestions(false);
    };

    return (
        <>
            <Form.Control
                size="lg"
                className="user-input form-control-large"
                type="text"
                onChange={onChange}
                value={searchInput}
                placeholder="Input City Here"
            />
            <SuggestionsList
                searchInput={searchInput}
                selectedSuggestion={selectedSuggestion}
                onSelectSuggestion={onSelectSuggestion}
                displaySuggestions={displaySuggestions}
                suggestions={filteredSuggestions}
            />
        </>
    );
};

export default Auto