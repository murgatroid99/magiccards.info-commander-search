(function() {
  "use strict";

  var color_names = ['white', 'blue', 'black', 'red', 'green'];

  var color_letters = {
    'white': 'w',
    'blue': 'u',
    'black': 'b',
    'red': 'r',
    'green': 'g'
  };

  function getRemovedCombos(colors) {
    if (colors.length <= 1) {
      return [];
    } else {
      var removed = [];
      for (var i = 0; i < colors.length; i++) {
        removed.push(colors.substring(0, i) +
                     colors.substring(i+1, colors.length));
      }
      return removed;
    }
  }

  function makeCheckbox(color) {
    var container = document.createElement('span');
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = color + '_cb';
    cb.value = color_letters[color];
    var label = document.createElement('label');
    label.htmlFor = cb.id;
    label.appendChild(document.createTextNode(color.charAt(0).toUpperCase() +
                                              color.substring(1)));
    container.appendChild(cb);
    container.appendChild(label);
    return container;
  }

  function generateQuery(colors) {
    var query = 't:legendary t:creature legal:commander';
    if (colors.length > 0) {
      query += ' ci:' + colors;
    } else {
      query += ' ci:c';
    }
    var removed = getRemovedCombos(colors);
    for (var i = 0; i < removed.length; i++) {
      query += ' -ci:' + removed[i];
    }
    return query;
  }

  function updateQuery() {
    var text_box = document.getElementById('q2');
    var checkbox_div = document.getElementById('color_checkboxes');
    var checkboxes = checkbox_div.getElementsByTagName('input');
    var colors = '';
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        colors += checkboxes[i].value;
      }
    }
    text_box.value = generateQuery(colors);
  }

  function addCommanderForm() {
    var old_form = document.getElementsByName('f')[0];
    var form_copy = old_form.cloneNode(true);
    form_copy.id = 'commander_form';
    var input_copy = form_copy.getElementsByTagName('input')[0];
    input_copy.id = 'q2';
    input_copy.readOnly = true;
    var container = document.createElement('div');

    container.appendChild(document.createElement('br'));
    
    var header = document.createElement('h2');
    header.appendChild(document.createTextNode('Commander Search'));
    container.appendChild(header);

    var checkboxes = document.createElement('div');
    checkboxes.id = 'color_checkboxes';
    for (var i = 0; i < color_names.length; i++) {
      var box = makeCheckbox(color_names[i]);
      box.onclick = updateQuery;
      checkboxes.appendChild(box);
    }
    
    container.appendChild(checkboxes);

    container.appendChild(document.createElement('br'));
    
    container.appendChild(form_copy);

    document.body.insertBefore(container, old_form.nextSibling);
    updateQuery();
  }
  
  addCommanderForm();
  
})();
