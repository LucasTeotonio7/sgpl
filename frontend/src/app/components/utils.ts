
/**
 * @returns Retorna a data atual no padrão YY-MM-DD
 */
 export function dataAtual(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    return ano + '-' + mes + '-' + dia;
}
