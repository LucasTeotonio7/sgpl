
/**
 * @returns Retorna a data atual no padrão YY-MM-DD
 */
 export function currentDate(){
    var date = new Date();
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
}

export function FormactDate(data){
    // var data = new Date();
    var day = String(data.getDate()).padStart(2, '0');
    var month = String(data.getMonth() + 1).padStart(2, '0');
    var year = data.getFullYear();
    return year + '-' + month + '-' + day;
}

export function FormactDateMonthDay(data) {
    data = new Date(data + ' 00:00:00');
    var day = String(data.getDate()).padStart(2, '0');
    var month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][data.getMonth()];
    return day + ', ' + month;
}

export function string_to_datetime(date_str){
    return new Date(date_str + ' 00:00:00');
  }

export function stringToWeekday(date_str){
    return new Date(date_str + ' 00:00:00').getDay();
  }

export function dateWeekdayName(date){
  var day = date.getDay();
  switch (day) {
    case 0:
      return 'DOM';
    case 1:
      return 'SEG';
    case 2:
      return 'TER';
    case 3:
      return 'QUA';
    case 4:
      return 'QUI';
    case 5:
      return 'SEX';
    case 6:
      return 'SAB';
    default:
      console.log(`Sorry, we are out of ${day}.`);
  }
}
