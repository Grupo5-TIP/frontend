const months = {
    'JANUARY': "ENERO",
    'FEBRUARY': "FEBRERO",
    'MARCH': "MARZO",
    'APRIL': "ABRIL",
    'MAY': "MAYO",
    'JUNE': "JUNIO",
    'JULY': "JULIO",
    'AUGUST': "AGOSTO",
    'SEPTEMBER': "SEPTIEMBRE",
    'OCTOBER': "OCTUBRE",
    'NOVEMBER': "NOVIEMBRE",
    'DECEMBER': "DICIEMBRE",

}
export function translate(month){
    return months[month];
}