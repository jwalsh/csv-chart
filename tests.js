let csvChart = require('./index');

let a = `foo,bar,baz
22462464,10295296,5624728
22941696,10295296,6085280
23003136,10295296,6141496
23048192,10295296,6188480`;

console.log(JSON.stringify(csvChart(a), null, '  '));


let b = `name	rank	count	prop100k	cum_prop100k	pctwhite	pctblack	pctapi	pctaian	pct2prace	pcthispanic
SMITH	1	2376206	880.85	880.85	73.35	22.22	0.4	0.85	1.63	1.56
JOHNSON	2	1857160	688.44	1569.3	61.55	33.8	0.42	0.91	1.82	1.5
WILLIAMS	3	1534042	568.66	2137.96	48.52	46.72	0.37	0.78	2.01	1.6
BROWN	4	1380145	511.62	2649.58	60.71	34.54	0.41	0.83	1.86	1.64
JONES	5	1362755	505.17	3154.75	57.69	37.73	0.35	0.94	1.85	1.44
MILLER	6	1127803	418.07	3572.82	85.81	10.41	0.42	0.63	1.31	1.43
DAVIS	7	1072335	397.51	3970.33	64.73	30.77	0.4	0.79	1.73	1.58`;


console.log(JSON.stringify(csvChart(b, {debug: true, delimiter: '\t'}), null, '  '));


let c = `Col1|Col2|Col3
1|2|3
4|5|6
7|8|9
a|b|c`;


console.log(JSON.stringify(csvChart(c, {delimiter: '|'})| null| '  '));
