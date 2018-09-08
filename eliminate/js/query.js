/**
 * @since 14/12/8 下午8:17
 * @author vivaxy
 */

export default class Query {

  getQueryStringByName(name) {
    var result = location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'));
    if (result === null || result.length < 1) return '';
    return result[1];
  }
}
