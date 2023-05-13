// Create Madrid map
const madridMap = L.map('map-madrid').setView([40.4168, -3.7038], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(madridMap);
L.marker([40.4168, -3.7038]).addTo(madridMap);




// define a GeoJSON object with average rent prices for different locations, A GeoJSON object is a data format used to represent geographical features or geo structures. 
const rentPricesData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "La Guindalera",
        "rentPrice": 10800
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.673931, 40.438056]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Distrito Salamanca",
        "rentPrice": 12800
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.675131, 40.427045]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Recoletos, Justicia and Jeronimos",
        "rentPrice": 14000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.690939, 40.420188]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Ibiza",
        "rentPrice": 11500
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.677842, 40.421011]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Goya",
        "rentPrice": 11500
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.669647, 40.425749]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Sol",
        "rentPrice": 11000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.70379, 40.4168]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Princesa",
        "rentPrice": 12000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.71451, 40.4318]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Malasana",
        "rentPrice": 12000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.70236, 40.4297]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Chueca",
        "rentPrice": 11500
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.6965, 40.4235]
      }
    }
  ]
};
const rentPricesLayer = L.geoJSON(rentPricesData, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: function(feature, layer) {
      const popupContent = `<p>${feature.properties.name}</p><p>Average Rent Price: ${feature.properties.rentPrice} EUR/year</p>`;
      layer.bindPopup(popupContent);
    }
  }).addTo(madridMap);

// Salary calculator class, constructor to create instances of a
class SalaryCalculator {
  constructor(form) {
    this.form = form;
    this.fieldNames = [
      "annualSalary",
      "rentMortgage",
      "restaurants",
      "markets",
      "transportation",
      "utilities",
      "childcare",
      "clothingShoes",
      "sportsLeisure",
      "doctorVisit",
      "streaming",
      "contingency"
    ];
  }

  calculateTotalExpenses() {
    // Map the field names to their corresponding input field values
    const fieldValues = this.fieldNames.map(name => this.form.elements[name].value);

    // Map the field values to an array of promises that resove to floats or reject with an error
    const fieldPromises = fieldValues.map(value => {
      return new Promise((resolve, reject) => {

        const floatVal = parseFloat(value.replace(/,/g, ""));
        if (!isNaN(floatVal)) {
          resolve(floatVal);
        } else {
          reject(new Error("Invalid input."));
        }
      });
    });

    // Wait for all the promises to resolve and return the sum of the resolved values
    return Promise.all(fieldPromises)
      .then(values => values.reduce((acc, val) => acc + val, 0));
  }


  calculateSalarySurplusDeficit() {
    // get the annual salary value, contingency is usermanual not as a %
    const annualSalary = parseFloat(this.form.elements.annualSalary.value.replace(/,/g, ""));
    const contingency = parseFloat(this.form.elements.contingency.value.replace(/,/g, ""));
      
    // Calculate the total expenses and surplus/deficit
    return this.calculateTotalExpenses()
      .then(totalExpenses => {
        const salarySurplusDeficit = annualSalary - totalExpenses - contingency;

        // Return the salary surplus/deficit
        return Promise.resolve(salarySurplusDeficit);
      })
      .catch(error => Promise.reject(error));
  }
}

// button click
document.getElementById("calculateButton").addEventListener("click", () => {
  const form = document.querySelector("form");
  const salaryCalculator = new SalaryCalculator(form);

  salaryCalculator.calculateSalarySurplusDeficit()
    .then(salarySurplusDeficit => {
      const resultElement = document.getElementById("salarySurplusDeficit");
      resultElement.innerHTML = `Salary Surplus/Deficit: ${salarySurplusDeficit.toFixed(2)}`;

      // Add a class to the result element if the result is negative
      if (salarySurplusDeficit < 0) {
        resultElement.classList.add("negative");
      } else {
        resultElement.classList.remove("negative");
      }
    })
    .catch(error => {
      //log the error to the console
      console.error(error);
      //set the innerHTML to display the error message
      document.getElementById("salarySurplusDeficit").innerHTML = "Error: Invalid input.";
    });
});

  






/*
// create Lisbon map
const lisbonMap = L.map('lisbon-map').setView([38.7223, -9.1393], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(lisbonMap);
L.marker([38.7223, -9.1393]).addTo(lisbonMap);
*/