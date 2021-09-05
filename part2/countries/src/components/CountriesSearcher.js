import React from "react";

export const CountriesSearcher = ({ filters, setFilters }) => {
  return (
    <label style={{ margin: "0 auto" }}>
      Search information of up to ten countries:
      <input
        style={{ margin: "0 1%" }}
        value={filters?.countryName}
        placeholder="Canada"
        onChange={(event) =>
          setFilters({ ...filters, countryName: event.target.value })
        }
      />
    </label>
  );
};
