const units = {
    length: [
        { name: 'Meters', factor: 1 },
        { name: 'Kilometers', factor: 0.001 },
        { name: 'Centimeters', factor: 100 },
        { name: 'Millimeters', factor: 1000 },
        { name: 'Miles', factor: 0.000621371 },
        { name: 'Yards', factor: 1.09361 },
        { name: 'Feet', factor: 3.28084 },
        { name: 'Inches', factor: 39.3701 }
    ],
    weight: [
        { name: 'Kilograms', factor: 1 },
        { name: 'Grams', factor: 1000 },
        { name: 'Pounds', factor: 2.20462 },
        { name: 'Ounces', factor: 35.274 }
    ],
    temperature: [
        { name: 'Celsius', convert: (value, to) => to === 'Fahrenheit' ? value * 9/5 + 32 : value, factor: 1 },
        { name: 'Fahrenheit', convert: (value, to) => to === 'Celsius' ? (value - 32) * 5/9 : value, factor: 1 }
    ]
};

function populateUnits() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    units[unitType].forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit.name}">${unit.name}</option>`;
        toUnit.innerHTML += `<option value="${unit.name}">${unit.name}</option>`;
    });
}

function convert() {
    const unitType = document.getElementById('unitType').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    if (isNaN(inputValue)) {
        alert('Please enter a valid number');
        return;
    }

    const from = units[unitType].find(unit => unit.name === fromUnit);
    const to = units[unitType].find(unit => unit.name === toUnit);
    
    let result;
    
    if (unitType === 'temperature') {
        result = from.convert(inputValue, to.name);
    } else {
        result = (inputValue / from.factor) * to.factor;
    }

    document.getElementById('result').innerText = `Result: ${result} ${toUnit}`;
}

// Initialize the units when the page loads
populateUnits();
