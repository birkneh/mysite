(function () {
  var mapEl = document.getElementById('africa-life-map');
  var infoEl = document.getElementById('africa-life-selected');

  if (!mapEl) {
    return;
  }

  var PLOTLY_SRC = 'https://cdn.plot.ly/plotly-2.35.2.min.js';
  var rendered = false;

  // Load the heavy Plotly library on demand, then render the map once.
  function ensurePlotly() {
    if (rendered) {
      return;
    }
    rendered = true;

    if (window.Plotly) {
      renderMap();
      return;
    }

    var script = document.createElement('script');
    script.src = PLOTLY_SRC;
    script.async = true;
    script.onload = renderMap;
    script.onerror = function () {
      if (infoEl) {
        infoEl.textContent = 'Interactive map could not load. Please check your connection and refresh.';
      }
    };
    document.head.appendChild(script);
  }

  // Defer loading until the map is about to enter the viewport.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.disconnect();
          ensurePlotly();
        }
      });
    }, { rootMargin: '300px 0px' });
    observer.observe(mapEl);
  } else {
    ensurePlotly();
  }

  function renderMap() {
    if (!window.Plotly) {
      if (infoEl) {
        infoEl.textContent = 'Interactive map could not load. Please refresh the page.';
      }
      return;
    }

  var lifeData = [
    { iso3: 'DZA', country: 'Algeria', value: 76.89 },
    { iso3: 'AGO', country: 'Angola', value: 65.17 },
    { iso3: 'BEN', country: 'Benin', value: 61.32 },
    { iso3: 'BWA', country: 'Botswana', value: 69.57 },
    { iso3: 'BFA', country: 'Burkina Faso', value: 61.65 },
    { iso3: 'BDI', country: 'Burundi', value: 64.14 },
    { iso3: 'CPV', country: 'Cabo Verde', value: 76.56 },
    { iso3: 'CMR', country: 'Cameroon', value: 64.51 },
    { iso3: 'CAF', country: 'Central African Republic', value: 58.15 },
    { iso3: 'TCD', country: 'Chad', value: 55.58 },
    { iso3: 'COM', country: 'Comoros', value: 67.48 },
    { iso3: 'COD', country: 'Democratic Republic of the Congo', value: 62.39 },
    { iso3: 'COG', country: 'Republic of the Congo', value: 66.42 },
    { iso3: 'DJI', country: 'Djibouti', value: 66.61 },
    { iso3: 'EGY', country: 'Egypt', value: 72.16 },
    { iso3: 'GNQ', country: 'Equatorial Guinea', value: 64.30 },
    { iso3: 'ERI', country: 'Eritrea', value: 69.40 },
    { iso3: 'SWZ', country: 'Eswatini', value: 64.54 },
    { iso3: 'ETH', country: 'Ethiopia', value: 68.15 },
    { iso3: 'GAB', country: 'Gabon', value: 68.88 },
    { iso3: 'GMB', country: 'Gambia', value: 66.45 },
    { iso3: 'GHA', country: 'Ghana', value: 66.08 },
    { iso3: 'GIN', country: 'Guinea', value: 61.23 },
    { iso3: 'GNB', country: 'Guinea-Bissau', value: 64.59 },
    { iso3: 'CIV', country: "Cote d'Ivoire", value: 62.44 },
    { iso3: 'KEN', country: 'Kenya', value: 64.19 },
    { iso3: 'LSO', country: 'Lesotho', value: 58.63 },
    { iso3: 'LBR', country: 'Liberia', value: 62.62 },
    { iso3: 'LBY', country: 'Libya', value: 75.18 },
    { iso3: 'MDG', country: 'Madagascar', value: 64.25 },
    { iso3: 'MWI', country: 'Malawi', value: 67.92 },
    { iso3: 'MLI', country: 'Mali', value: 61.11 },
    { iso3: 'MRT', country: 'Mauritania', value: 69.16 },
    { iso3: 'MUS', country: 'Mauritius', value: 75.44 },
    { iso3: 'MAR', country: 'Morocco', value: 75.86 },
    { iso3: 'MOZ', country: 'Mozambique', value: 64.14 },
    { iso3: 'NAM', country: 'Namibia', value: 67.81 },
    { iso3: 'NER', country: 'Niger', value: 61.88 },
    { iso3: 'NGA', country: 'Nigeria', value: 54.95 },
    { iso3: 'RWA', country: 'Rwanda', value: 68.47 },
    { iso3: 'STP', country: 'Sao Tome and Principe', value: 70.26 },
    { iso3: 'SEN', country: 'Senegal', value: 69.39 },
    { iso3: 'SYC', country: 'Seychelles', value: 73.28 },
    { iso3: 'SLE', country: 'Sierra Leone', value: 62.33 },
    { iso3: 'SOM', country: 'Somalia', value: 59.26 },
    { iso3: 'ZAF', country: 'South Africa', value: 66.66 },
    { iso3: 'SSD', country: 'South Sudan', value: 57.97 },
    { iso3: 'SDN', country: 'Sudan', value: 66.89 },
    { iso3: 'TZA', country: 'Tanzania', value: 67.63 },
    { iso3: 'TGO', country: 'Togo', value: 63.33 },
    { iso3: 'TUN', country: 'Tunisia', value: 77.10 },
    { iso3: 'UGA', country: 'Uganda', value: 68.92 },
    { iso3: 'ZMB', country: 'Zambia', value: 66.88 },
    { iso3: 'ZWE', country: 'Zimbabwe', value: 63.63 }
  ];

  var trace = {
    type: 'choropleth',
    locationmode: 'ISO-3',
    locations: lifeData.map(function (d) { return d.iso3; }),
    z: lifeData.map(function (d) { return d.value; }),
    text: lifeData.map(function (d) { return d.country; }),
    colorscale: [
      [0.0, '#f3ece2'],
      [0.35, '#dcbf93'],
      [0.65, '#95c8cc'],
      [1.0, '#2f7f86']
    ],
    marker: {
      line: {
        color: '#ffffff',
        width: 0.8
      }
    },
    colorbar: {
      title: 'Years',
      thickness: 12,
      x: 1.01,
      y: 0.52,
      len: 0.8
    },
    hovertemplate: '<b>%{text}</b><br>Life expectancy: %{z:.2f} years<extra></extra>'
  };

  var layout = {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    geo: {
      scope: 'africa',
      projection: { type: 'mercator' },
      showframe: false,
      showcoastlines: false,
      showland: true,
      landcolor: '#ece8df',
      bgcolor: 'rgba(0,0,0,0)'
    }
  };

  Plotly.newPlot(mapEl, [trace], layout, {
    responsive: true,
    displayModeBar: false,
    scrollZoom: false
  }).then(function () {
    mapEl.on('plotly_click', function (eventData) {
      var point = eventData && eventData.points && eventData.points[0];
      if (!point || !infoEl) {
        return;
      }
      infoEl.textContent = point.text + ': ' + Number(point.z).toFixed(2) + ' years (Worldometer).';
    });
  });
  }
})();
