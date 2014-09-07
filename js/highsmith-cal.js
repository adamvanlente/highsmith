/*
 * Highsmith - a simple, JS only calendar picker
 * with a handful of customization options.  Check out
 * the README for all options.
 */

var Highsmith = function(elementId, userOptions) {

    // A couple dom helper functions.

    // Get an element.
    function get(id) {
        return document.getElementById(id);
    }

    // Create a dom element.
    function create(type, id, content) {
        var el = document.createElement(type);

        id = id || '';
        className = id || '';
        content = content || '';

        el.id = id;
        el.className = className;
        el.innerHTML = content;

        return el;
    }

    // The element being Highsmithed.
    var el = get(elementId);
    el.readOnly = true;

    // Default options, if none have been passed.
    var defaultOptions = {

        format: 'mdy',
        killButton: false,
        resetDateButton: false,
        disableOffClicker: false,

        style: {

          disable: false,

          month: {

              bgColor: '#F1F1F1',
              color: '#333',
              fontFamily: false,
              fontSize: '16px',
              labelSize: '80%',
              padding: '4px',
              toggleSize: '10%'

          },

          year: {

              bgColor: '#F1F1F1',
              color: '#777',
              fontFamily: false,
              fontSize: '14px',
              labelSize: '60%',
              padding: '4px',
              toggleSize: '10%'

          },

          days: {

              bgColor: '#F1F1F1',
              color: '#333',
              fontFamily: false,
              fontSize: '13px',
              height: '16px',
              legendBgColor: '#DCDCDC',
              legendColor: '#333',
              nullBgColor: '#FAFAFA',
              padding: '4px',
              width: '20px'

          },

          globals: {
              fontFamily: 'Georgia, serif',
              bgColor: '#FFFFFF',
              border: '1px solid #F1F1F1',
              borderRadius: '2px',
              downArrowIcon: '&#8672;',
              upArrowIcon: '&#8674;',
              width: '200px'

          },

          buttons: {
              fontSize: '12px',
              padding: '4px'
          }

        }

    };

    // Days of the week, in order.
    var dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday'];

    // Months of the year.
    var monthList = [ 'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    // Capture the default options as the current options.
    var options = defaultOptions;

    // Update the options with any options passed by the user.
    updateOptions(userOptions);

    // The id of the calendar item.
    var calIdentity = el.className ?
        'highsmithCal ' + el.className : 'highsmithCal';

    // Declare the globals we'll be using for the cal.
    var month,
        year,
        day,
        dayOfWeek,
        daysInMonth;

    /*
     * Set the calendar to the UI.  This is the main function; it is the click
     * action of the input attached to the calendar.  It builds the dom
     * elements of the calendar and renders it to the UI.
     */
    function setCalendar (event) {

        // If the calendar exists, remove it.
        if (get(calIdentity)) {
            removeCalendar();
        }

        // Get the x & y coords of where the click occurred.
        var x = event.clientX;
        var y = event.clientY;

        // Set a div behind the cal.  Allows the calendar to close when the user
        // clicks away from it.
        setupOffClicker();

        // Create the calendar element.
        setupCalendar(x, y);

    }

    // When a user clicks away from the calendar, this div's onclick listener
    // removes the calendar.
    function setupOffClicker() {
        if (!options.disableOffClicker) {
            var div = create('div', 'highsmithCal--offClicker');
            if (!options.style.disable) {
                div.style.display = 'block';
                div.style.position = 'fixed';
                div.style.top = 0 + 'px';
                div.style.left = 0 + 'px';
                div.style.bottom = 0 + 'px';
                div.style.right = 0 + 'px';
                div.style.zIndex = '9999';
            }
            document.body.appendChild(div);

            // Close the calendar if the user clicks 'off' of it.
            div.addEventListener('click', function() {
                removeCalendar();
            });
        }
    }

    // Set up the calendar dom elements
    function setupCalendar(x, y) {

        var cal = create('div', calIdentity);

        // Add the month, year and day elements
        addMonth(cal);
        addYear(cal);
        addDayLegend(cal);
        addDayHolder(cal);

        // Add some global styles to the calendar.
        cal = styleCal(cal, x, y);

        document.body.appendChild(cal);

        addDays();
        addResetButton();
        addKillButton();
    }

    // Add the span that holds the month label and toggles.
    function addMonth(cal) {

        var style = options.style.month;

        // Create a span to hold the month, as well as buttons to toggle it
        // up or down.
        var monthSpan = create('span', 'highsmithCal--month')

        // Create a toggle icon to decrement the month.
        var downLabel = create('label', 'highsmithCal--month__decrement',
            options.style.globals.downArrowIcon)

        // Create a label
        var monthLabel = create('label', 'highsmithCal--month__label',
            monthList[month]);

        // Create a toggle icon to increment the month.
        var upLabel = create('label', 'highsmithCal--month__increment',
            options.style.globals.upArrowIcon);

        // Decrement the month when the toggle is clicked.
        downLabel.addEventListener('click', function() {
            decrementMonth();
        });

        // Increment the month when the toggle is clicked.
        upLabel.addEventListener('click', function() {
            incrementMonth();
        });

        styleMonthAndYear(monthSpan, monthLabel, upLabel, downLabel, style, cal);
    }

    // Add the year label and toggles to the calendar.
    function addYear(cal) {

        var style = options.style.year;

        // Create a span to hold the year, as well as buttons to toggle it
        // up or down.
        var yearSpan = create('span', 'highsmithCal--year')

        // Create a toggle icon to decrement the year.
        var downLabel = create('label', 'highsmithCal--year__decrement',
            options.style.globals.downArrowIcon)

        // Create a label
        var yearLabel = create('label', 'highsmithCal--year__label', year);

        // Create a toggle icon to increment the year.
        var upLabel = create('label', 'highsmithCal--year__increment',
            options.style.globals.upArrowIcon);

        // Decrement the year when the button is clicked.
        downLabel.addEventListener('click', function() {
            decrementYear();
        });

        // Increment the year when the button is clicked.
        upLabel.addEventListener('click', function() {
            incrementYear();
        });

        styleMonthAndYear(yearSpan, yearLabel, upLabel, downLabel, style, cal);
    }

    // Style the month/year divs.
    function styleMonthAndYear(span, label, up, down, style, cal) {
        if (!options.style.disable) {

            // Style the holder span
            if (style.fontFamily) {
                span.style.fontFamily = style.fontFamily;
            }
            span.style.fontSize = style.fontSize;
            span.style.padding = style.padding;
            span.style.backgroundColor = style.bgColor;
            span.style.color = style.color;
            span.style.display = 'block';

            // style the down toggle.
            down.style.width = style.toggleSize;
            down.style.height = style.toggleSize;
            down.style.cursor = 'pointer';

            // Style the year label.
            label.style.width = style.labelSize;
            label.style.display = 'inline-block';

            // Style the up toggle.
            up.style.width = style.toggleSize;
            up.style.height = style.toggleSize;
            up.style.cursor = 'pointer';
        }

        // Append the year items to the year holder.
        span.appendChild(down);
        span.appendChild(label);
        span.appendChild(up);

        // Append the year holder to the calendar.
        cal.appendChild(span)
    }

    // Add the reset button to the calendar.
    function addResetButton(div) {
        if (!get('highsmithCal--resetButton') &&
            options.resetDateButton) {
            var resetSpan =
                create('span', 'highsmithCal--resetButton', 'reset');
            styleButtons(resetSpan, resetDate);
        }
    }

    // Add the kill button to the calendar.
    function addKillButton(div) {
        if (!get('highsmithCal--killButton') &&
            options.killButton) {
              var killSpan =
                  create('span', 'highsmithCal--killButton', 'remove calendar');
              styleButtons(killSpan, killCalListener);
        }
    }

    // Style the kill/reset buttons.
    function styleButtons(button, clickFn) {
        if (!options.style.disable) {
            var style = options.style.buttons;

            button.style.fontSize = style.fontSize;
            button.style.padding = style.padding;
            button.style.backgroundColor = style.bgColor;

            button.style.display = 'block';
            button.style.cursor = 'pointer';
        }
        get('highsmithCal').appendChild(button);
        button.addEventListener('click', clickFn);
    }

    // Add day legend, the part of the cal that shows the days of the week.
    function addDayLegend(div) {

        var style = options.style.days;

        var dateHolder = create('span', 'highsmithCal--daysLegend');
        if (!options.style.disable) {
            if (style.fontFamily) {
                dateHolder.style.fontFamily = style.fontFamily;
            }
            dateHolder.style.fontSize = style.fontSize;
            dateHolder.style.color = style.color;
            dateHolder.style.backgroundColor = style.legendBgColor;

            dateHolder.style.display = 'block';
            dateHolder.style.textAlign = 'left';
        }

        var days = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

        for (var i = 0; i < days.length; i++) {
            var dateElement = create('label', 'highsmithCal--daysLegend__label',
                days[i]);

            if (!options.style.disable) {
                dateElement.style.padding = style.padding;
                dateElement.style.width = style.width;
                dateElement.style.height = style.height;
                dateElement.style.color = style.legendColor;

                dateElement.style.display = 'inline-block';
                dateElement.style.textAlign = 'center';
            }
            dateHolder.appendChild(dateElement);
        }
        div.appendChild(dateHolder);
    }

    // Add the part of the calendar that will hold the number days.
    function addDayHolder(div) {

        var style = options.style.days;

        var dateHolder = create('span', 'highsmithCal--dayHolder');
        if (!options.style.disable) {
            dateHolder.style.fontSize = style.fontSize;
            dateHolder.style.backgroundColor = style.bgColor;

            dateHolder.style.display = 'block';
            dateHolder.style.textAlign = 'left';
        }
        div.appendChild(dateHolder);
    }

    // Add the actual calendar days to the calendar.
    function addDays() {

        var style = options.style.days;

        var dateHolder = get('highsmithCal--dayHolder');
        dateHolder.innerHTML = '';

        var firstDay = new Date(year, month, 1).getDay();

        for (var i = 0; i < firstDay; i++) {
            var dateElement = create('label',
                'highsmithCal--dayHolder__nullLabel');
            if (!options.style.disable) {
                dateElement.style.padding = style.padding;
                dateElement.style.width = style.width;
                dateElement.style.height = style.height;
                dateElement.style.backgroundColor = style.nullBgColor;

                dateElement.style.display = 'inline-block';
                dateElement.style.textAlign = 'center';
                dateElement.style.verticalAlign = 'top';
            }
            dateHolder.appendChild(dateElement);
        }

        for (var i = 0; i < daysInMonth; i++) {
            var date = i + 1;

            // Highlight today on the calendar.
            if (day == date && month == new Date().getMonth()) {
              date = '<b>' + date + '</b>';
            }
            var dateElement = create('label', 'highsmithCal--dayHolder__label',
                date);

            if (!options.style.disable) {
              dateElement.style.padding = style.padding;
              dateElement.style.width = style.width;
              dateElement.style.height = style.height;
              dateElement.style.backgroundColor = style.bgColor;

              dateElement.style.display = 'inline-block';
              dateElement.style.textAlign = 'center';
              dateElement.style.verticalAlign = 'top';
              dateElement.style.cursor = 'pointer';
              dateElement.style.transition = 'all 0.2s';

              dateElement.addEventListener('mouseenter', function(e) {
                  e.target.style.backgroundColor = '#DCDCDC';
              });

              dateElement.addEventListener('mouseleave', function(e) {
                  e.target.style.background = 'none';
              });
            }

            dateElement.addEventListener('click', setDateToInput);
            dateHolder.appendChild(dateElement);
        }

    }

    // Give the calendar some global stylings.
    function styleCal(cal, x, y) {

        var style = options.style.globals;

        if (!options.style.disable) {

            cal.style.fontFamily = style.fontFamily;
            cal.style.border = style.border;
            cal.style.backgroundColor = style.bgColor;
            cal.style.width = style.width;
            cal.style.borderRadius = style.borderRadius;

            cal.style.display = 'block';
            cal.style.position = 'absolute';
            cal.style.zIndex = '10000';
            cal.style.top = y + 'px';
            cal.style.left = x + 'px';
            cal.style.textAlign = 'center';
        }
        return cal;
    }

    // Remove the calendar from the dom.
    function removeCalendar() {
        if (get('highsmithCal--offClicker')){
            get('highsmithCal--offClicker').remove();
        }
        if (get(calIdentity)) {
            get(calIdentity).remove();
        }
    }

    // Increment the calendar month.
    function incrementMonth() {
        month++;
        if (month > monthList.length - 1) {
            month = 0;
            year++;
        }
        updateCalendar();
    }

    // Decrement the calendar month.
    function decrementMonth() {
        month--;
        if (month < 0) {
            month = monthList.length - 1;
            year--;
        }
        updateCalendar();
    }

    // Increment the calendar year.
    function incrementYear() {
        year++;
        updateCalendar();
    }

    // Decrement the calendar year.
    function decrementYear() {
        year--;
        updateCalendar();
    }

    // Update the display of the calendar.
    function updateCalendar() {
        get('highsmithCal--month__label')
            .innerHTML = monthList[month];
        get('highsmithCal--year__label')
            .innerHTML = year;
        addDays();
    }

    // Reset calendar date and update the display.
    function resetDate() {
        resetToToday();
        updateCalendar();
    }

    // Reset to the default date, which is today's month/day.
    function resetToToday() {
        var date = new Date();

        month = date.getMonth();
        year = date.getFullYear();
        day = date.getDate();
        dayOfWeek = date.getDay();
        daysInMonth = new Date(year, month, 0).getDate();
    }

    // Format the selected date, place it in the Highsmithed element, and remove
    // the calendar from the dom.
    function setDateToInput(event) {
        var day = event.target.innerHTML;
        var localMonth = String(month + 1);

        day = ('0' + day).slice(-2);
        localMonth = ('0' + localMonth).slice(-2);

        var val;
        if (options.format == 'mdy') {
            val = localMonth + '/' + day + '/' + year;
        } else if (options.format == 'ymd') {
            val = year + '/' + localMonth + '/' + day;
        } else {
            val = day + '/' + localMonth + '/' + year;
        }

        el.value = val;
        el.innerHTML = val;
        removeCalendar();
    }

    // Stop said Highsmith instance.
    function killCalListener() {
        removeCalendar();
        el.removeEventListener('click', setCalendar);
        el.readOnly = false;
    }

    // Log the current options to the dom.
    function showOptions() {
        console.log(options);
    }

    // Update the current options from a live instance of Highsmith.  Invoked
    // like so: hsInstance.updateOptions(optionsObject);
    function updateOptions(optionObject, optionsNode) {
        optionsNode = optionsNode || options;
        for (item in optionObject) {
          updateOptionsObject(optionObject, item, optionsNode)
        }
    }

    // Explore the customer user options and update the global options object.
    function updateOptionsObject(userOptions, item, optionsNode) {
        if (typeof optionsNode[item] != 'object') {
            optionsNode[item] = userOptions[item];
        } else {
            updateOptions(userOptions[item], optionsNode[item]);
        }
    }

    // Custom function to remove a dom element without knowing its parent.
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }

    // Add the calendar event listener to the Highsmithed element.
    el.addEventListener("click", setCalendar, false);

    // Reset the date to today.
    resetToToday();

    // Expose some public functions to the Highsmith instance.
    return {

      kill: killCalListener,
      showOptions: showOptions,
      updateOptions: updateOptions,
      removeCalendar: removeCalendar

    }
};
