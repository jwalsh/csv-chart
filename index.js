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
            return r[i];
          });
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
