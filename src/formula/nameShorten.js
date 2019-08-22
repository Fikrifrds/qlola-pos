export default function Shorten(name, len){
    if(name && name.length > len ) {
        name = name.split('').slice(0,len).join('')
        name += '...'
    }
    return name;
}