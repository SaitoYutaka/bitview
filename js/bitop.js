function d2h(d){
    switch(d){
    case '0': return '0';
    case '1': return '1';
    case '2': return '2';
    case '3': return '3';
    case '4': return '4';
    case '5': return '5';
    case '6': return '6';
    case '7': return '7';
    case '8': return '8';
    case '9': return '9';
    case '10': return 'a';
    case '11': return 'b';
    case '12': return 'c';
    case '13': return 'd';
    case '14': return 'e';
    case '15': return 'f';
    default: return '0';
    }
}

function dec2hex(d) {
    var hex = new String();
    hex += d2h((d - 15) / 16);
    hex += d2h(d - 240);
}

function hex2bit(h) {
    var b = '';
    for (i = 0; i < h.length; i++) {
	switch(h.charAt(i)){
	case '0': b = b + '0000'; break;
	case '1': b = b + '0001'; break;
	case '2': b = b + '0010'; break;
	case '3': b = b + '0011'; break;
	case '4': b = b + '0100'; break;
	case '5': b = b + '0101'; break;
	case '6': b = b + '0110'; break;
	case '7': b = b + '0111'; break;
	case '8': b = b + '1000'; break;
	case '9': b = b + '1001'; break;
	case 'a': b = b + '1010'; break;
	case 'b': b = b + '1011'; break;
	case 'c': b = b + '1100'; break;
	case 'd': b = b + '1101'; break;
	case 'e': b = b + '1110'; break;
	case 'f': b = b + '1111'; break;
	default: break;
	}
    }
    return b;
}

function bitformat(b){
    var c = b.length / 4;
    var r = new String();
    for(i=0;i<c;i++){
	r += b.slice(4*i, ((4*i)+4)) + ' ';
    }
    //return b.slice(0,4) + ' ' + b.slice(4,8);
    return r;
}

function isHex(s){

    var lines = s.split('\n');
    for(i=0;i<lines.length;i++){

	for(j=0;j<lines[i].length;j++){
	    switch(lines[i][j]){
	    case '0': break;
	    case '1': break;
	    case '2': break;
	    case '3': break;
	    case '4': break;
	    case '5': break;
	    case '6': break;
	    case '7': break;
	    case '8': break;
	    case '9': break;
	    case 'a': break;
	    case 'b': break;
	    case 'c': break;
	    case 'd': break;
	    case 'e': break;
	    case 'f': break;
	    default: return false;
	    }
	}
    }

    return true;
}

function chengeEndian(s){

    var lines = s.split('\n');

    var r  = new String();

    for(i=0;i<lines.length;i++){
	var l = lines[i].length/2;
	if((l%2)==1){
	    console.log('err hex string');
	}

	var j = 0;
	while(j<l){
	    j += 2;
	    r += lines[i][j];
	    j += 1;
	    r += lines[i][j];
	    j -= 3;
	    r += lines[i][j];
	    j += 1;
	    r += lines[i][j];
	    j += 2;
	}
	r += '\n';
    }

    $('#outputtext ').val(r);
    console.log('retutn' + r);
}

$('#hex2bit').click(function(){

    var b = $('#txtbyte').val();
    b = b.replace(/ /g,"");

    chengeEndian(b);

    if(isHex(b)==false) return;

    b = hex2bit(b);

    if ($('#myCheckBox:checked').val() != undefined)
    {
	b = bitformat(b);
    }
    $('#bitstr').text(b);
});


$('#myCheckBox').click(function(){
    var b = $('#bitstr').text();
    if(b=='')return;
    if($(this).is(':checked')) {
	b = bitformat(b);
    } else {
	b = b.replace(/ /g,"");
    }
    $('#bitstr').text(b);
});

function bit2ascii(b){
    switch(b){
    case '00001' : return 'A';
    case '00010' : return 'B';
    case '00011' : return 'C';
    case '00100' : return 'D';
    case '00101' : return 'E';
    case '00110' : return 'F';
    case '00111' : return 'G';
    case '01000' : return 'H';
    case '01001' : return 'I';
    case '01010' : return 'J';
    case '01011' : return 'K';
    case '01100' : return 'L';
    case '01101' : return 'M';
    case '01110' : return 'N';
    case '01111' : return 'O';
    case '10000' : return 'P';
    case '10001' : return 'Q';
    case '10010' : return 'R';
    case '10011' : return 'S';
    case '10100' : return 'T';
    case '10101' : return 'U';
    case '10110' : return 'V';
    case '10111' : return 'W';
    case '11000' : return 'X';
    case '11001' : return 'Y';
    case '11010' : return 'Z';
    default: return '';
    }
}

function getManufacturerID(b){
    var c1 = b.slice(1,6);
    var c2 = b.slice(6,11);
    var c3 = b.slice(11);
    return bit2ascii(c1) + bit2ascii(c2) + bit2ascii(c3);
}

function getAllBytes(lines){
    var a = new Array();
    for(i=0;i<lines.length;i++){
	var l = lines[i].split(' ');
	for(j=0;j<l.length;j++){
	    a.push(l[j]);
	}
    }
    return a;
}

function getVideoInputParametersBitmap(b){
    var ret = '';

    switch(b.charAt(0)){
    case '0':
	ret = 'Analog input';

	switch(b.slice(1,3)){
	case '00': ret = ret + ' +0.7/|0.3 V'; break;
	case '01': ret = ret + ' +0.714/|0.286 V'; break;
	case '10': ret = ret + ' +1.0/|0.4 V'; break;
	case '11': ret = ret + ' +0.7/0 V'; break;
	default: break;
	}
	break;
    case '1':
	return 'Digital input';
    default:
	return '';
    }

    return ret;
}

function hex2ascii(h) {
    switch(h){
    case '21': return'!';
    case '22': return'"';
    case '23': return'#';
    case '24': return'$';
    case '25': return'%';
    case '26': return'&';
    case '27': return'\'';
    case '28': return'(';
    case '29': return')';
    case '2A': return'*';
    case '2B': return'+';
    case '2C': return',';
    case '2D': return'-';
    case '2E': return'.';
    case '2F': return'/';
    case '30': return'0';
    case '31': return'1';
    case '32': return'2';
    case '33': return'3';
    case '34': return'4';
    case '35': return'5';
    case '36': return'6';
    case '37': return'7';
    case '38': return'8';
    case '39': return'9';
    case '3A': return':';
    case '3B': return';';
    case '3C': return'<';
    case '3D': return'=';
    case '3E': return'>';
    case '3F': return'?';
    case '40': return'@';
    case '41': return'A';
    case '42': return'B';
    case '43': return'C';
    case '44': return'D';
    case '45': return'E';
    case '46': return'F';
    case '47': return'G';
    case '48': return'H';
    case '49': return'I';
    case '4A': return'J';
    case '4B': return'K';
    case '4C': return'L';
    case '4D': return'M';
    case '4E': return'N';
    case '4F': return'O';
    case '50': return'P';
    case '51': return'Q';
    case '52': return'R';
    case '53': return'S';
    case '54': return'T';
    case '55': return'U';
    case '56': return'V';
    case '57': return'W';
    case '58': return'X';
    case '59': return'Y';
    case '5A': return'Z';
    case '5B': return'[';
    case '5C': return'\\';
    case '5D': return']';
    case '5E': return'^';
    case '5F': return'_';
    case '60': return'`';
    case '61': return'a';
    case '62': return'b';
    case '63': return'c';
    case '64': return'd';
    case '65': return'e';
    case '66': return'f';
    case '67': return'g';
    case '68': return'h';
    case '69': return'i';
    case '6A': return'j';
    case '6B': return'k';
    case '6C': return'l';
    case '6D': return'm';
    case '6E': return'n';
    case '6F': return'o';
    case '70': return'p';
    case '71': return'q';
    case '72': return'r';
    case '73': return's';
    case '74': return't';
    case '75': return'u';
    case '76': return'v';
    case '77': return'w';
    case '78': return'x';
    case '79': return'y';
    case '7A': return'z';
    case '7B': return'{';
    case '7C': return'|';
    case '7D': return'}';
    case '7E': return'~';
    case '7F': return' ';
    default: return '.';
    }
}

//01234567891012345
//0 00000 00000  00000
$('#showedid').click(function(){

    if($('#edid').val()==''){return;}

    var lines = $('#edid').val().split('\n');
    var p = getAllBytes(lines);

    $('#Fixed_header_pattern').text(p[0] + p[1] + p[2] + p[3] + p[4] + p[5] + p[6] + p[7]);

    var mId = getManufacturerID(hex2bit(p[8]) + hex2bit(p[9]));
    $('#Manufacturer_ID').text(mId);

    $('#Manufacturer_product_code').text(p[10] +' '+ p[11]);
    $('#Serial_number').text(p[12] +' '+ p[13] +' '+ p[14] +' '+ p[15]);

    $('#Week_of_manufacture').text(p[16]);
    $('#Year_of_manufacture').text(p[17]);
    $('#EDID_version').text(p[18]+' '+p[19]);

    var a = getVideoInputParametersBitmap(hex2bit(p[20]));
    $('#Video_input_parameters_bitmap').text(a);

});

$('.highlighted').on('click', function() {
    $('#bitstr').getHighlighter().removeHighlights(this);
});

$('#bitstr').textHighlighter({
    onRemoveHighlight: function(highlight) {
	console.log('Do you really want to remove this highlight: "' + $(highlight).text() + '"?');
        return true;// confirm('Do you really want to remove this highlight: "' + $(highlight).text() + '"?');
    },
    onBeforeHighlight: function(range) {
	console.log('Do you really want to highlight this text: "' + range + '"?');
	$('#selectedbit').text(range);
        return true;//confirm('Do you really want to highlight this text: "' + range + '"?');
    },
    onAfterHighlight: function(highlights, range) {
	console.log('You have selected "' + range + '" and created ' + highlights.length + ' highlight(s)!');
        //alert('You have selected "' + range + '" and created ' + highlights.length + ' highlight(s)!');
    }
});
