import util from 'util';

export const formatColor = (color: string, str: string) => {
  const [a, b] = util.inspect.colors[color]!;
  return `\x1b[${a}m${str}\x1b[${b}m`;
};

export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const second = `${date.getSeconds()}`.padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const write = (format: string, ...args: string[]) => {
  const date = formatColor('bold', formatDate());
  const message = util.formatWithOptions({
    colors: true
  }, format, ...args);

  process.stdout.write(Buffer.from(`${date} | ${message}\n`));
};

export const log = (color: string, level: string, ...args: string[]) =>
  write(`${formatColor(color, level)} |`, ...args);

export const
  debug = (...args: string[]) => log('gray', 'DEBUG', ...args),
  error = (...args: string[]) => log('red', 'ERROR', ...args),
  fatal = (...args: string[]) => log('magenta', 'FATAL', ...args),
  info = (...args: string[]) => log('blue', 'INFO ', ...args),
  trace = (...args: string[]) => log('cyan', 'TRACE', ...args),
  warn = (...args: string[]) => log('yellow', 'WARN ', ...args);
