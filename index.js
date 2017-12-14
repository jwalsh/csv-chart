var exports = module.exports = (dw,
                                options = {
                                  debug: false,
                                  delimiter:',',
                                  headerLoc: 0,
                                  headerPrefix: '',
                                  labelLoc: 0,
                                  whitelist: []
                                }) =>
    {
      if (options.debug) {
        console.log(options);
      }
      const table = dw.split(/[\r\n]+/);
      if (options.debug) {
        console.log(table);
      }

      const header = table[options.headerLoc || 0].split(options.delimiter).map(e => e.trim()).filter(e => e !== '');
      const data = table.splice(1).map(e => e.split(options.delimiter).map(e => e.trim()).filter(e => e !== ''));

      let chart = { };

      chart.labels = data.map(e => {
        return `${options.headerPrefix !== '' ? options.headerPrefix + ' ' : ''}${e[0]}`;
      });

      chart.datasets = header.map((e, i) => {
        let dataset = {
          'label': e
        };
        dataset.data = data.map(r => {
          return r[i];
        });
        return dataset;
      });

      return chart;
};
