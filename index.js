let stoch = require('@jwalsh/stochastic');

const defaultOptions = {
  debug: false,
  summary: false,
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

          if (opts.summary) {
            dataset.summary = {
              average: parseFloat(stoch.average(dataset.data).toPrecision(4)),
              median: (numbers => {
                let median;
                const len = numbers.length;
                const sorted = numbers.sort();
                if (len % 2 === 0) {
                  median = (sorted[len / 2 - 1] + sorted[len / 2]) / 2;
                } else {
                  median = sorted[(len - 1) / 2];
                }
                return median;
              })(dataset.data),
              stdDev: parseFloat(stoch.std(dataset.data).toPrecision(4)),
              change: pctChange(dataset.data[0], dataset.data[dataset.data.length - 1])
            };
          }

          return dataset;
        })
        .filter((e, i) => i !== 0)
        .map(e => {
          let hasNaNData = e.data
              .filter(d => {
                return !/^[0-9.]*$/.test(d);
              }) // this doesn't allow for enum types of data
              .map(e => console.log('WARN: Non-numerical data', e))
              .reduce((p, c) => {
                return true;
              }, false);
          return e;
        });

      return chart;
};
