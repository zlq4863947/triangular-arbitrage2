import moment = require('moment');

/**
 * @return 'YYYY-MM-DDTHH:mm:ss.SSSZZ'
 */
export function getTimestring(): string {
  return moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
}
