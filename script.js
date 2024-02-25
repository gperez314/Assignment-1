// Name: Assignement1
// Course Code: SODV1201
// Class: Software Development Diploma program
// Author: Glenn Perez

// ===========================================================================================================================
// Item 1: The footer of your page should include current date and copy right information.
(function () {
    const now = new Date();
    // Constants to display month as text
    const m = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    document.querySelector('#date').textContent = m[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
})();

// ===========================================================================================================================
// Item 2: In your profile page, the name of the picture should appear after 10 seconds.
setTimeout(() => {
    try {
        document.querySelector('#homeName').innerHTML = "Glenn Perez";
    } catch {} // Catch error if home page is not selected as event listerner will not be created
}, 10000)

// ===========================================================================================================================
// Item 3: Build a Mark to Grade converter web page and create a link to it in your profile page
try {
    document.querySelector('#convertMark').addEventListener('click', () => {
        let mark = document.querySelector('#mark').value;
        let grade = document.querySelector('#gradeprompt');
        MarkToGrade(mark)
            .then(res => {
                grade.innerHTML = res;
                grade.style.color = 'rgb(191, 191, 191)';
            })
            .catch(rej => {
                grade.innerHTML = rej;
                grade.style.color = 'red';
            })

    })

    // Function to convert mark to grade
    const MarkToGrade = (mark) => {
        return new Promise((resolve, reject) => {
            // If there is no mark entered display error
            if (mark.trim() == "") {
                reject("Mark is empty. Please enter a mark!");
            } else {
                // If there is mark entered. Evaluate the input.
                // I use Number() function instead of ParseInt() because I want alphanumeric combinations
                // to be considered as invalid. For example '99a' will be evaluated as invalid using
                // Number() function but will be evaluated to 99 using ParseInt() function. 
                mark = Number(mark);
                // If the user entered any value above 90 Grade A should be displayed as a result
                if ((mark > 90) && (mark <= 100)) {
                    resolve("Grade A");
                }
                // If user entered any value above 80 Grade B should be displayed
                else if ((mark > 80) && (mark <= 90)) {
                    resolve("Grade B");
                }
                // If user entered any value above 70 Grade C should be displayed
                else if ((mark > 70) && (mark <= 80)) {
                    resolve("Grade C");
                }
                // If user entered any value above 50 Grade D should be displayed
                else if ((mark >= 50) && (mark <= 70)) {
                    resolve("Grade D");
                }
                // If user entered any value less than 50 Grade F should be displayed
                else if ((mark >= 0) && (mark <= 50)) {
                    resolve("Grade F");
                }
                // if the user entered a negative number display error
                else if (mark < 0) {
                    reject("Mark entered is negative. Please input a number in valid range (0-100)!");
                }
                // if the user entered value above 100 display error
                else if (mark > 100) {
                    reject("Mark entered is above valid limit. Please input a number in valid range (0-100)!");
                }
                // If the user entered a non-numeric value, display error
                else {
                    reject("Not a valid mark value. Please input a number in valid range (0-100)!");
                }
            }
        })
    }
} catch {} // Catch error if grade converter page is not selected as event listerner will not be created

// ===========================================================================================================================
// Item 4: Create a new staff page and write a program which display list of staff information with sorting
// capability by name and salary. Sample array data about staffs will be provided for you from your instructor.
// You can restructure the dataset as you want. Link this staff page to your profile page.
$(document).ready(() => {
    try {
        // Staff data provided in the instructions
        var dataSet = [
            ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
            ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
            ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
            ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
            ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
            ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
            ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
            ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
            ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
            ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
            ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
            ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
            ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
            ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
            ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
            ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
            ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
            ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
            ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
            ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
            ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
            ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
            ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
            ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
            ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
            ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
            ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
            ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
            ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
            ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
            ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
            ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
            ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
            ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
            ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
            ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
        ];

        // Sort staff data by name by default
        sortData(dataSet, 'name');

        // Event listener to sort staff data when dropdown value is changed
        let sortorder = document.querySelector('#sortOrder');
        sortorder.addEventListener('change', () => {
            sortData(dataSet, sortorder.value)
        })

        // Function to sort staff data depending on dropdown value
        function sortData(data, mode) {
            if (mode == 'name') {
                // Sort data by staff name in alphabetical order
                data.sort(function (a, b) {
                    return a[0].localeCompare(b[0]);
                })
            } else {
                // Sort data by staff salary in ascending order
                data.sort(function (a, b) {
                    return parseInt(a[5].replace(/[^\d.-]/g, '')) - parseInt(b[5].replace(/[^\d.-]/g, ''));
                })
            }
            PopulateStaff(data);
        }

        // Function to populate ordered staff data into HTML
        function PopulateStaff(staff) {
            let containerEle = document.querySelector(".staffContainer");
            // Reset HTML data
            containerEle.innerHTML = "";
            staff.forEach((data) => {
                containerEle.innerHTML += `
            <div class="card">
                <div class="left-infor">
                    <img src="images/person-icon.png" alt="">
                    <p>${data[1]}</p>
                </div>
                <div class="right-infor">
                    <h1>${data[0]}</h1>
                    <p>Salary: ${data[5]}</p>
                    <hr>
                    <ul>
                        <li>${data[2]}</li>
                        <li>${data[3]}</li>
                        <li>${data[4]}</li>
                    </ul>
                </div>
            </div>`
            })
        }
    } catch {} // Catch error if staff page is not selected as event listerner will not be created
})

// ===========================================================================================================================
// Item 5: Create a new page called weather. On this page use the concept of JavaScript named and anonymous
// function and create a program that can accept a temperature input in degree Fahrenheit and convert it 
// into degree Celsius and from Celsius to Kelvin based on a button click event.
// Use JQuery to access the DOM elements.
$(document).ready(() => {
    try {
        $("#convertTemp").click((event) => {
            let temp = $('#tempFarenheit').val();
            ConvertTemp(temp) // Named function
                .then(res => {
                    $('#tempConverted').html(res);
                    $('#tempConverted').css({
                        "color": "rgb(191, 191, 191)"
                    });
                })
                .catch(rej => {
                    $('#tempConverted').html(rej);
                    $('#tempConverted').css({
                        "color": "red"
                    });
                })
        })

        // Named function to convert temperature in Farenheit to Celcius and Kelvin
        function ConvertTemp(temp) {
            return new Promise((resolve, reject) => {
                // If there is no temperature entered display error
                if (temp.trim() == "") {
                    reject("Temperature field is empty. Please enter temperature!");
                } else {
                    temp = Number(temp);
                    if (isNaN(temp)) {
                        reject("Temperature entered is not a number. Please enter valid temperature!");
                    } else {

                        // Anonymous function to convert Farenheit to Celcius
                        const celciusTemp = (farenheit) => {
                            return (5 / 9) * (farenheit - 32);
                        }
                        let celcius = celciusTemp(temp);

                        // Anonymous function to convert Celcius to Kelvin
                        const kelvinTemp = (celcius) => {
                            return celcius + 273.15;
                        }
                        let kelvin = kelvinTemp(celcius);

                        let message = "The temperature " + temp + " °F is equivalent to " + celcius.toFixed(2) + " °C and " + kelvin.toFixed(2) + " K."
                        resolve(message);
                    }
                }
            })
        }
    } catch {} // Catch error if weather page is not selected as event listerner will not be created
})