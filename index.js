const defaultOptions = {
  debug: false,
  delimiter:',',
  headerLoc: 0,
  headerPrefix: '',
  labelLoc: 0,
  whitelist: []
};

var exports = module.exports = (dw,
                                options = defaultOptions) =>
    {
      const opts = Object.assign({}, defaultOptions, options);

      if (opts.debug) {
        console.log(opts);
      }
      const table = dw
            .split(/[\r\n]+/)
            .filter(e => e !== '');

      if (opts.debug) {
        console.log(table);
      }

      const header = table[opts.headerLoc || 0]
            .split(opts.delimiter)
            .map(e => e.trim()).filter(e => e !== '');
      const data = table
            .splice(1)
            .map(e => e
                 .split(opts.delimiter)
                 .map(e => e.trim())
                 .filter(e => e !== ''));

      let chart = { };

      chart.labels = data.map(e => {
        return `${opts.headerPrefix !== '' ? opts.headerPrefix + ' ' : ''}${e[0]}`;
      });

      chart.datasets = header
        .map((e, i) => {
          let dataset = {
            'label': e
          };
          dataset.data = data.map(r => {
            const datum = r[i];
            return /^[0-9.]*$/.test(datum) ? parseFloat(datum) : datum;
          });

          const pctChange = (y1, y2) => parseFloat((((y2 - y1) / y1) * 100).toPrecision(2));

          dataset.summary = {
            change: pctChange(dataset.data[0], dataset.data[dataset.data.length - 1])
          };
          return dataset;
        })
        .filter((e, i) => i !== 0)
        .map(e => {
          let hasNaNData = e.data
              .filter(d => {
                return !/^[0-9.]*$/.test(d);
              })
              .map(e => console.log('WARN: Non-numerical data', e))
              .reduce((p, c) => {
                return true;
              }, false);
          return e;
        });

      return chart;
};
